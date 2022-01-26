//display current day on header
var currentDay = document.querySelector("#currentDay");
currentDay.innerHTML = moment().format("MMMM Do, YYYY");

//array for task time and description
var savedTasks = [];
var pm = 1;

if (savedTasks.length === 0) {
  for (var i = 9; i < 18; i++) {
    if (i < 13) {
      var tasks = { time: i + ":00 AM", task: "" };
    } else {
      var tasks = { time: pm++ + ":00 PM", task: "" };
    }
    savedTasks.push(tasks);
  }
} else {
  //enter loadTask() logic here
  console.log("saved");
}
console.log(savedTasks);
