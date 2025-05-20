// Greets the user based on the current hour and the name provided as a command-line argument.

import { getGreeting } from './greating.js';

const name = process.argv[2]; // Get the user's name from command-line arguments
const hour = new Date().getHours(); // Get the current hour (0-23)

const greeting = getGreeting(hour); // Get appropriate greeting based on hour

console.log(`${greeting}, ${name}!`); // Print the greeting message
