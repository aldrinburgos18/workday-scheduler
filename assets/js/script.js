var container = document.querySelector(".container");

//display current day on header
var currentDay = document.querySelector("#currentDay");
currentDay.innerHTML = moment().format("MMMM Do, YYYY");

//array for task time and description
var savedTasks = [];

var loadTask = function () {
  var tasks = JSON.parse(localStorage.getItem("savedTasks"));
  var pm = 1;
  //if savedTask is null, populate
  if (tasks === null) {
    for (var i = 7; i < 22; i++) {
      if (i < 12) {
        var task = { time: i + ":00 AM", task: "" };
      } else if (i === 12) {
        var task = { time: i + ":00 PM", task: "" };
      } else {
        var task = { time: pm++ + ":00 PM", task: "" };
      }
      savedTasks.push(task);
    }
  } else if (tasks) {
    savedTasks = tasks;
  }
  displayTaskList();
};

var saveTask = function () {
  localStorage.setItem("savedTasks", JSON.stringify(savedTasks));
};

var displayTaskList = function () {
  for (var i = 0; i < savedTasks.length; i++) {
    var taskLi = document.createElement("div");
    taskLi.classList.add("row", "time-block");
    var taskTime = document.createElement("div");
    taskTime.classList.add("col-1", "hour", "pt-2");
    taskTime.innerText = savedTasks[i].time;
    var taskDesc = document.createElement("textarea");
    taskDesc.classList.add("col-10", "description");
    taskDesc.innerText = savedTasks[i].task;
    var saveButton = document.createElement("button");
    saveButton.classList.add("col-1", "saveBtn");
    saveButton.innerHTML = '<i class="fas fa-save"></i>';
    //audit task before appending to main page
    auditTask(taskLi, taskTime, taskDesc, saveButton);
  }
  //save task after displaying prepopulated array
  saveTask();
};

var auditTask = function (li, time, desc, save) {
  //get time from page
  var timeEl = moment(time.innerText, "hh:mm A").add(59, "minutes");
  //check current time
  if (moment().isAfter(timeEl)) {
    //disable editing
    desc.disabled = true;
    //remove class
    desc.classList.remove("future");
    desc.classList.add("past");
  } else if (Math.abs(moment().diff(timeEl, "hours")) != 0) {
    //remove class
    desc.classList.remove("past");
    desc.classList.add("future");
  }
  li.append(time, desc, save);
  container.append(li);
};

//user clicks save button
$(".container").on("click", ".saveBtn", function () {
  var text = $(this).closest("div").find("textarea").val();
  var index = $(this).closest("div").index();
  savedTasks[index].task = text;
  saveTask();
});

//load task on page load
loadTask();
