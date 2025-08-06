const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const csv = require('fast-csv');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const CSV_FILE = './users.csv';

// Helper function to read CSV
function readUsers() {
  return new Promise((resolve, reject) => {
    let users = [];
    fs.createReadStream(CSV_FILE)
      .pipe(csv.parse({ headers: true }))
      .on('data', (row) => users.push(row))
      .on('end', () => resolve(users))
      .on('error', reject);
  });
}

// Register API
app.post('/api/register', async (req, res) => {
  const formData = req.body;

  let users = await readUsers();

  // Check if email already exists
  if (users.find((u) => u.email === formData.email)) {
    return res.status(400).json({ message: 'Email already registered' });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(formData.password, 10);

  // Save to CSV
  const newUser = {
    ...formData,
    password: hashedPassword,
  };
  const ws = fs.createWriteStream(CSV_FILE, { flags: 'a' });
  ws.write(
    `\n${newUser.name},${newUser.mobile},${newUser.email},${newUser.address},${newUser.vehicle},${newUser.license},${newUser.age},${newUser.guardianName},${newUser.guardianNumber},${newUser.userType},${newUser.password}`
  );
  ws.end();

  res.json({ message: 'Registered successfully' });
});

// Login API
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  let users = await readUsers();
  const user = users.find((u) => u.email === email);
  if (!user) return res.status(400).json({ message: 'User not found' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: 'Invalid password' });

  // Send user data (excluding password)
  const { password: _, ...userData } = user;
  res.json({ success: true, message: 'Login successful', user: userData });
});


app.listen(5000, () => console.log('Server running on port 5000'));
