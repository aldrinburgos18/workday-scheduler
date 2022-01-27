var container = document.querySelector(".container");

//display current day on header
var currentDay = document.querySelector("#currentDay");
currentDay.innerHTML = moment().format("MMMM Do, YYYY");

//array for task time and description
var savedTasks = [];

var loadTask = function () {
  var pm = 1;
  //if savedTask is null, populate
  if (savedTasks.length === 0) {
    for (var i = 9; i < 18; i++) {
      if (i < 13) {
        var task = { time: i + ":00 AM", task: "" };
      } else {
        var task = { time: pm++ + ":00 PM", task: "" };
      }
      savedTasks.push(task);
      saveTask();
    }
  } else {
    //load saved tasks from localStorage
    var tasks = JSON.parse(localStorage.getItem("tasks"));
    savedTasks = tasks;
  }
  displayTaskList();
};

var saveTask = function () {
  localStorage.setItem("tasks", JSON.stringify(savedTasks));
};

var displayTaskList = function () {
  //create task list div
  var taskLi = document.createElement("div");
  taskLi.classList.add("row", "time-block");

  for (var i = 0; i < savedTasks.length; i++) {
    var taskTime = document.createElement("div");
    taskTime.classList.add("col-1", "hour", "pt-2");
    taskTime.innerText = savedTasks[i].time;
    var taskDesc = document.createElement("textarea");
    taskDesc.classList.add("col-10", "description");
    taskDesc.innerText = savedTasks[i].task;
    var saveButton = document.createElement("button");
    saveButton.classList.add("col-1", "saveBtn");
    saveButton.innerHTML = '<i class="fas fa-save"></i>';
    taskLi.append(taskTime, taskDesc, saveButton);
  }
  container.append(taskLi);
};

loadTask();

/* var taskTime = $("div").addClass("col-1 pt-2").text(task.time);
  var taskDesc = $("div").addClass("col-10 description").text(task.desc); */
