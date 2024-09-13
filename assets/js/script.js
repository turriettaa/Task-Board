$(function () {
    // Display current date and time
    function updateDateTime() {
        $('#currentDay').text(dayjs().format('MMMM D, YYYY HH:mm:ss'));
    }
    setInterval(updateDateTime, 1000);

    // Load tasks from localStorage
    function loadTasks() {
        return JSON.parse(localStorage.getItem('tasks')) || [];
    }

    // Save tasks to localStorage
    function saveTasks(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Render tasks on the board
    function renderTasks() {
        const tasks = loadTasks();
        $('.list-group').empty();
        tasks.forEach((task, index) => {
            const taskEl = $(`
                <div class="list-group-item task-item" data-task-id="${index}">
                    <h5>${task.title}</h5>
                    <p>${task.description}</p>
                    <p>Deadline: ${task.deadline}</p>
                    <button class="btn btn-danger btn-sm float-end delete-task">Delete</button>
                </div>
            `);
            
            const deadline = dayjs(task.deadline);
            const now = dayjs();
            if (now.isAfter(deadline)) {
                taskEl.addClass('overdue');
            } else if (deadline.diff(now, 'day') <= 2) {
                taskEl.addClass('near-deadline');
            }

            $(`#${task.status}`).append(taskEl);
        });
    }

    // Make tasks draggable
    $('.list-group').sortable({
        connectWith: '.list-group',
        update: function(event, ui) {
            const taskId = ui.item.data('task-id');
            const newStatus = ui.item.parent().attr('id');
            const tasks = loadTasks();
            tasks[taskId].status = newStatus;
            saveTasks(tasks);
        }
    });

    // Create new task
    $('#create-task').on('click', function() {
        $('#task-modal').modal('show');
    });

    // Save new task
    $('#save-task').on('click', function() {
        const title = $('#task-title').val();
        const description = $('#task-description').val();
        const deadline = $('#task-deadline').val();
        if (title && description && deadline) {
            const tasks = loadTasks();
            tasks.push({
                title,
                description,
                deadline,
                status: 'not-started'
            });
            saveTasks(tasks);
            renderTasks();
            $('#task-modal').modal('hide');
            $('#task-form')[0].reset();
        }
    });

    // Delete task
    $(document).on('click', '.delete-task', function() {
        const taskId = $(this).closest('.task-item').data('task-id');
        const tasks = loadTasks();
        tasks.splice(taskId, 1);
        saveTasks(tasks);
        renderTasks();
    });

    // Initial render
    renderTasks();
});
