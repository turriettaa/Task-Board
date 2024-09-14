# Task Management Board

## Description

This Task Management Board is a dynamic, interactive web application that allows users to organize and track their tasks across different stages of completion. Built with HTML, CSS, and JavaScript (with jQuery), it provides a visual and intuitive interface for managing tasks.

## Features

- Create new tasks with titles, descriptions, and due dates
- Drag and drop tasks between different status lanes (To Do, In Progress, Done)
- Color-coded tasks based on due dates and status:
  - Red: Overdue tasks
  - Yellow: Tasks due within 2 days
  - White: Tasks not urgent or completed
- Persistent storage: Tasks are saved in the browser's local storage
- Delete tasks with a single click
- Responsive design for use on various devices

## How to Use

1. **Adding a Task**:
   - Click the "Add Task" button
   - Fill in the task details (title, description, due date)
   - Submit the form to create a new task in the "To Do" lane

2. **Moving Tasks**:
   - Click and drag a task card to move it between lanes
   - The task's status updates automatically based on its new lane

3. **Completing Tasks**:
   - Drag a task to the "Done" lane to mark it as complete
   - Completed tasks turn white regardless of their due date

4. **Deleting Tasks**:
   - Click the "Delete" button on any task card to remove it from the board

5. **Viewing Task Details**:
   - Each task card displays the task's title, description, and due date

## Technical Details

- Built with HTML5, CSS3, and JavaScript
- Uses jQuery for DOM manipulation and drag-and-drop functionality
- Implements local storage for data persistence across browser sessions

## Installation

1. Clone the repository to your local machine
2. Open the `index.html` file in a web browser

No additional installation or setup is required as this is a client-side application.

## Future Enhancements

- User accounts and cloud storage for task data
- Filtering and sorting options for tasks
- Ability to add labels or categories to tasks
- Collaborative features for team task management

## Contributing

Contributions to improve the Task Management Board are welcome. Please feel free to fork the repository, make changes, and submit pull requests.

## License

[MIT License](LICENSE.md)

## Contact

For any questions or feedback, please open an issue in the GitHub repository.
