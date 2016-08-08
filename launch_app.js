var open = require('open');
var PORT = process.argv[2] || 3000;
console.log("Bundling successful");
console.log("Launching app in browser");
open('http://localhost:' + PORT);
