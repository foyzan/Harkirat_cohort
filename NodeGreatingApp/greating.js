// This module exports a function that returns a greeting message based on the provided hour (0-23).
// Depending on the hour, it returns "Good night", "Good morning", "Good afternoon", or "Good evening".

export function getGreeting(hour) {
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




