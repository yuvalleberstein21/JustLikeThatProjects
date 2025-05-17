Time Converter 

This mini project provides utility functions and a class for converting and managing time values, including hours, minutes, and seconds. 
It also includes a feature to get the current time in total seconds.

Features

- Convert hours, minutes, and seconds to total seconds.
  
- Retrieve hours, minutes, and seconds from a total seconds value.
  
- Automatically fetch the current time in total seconds if no time is provided.

- Ensure the time remains within a valid range (99:59:59 to -99:59:59).


  Usage

  const time1 = new Time({ hours: 12, minutes: 30, seconds: 15 });
  console.log('Time1:', time1.toString()); // Time1: 12:30:15

  const time1 = new Time();
  console.log('Time1:', time1.toString()); // Time1: Your current time.

  

  
