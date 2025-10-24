// backend/detection_manager.js
const { spawn } = require('child_process');
const path = require('path');

// --- 1. CONFIGURATION ---
// REPLACE with your actual RTSP stream URL after you get access in Phase 4.
// For testing (Phase 3 PoC), you can use a local video file path instead.
const RTSP_URL = 'rtsp://username:password@camera_ip:port/stream_path'; 

// Path to your Python worker script (ML/script.py)
const PYTHON_WORKER_PATH = path.join(__dirname, '..', 'ML', 'script.py');


// --- 2. START THE PYTHON AI WORKER (Persistent Process) ---
const startPythonWorker = () => {
    // Launch the Python script. The '--unbuffered' flag is CRITICAL for immediate output.
    const pythonWorker = spawn('python', ['-u', PYTHON_WORKER_PATH]);
    console.log(`\n🤖 Launched Python AI Worker (PID: ${pythonWorker.pid})`);

    // Listen for status/error messages from the Python script's stderr
    pythonWorker.stderr.on('data', (data) => {
        console.error(`[PY ERR] ${data.toString().trim()}`);
    });

    // Handle process exit (e.g., if the Python script crashes)
    pythonWorker.on('close', (code) => {
        console.error(`\n❌ Python worker exited with code ${code}. Restarting in 5s...`);
        // Implement auto-restart logic here for a robust production system
        setTimeout(startPythonWorker, 5000); 
    });

    return pythonWorker;
};


// --- 3. START THE FFMPEG VIDEO STREAM INGESTION ---
const startVideoStream = (pythonWorker) => {
    // FFmpeg command to pull the stream and output raw JPEG frames
    const ffmpeg = spawn('ffmpeg', [
        '-i', RTSP_URL,       // Input stream URL
        '-f', 'image2pipe',   // Output format: sequential images to a pipe
        '-vf', 'fps=1',       // Process 1 frame per second (adjust rate as needed)
        '-q:v', '3',          // JPEG quality
        'pipe:1'              // Output to standard output (Node.js stdout pipe)
    ]);
    console.log(`🎥 Launched FFmpeg Stream Ingestion (PID: ${ffmpeg.pid})`);


    // --- CRITICAL COMMUNICATION STEP ---
    // Pipe the raw JPEG frame data from FFmpeg's stdout directly to the Python worker's stdin
    ffmpeg.stdout.pipe(pythonWorker.stdin);
    console.log('🔗 FFmpeg output successfully piped to Python worker STDIN.');


    // Listen for FFmpeg errors (which can include connection failures)
    ffmpeg.stderr.on('data', (data) => {
        const message = data.toString();
        // Ignore verbose FFmpeg stats and only log potential errors
        if (!message.includes('frame=') && !message.includes('speed=')) {
            console.warn(`[FFMPEG WARN] ${message.trim()}`);
        }
    });

    ffmpeg.on('close', (code) => {
        console.error(`\n❌ FFmpeg process exited with code ${code}. Restarting in 5s...`);
        // Implement auto-restart logic here
        setTimeout(() => startVideoStream(pythonWorker), 5000); 
    });
};


// --- MAIN EXECUTION ---
// 1. Start the Python AI worker first
const worker = startPythonWorker();

// 2. Start the video stream, piping its output to the worker
// We wrap it in a short delay to ensure the Python worker is fully initialized.
setTimeout(() => {
    startVideoStream(worker);
}, 2000); 

// Note: This script runs independently of your server.js (which hosts the API).
// You must run 'node server.js' AND 'node detection_manager.js' separately!