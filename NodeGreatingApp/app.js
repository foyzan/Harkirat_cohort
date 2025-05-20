// This script greets the user based on the current hour and the name provided as a command-line argument.

const name = process.argv[2];
const hour = new Date().getHours();
const getGreeting = require('./greating')


const greeting = getGreeting(hour);

console.log(`${greeting}, ${name}!`);
