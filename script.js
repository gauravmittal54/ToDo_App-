// Get references to the HTML elements.
const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");
const taskCountValue = document.getElementById("task-count-value");

// Initialize an empty array to store tasks.
let tasks = [];

// Add a click event listener to the "Add Task" button.
addBtn.addEventListener("click", addTask);

// Function to add a new task to the tasks array and render the updated task list.
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") {
        showAlert("Blank task cannot be added"); // Show an alert if the input task is blank.
    } else {
        const task = {
            id: Date.now(), // Generate a unique ID for the task using the current timestamp.
            text: taskText,
            completed: false // Set the initial completion status of the task to false.
        };

        tasks.push(task); // Add the new task to the tasks array.
        renderTaskList(); // Update the UI to display the new task.
        taskInput.value = ""; // Clear the input field.
        taskInput.focus(); // Set focus back to the input field for user convenience.
    }
}

// Function to render the list of tasks on the UI.
function renderTaskList() {
    taskList.innerHTML = ""; // Clear the task list to prevent duplication.
    taskCountValue.textContent = tasks.length; // Update the task count value on the UI.

    // Iterate through the tasks array and create the UI elements for each task.
    tasks.forEach(task => {
        const listItem = document.createElement("li");
        const label = document.createElement("label");
        const checkbox = document.createElement("input");
        const deleteBtn = document.createElement("button");

        // Configure the checkbox and label elements for each task.
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        label.textContent = task.text;

        // Configure the delete button for each task.
        deleteBtn.classList.add("delete-btn");
        deleteBtn.textContent = "Delete";

        // Append the checkbox, label, and delete button to the task list item.
        listItem.appendChild(checkbox);
        listItem.appendChild(label);
        listItem.appendChild(deleteBtn);
        taskList.appendChild(listItem);

        // Add event listeners for checkbox, delete button, and task item hover effects.
        checkbox.addEventListener("change", () => {
            toggleTaskStatus(task.id); // Toggle the completion status of the task when the checkbox is clicked.
        });

        deleteBtn.addEventListener("click", () => {
            deleteTask(task.id); // Delete the task when the delete button is clicked.
        });

        listItem.addEventListener("mouseenter", () => {
            // Apply hover effects when the mouse enters the task item.
            listItem.style.transform = "scale(1.05)";
            listItem.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
            listItem.style.backgroundColor = "#f0f0f0";
        });

        listItem.addEventListener("mouseleave", () => {
            // Remove hover effects when the mouse leaves the task item.
            listItem.style.transform = "scale(1)";
            listItem.style.boxShadow = "0 2px 6px rgba(0, 0, 0, 0.1)";
            listItem.style.backgroundColor = "#f9f9f9";
        });

        label.addEventListener("click", () => {
            // Activate the edit mode for the task label when clicked.
            if (!label.classList.contains("edit-mode")) {
                activateEditMode(task, label);
            }
        });

        // Apply strikethrough effect to completed task labels.
        if (task.completed) {
            label.classList.add("completed");
        }
    });
}

// Function to activate the edit mode for a task label.
function activateEditMode(task, label) {
    label.classList.add("edit-mode");
    const originalText = label.textContent;
    const inputField = document.createElement("input");
    inputField.type = "text";
    inputField.value = task.text;
    label.textContent = "";
    label.appendChild(inputField);
    inputField.focus();

    // Function to finish editing and update the task's text.
    const finishEditing = () => {
        task.text = inputField.value.trim();
        label.textContent = task.text;
        label.classList.remove("edit-mode");
        inputField.removeEventListener("blur", finishEditing);
        inputField.removeEventListener("keyup", handleKeyUp);
    };

    // Function to handle the "Enter" key press while editing.
    const handleKeyUp = (event) => {
        if (event.key === "Enter") {
            inputField.blur();
        }
    };

    inputField.addEventListener("blur", finishEditing);
    inputField.addEventListener("keyup", handleKeyUp);
}

// Function to toggle the completion status of a task.
function toggleTaskStatus(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            return {
                ...task,
                completed: !task.completed // Toggle the completed status of the task.
            };
        }
        return task;
    });

    renderTaskList(); // Update the task list after toggling the status.
}

// Function to delete a task by its ID.
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id); // Filter out the task with the specified ID.
    renderTaskList(); // Update the task list after deleting the task.
}

// Add click event listeners to the "Check All" and "Delete All" buttons.
const checkAllBtn = document.getElementById("check-all-btn");
checkAllBtn.addEventListener("click", checkAllTasks);

const deleteAllBtn = document.getElementById("delete-all-btn");
deleteAllBtn.addEventListener("click", deleteAllTasks);

// Function to check or uncheck all tasks based on the current status
function checkAllTasks() {
    // Check if all tasks are already completed
    const allTasksChecked = tasks.every(task => task.completed);
    
    // If all tasks are completed, uncheck them all
    if (allTasksChecked) {
        tasks.forEach(task => {
            task.completed = false;
        });
        // Update the button text to "Check All"
        checkAllBtn.textContent = "Check All";
    } else {
        // If any task is incomplete, check all tasks
        tasks.forEach(task => {
            task.completed = true;
        });
        // Update the button text to "Uncheck All"
        checkAllBtn.textContent = "Uncheck All";
    }

    // Update the task list after changing the task status
    renderTaskList();
}

// Function to delete all tasks and clear the tasks array
function deleteAllTasks() {
    // Clear the tasks array
    tasks = [];
    // Update the task list after deleting all tasks
    renderTaskList();
}

// Function to show an alert message
function showAlert(message) {
    alert(message);
}


