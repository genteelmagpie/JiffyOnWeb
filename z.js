const path = require('path');

// Define your file path using relative paths
const filePath = path.join(__dirname, 'public', 'assets', 'sub.json');

// To resolve the absolute path, you can use path.resolve:
const absolutePath = path.resolve(filePath);

console.log(filePath);
console.log(absolutePath);
