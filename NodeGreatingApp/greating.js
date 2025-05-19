const name = process.argv[2];
const hour = new Date().getHours();

function getGreeting(hour) {
  if(hour < 4 || hour > 22) {
    return "Good night";
  }
  else if(hour < 12) { 
    return "Good morning"
  }else if(hour < 18) {
    return "Good afternoon"
  }
  
  return "Good evening";
}


const greeting = getGreeting(hour);

console.log(`${greeting}, ${name}!`);
