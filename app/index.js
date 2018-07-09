import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import * as util from "../common/utils";
import userActivity from "user-activity";

import { HeartRateSensor } from "heart-rate";

import { today } from "user-activity";


// Update the clock every minute
clock.granularity = "seconds";

// Create a new instance of the HeartRateSensor object
let hrm = new HeartRateSensor();

hrm.onreading = function() {

  // Peek the current sensor values
  //console.log("Current heart rate: " + hrm.heartRate);

  hrlabel.text = hrm.heartRate;
  
  // Stop monitoring the sensor
  hrm.stop();
}

// Begin monitoring the sensor
hrm.start();

console.log(today.local.steps + " steps")


// Get a handle on the <text> element
const timelabel = document.getElementById("timelabel");
const datelabel = document.getElementById("datelabel");
const hrlabel = document.getElementById("hrlabel");
const stepslabel = document.getElementById("stepslabel");

 const monthNames = [
"January", "February", "March",
"April", "May", "June", "July",
"August", "September", "October",
"November", "December"
];
  
  

// Update the <text> element every tick with the current time
clock.ontick = (evt) => {
  let today = evt.date;
  let hours = today.getHours();
  let day = today.getDay();
  let date = today.getDate();
  let monthIndex = today.getMonth();
  
 

  datelabel.text=`${date} ${monthNames[monthIndex]}`;
  
  
  if (preferences.clockDisplay === "12h") {
    // 12h format
    hours = hours % 12 || 12;
  } else {
    // 24h format
    hours = util.zeroPad(hours);
  }
  
  let mins = util.zeroPad(today.getMinutes());
  timelabel.text = `${hours}:${mins}`;
  
  hrm.start();
  
  //console.log(today.local.steps)
  
  let steps=(userActivity.today.adjusted["steps"] || 0);
  
  stepslabel.text = `${steps}`;
  
}
