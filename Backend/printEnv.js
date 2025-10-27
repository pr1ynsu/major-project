// printEnv.js
require('dotenv').config();
console.log('--- ENV DEBUG ---');
console.log('MONGO_URI:', process.env.MONGO_URI ? '[SET]' : '[NOT SET]');
console.log(process.env.MONGO_URI);
console.log('JWT_SECRET:', process.env.JWT_SECRET ? '[SET]' : '[NOT SET]');
console.log('PORT:', process.env.PORT || '(not set, default 5000)');
console.log('CWD:', process.cwd());
