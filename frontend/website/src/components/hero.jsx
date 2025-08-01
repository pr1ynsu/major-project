export default function Hero() {
  return (
    <div className="absolute top-0 left-0 w-full h-[80vh] overflow-hidden z-0">
      <video
        className="w-full h-full object-cover"
        src="/bg-video.mp4"
        autoPlay
        loop
        muted
        playsInline
      ></video>
    </div>
  );
}
