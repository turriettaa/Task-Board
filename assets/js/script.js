
// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}
//determines task status color
function getTaskColor(task) {
  console.log(`Determining color for task: ${task.id}, status: ${task.status}, due date: ${task.dueDate}`);
  
  if (task.status === 'done') {
      console.log('Task is done, returning white');
      return 'white';
  }

  const now = new Date();
  const dueDate = new Date(task.dueDate);
  const timeDiff = dueDate - now;
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

  if (daysDiff < 0) {
      console.log('Task is overdue, returning red');
      return 'red';  // Overdue
  } else if (daysDiff <= 2) {
      console.log('Task is nearing deadline, returning yellow');
      return 'yellow';  // Nearing deadline
  }
  console.log('Task is not urgent, returning white');
  return 'white';  // Default color
}

// Function to load tasks from localStorage
function loadTasks() {
  const savedTasks = localStorage.getItem('tasks');
  if (savedTasks) {
      return JSON.parse(savedTasks);
  }
  return [];
}
  
  // Initialize tasks array
  let tasks = loadTasks();
  
  // Function to save tasks to localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    console.log('Tasks saved to localStorage:', tasks);
}

// Todo: create a function to create a task card
function createTaskCard(task) {
  if (!task) {
      console.error('Attempted to create a card for an undefined task');
      return $('<div>');
  }
  
  let cardColor = getTaskColor(task);
  console.log(`Creating card for task ${task.id} with color ${cardColor}`);

  const taskEl = $(`<div id="${task.id}" class="task-card" style="background-color: ${cardColor}; margin: 10px; padding: 10px;">
      <h3>${task.title}</h3>
      <p>${task.description}</p>
      <p>Due: ${task.dueDate}</p>
      <button class="delete-task" data-task-id="${task.id}">Delete</button>
  </div>`);

  // Attach the delete event listener directly to this card's delete button
  taskEl.find('.delete-task').on('click', function(event) {
    event.preventDefault();
    event.stopPropagation();
    const taskId = $(this).data('task-id');
    console.log('Delete button clicked for task ID:', taskId);
    if (taskId) {
        deleteTask(taskId);
        // Change appearance after deletion and remove draggable
        taskEl.css({
            'opacity': '0.5',
            'cursor': 'not-allowed'
        }).removeClass('ui-draggable ui-draggable-handle');
        
        // Remove the draggable functionality
        if (taskEl.data('ui-draggable')) {
            taskEl.draggable('destroy');
        }
    } else {
        console.error('No task ID found for delete button');
    }
  });

  console.log("Created task card element:", taskEl[0]);

  return taskEl;
}
// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
  console.log("Rendering task list");
  $('#todo-cards, #in-progress-cards, #done-cards').empty();

  if (!tasks || !Array.isArray(tasks)) {
      console.error('Tasks is not properly initialized');
      tasks = [];
      return;
  }

  console.log("Tasks to render:", tasks);

  tasks.forEach((task) => {
      if (task && task.id && task.status) {
          const taskCard = createTaskCard(task);
          console.log(`Appending task ${task.id} to #${task.status}-cards`);
          $(`#${task.status}-cards`).append(taskCard);
      } else {
          console.warn('Skipped rendering an invalid task:', task);
      }
  });

  // Re-initialize draggable functionality
  $('.task-card').draggable({
      opacity: 0.7,
      zIndex: 100,
      cursor: 'move',
      containment: '.lanes',
      connectToSortable: '.lane'
  });
}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
    event.preventDefault();

    const taskTitle = $('#task-title').val().trim();
    const taskDescription = $('#task-description').val().trim();
    const taskDate = $('#task-date').val();
  
    if (taskTitle && taskDescription && taskDate) {
      const newTask = {
        id: generateTaskId(),
        title: taskTitle,
        description: taskDescription,
        dueDate: taskDate,
        status: 'todo'
      };
      console.log("New Task:", newTask);
      tasks.push(newTask);
      console.log("Updated tasks array:", tasks); 
      saveTasks();
      renderTaskList();
  
      $('#task-modal').modal('hide');
      $('#task-form')[0].reset();
    }else {
        console.log("Task not added: Missing required fields");
    }
}
// Todo: create a function to handle deleting a task
function deleteTask(taskId) {
  console.log('Attempting to delete task with ID:', taskId);
  
  if (typeof taskId !== 'string') {
      console.error('Invalid task ID:', taskId);
      return;
  }

  const taskIndex = tasks.findIndex(task => task.id === taskId);
  
  if (taskIndex !== -1) {
      tasks.splice(taskIndex, 1);
      saveTasks();
      console.log('Task deleted successfully');
  } else {
      console.log('Task not found in tasks array, it may have already been deleted');
  }

  // Remove the task card from the DOM
  $(`#${taskId}`).remove();
}
// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
  const taskId = ui.draggable.attr('id');
  const newStatus = event.target.id.replace('-cards', ''); // Remove '-cards' from the id

  console.log(`Task ${taskId} dropped into ${newStatus} lane`);

  const taskIndex = tasks.findIndex(task => task.id === taskId);
  if (taskIndex !== -1) {
      tasks[taskIndex].status = newStatus;
      saveTasks();
      
      // Re-render the entire task list
      renderTaskList();
  }
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
  tasks = loadTasks();
  console.log('Initial tasks loaded:', tasks);
    renderTaskList();
  
    $('.lane').droppable({
      accept: '.task-card',
      drop: handleDrop
    });
     
    // Initialize task creation form
     $('#create-task-form').on('submit', function(event) {
      event.preventDefault();
      handleAddTask();
    });


    $('#create-task').on('click', function() {
      $('#task-modal').modal('show');
    });
  
    $('#save-task').on('click', handleAddTask);
  
    $(document).on('click', '.delete-task', deleteTask);
  
    $('#task-date').datepicker({
      minDate: 0
    });
});
