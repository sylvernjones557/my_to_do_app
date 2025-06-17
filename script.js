// Select necessary DOM elements
const task_form = document.querySelector("#taskForm"); // Form for adding tasks
const clear_task_button = document.querySelector("#clearTask"); // Button to clear all tasks
const task_list = document.querySelector(".task_list"); // UL where tasks will be listed
const task_input = document.querySelector("#task-input"); // Input field to enter a new task
const delete_single = document.querySelector(".delete_task"); // Not used directly in this script

// Add event listener to the form for task submission
task_form.addEventListener("submit", addTask);

// Function to handle task addition
function addTask(e) {
    if (task_input.value === "") {
        // Alert if input is empty
        alert("fill the feild properly...");
    } else {
        e.preventDefault(); // Prevent page reload on form submit

        // Create a new list item element for the task
        const li = document.createElement("li");
        li.className = "task bg-black-100 p-3 rounded-md flex justify-between items-center";
        li.innerHTML = `${task_input.value} `; // Set task text

        // Create delete button with icon
        let a = document.createElement("a");
        a.className = "delete_task";
        a.href = "#";
        a.innerHTML = `<i class="fa fa-remove"></i>`;

        // Append delete button to the task item
        li.appendChild(a);

        // Append the task item to the task list
        task_list.appendChild(li);

        // Save task to localStorage
        addDataToLocalStorage(task_input.value);

        // Clear the input field
        task_input.value = "";
    }
}

// Function to add task to localStorage
function addDataToLocalStorage(task_input) {
    let task_list;

    // Check if localStorage is empty
    if (localStorage.getItem("task") === null) {
        task_list = []; // Initialize empty array
        task_list.push(task_input); // Add the task
        localStorage.setItem("task", JSON.stringify(task_list)); // Save to localStorage
    } else {
        // If tasks exist, retrieve and add the new task
        task_list = JSON.parse(localStorage.getItem("task"));
        task_list.push(task_input);
        localStorage.setItem("task", JSON.stringify(task_list));
    }
}

// Add event listener to clear all tasks
clear_task_button.addEventListener("click", clearTask);

// Function to clear all tasks
function clearTask() {
    removeAllFromLocalStorage(); // Clear from storage
    task_list.innerHTML = ""; // Clear from UI
}

// Function to clear all tasks from localStorage
function removeAllFromLocalStorage() {
    let task = JSON.parse(localStorage.getItem("task")); // Get tasks from storage
    task.splice(0, task.length); // Remove all items
    localStorage.setItem("task", JSON.stringify(task)); // Save empty array
}

// Add event listener to delete individual tasks
task_list.addEventListener("click", delete_specific);

// Function to handle single task deletion
function delete_specific(e) {
    if (e.target.parentElement.classList.contains("delete_task")) {
        // Confirm deletion
        if (confirm("ARE YOU SURE...")) {
            // Remove task from localStorage and UI
            removeSingleFromLocalStorage(e.target.parentElement.parentElement.innerText);
            e.target.parentElement.parentElement.remove();
        }
    }
}

// Function to remove a single task from localStorage
function removeSingleFromLocalStorage(a) {
    let task = JSON.parse(localStorage.getItem("task")); // Get current tasks
    if (task.includes(a)) {
        task.splice(task.indexOf(a), 1); // Remove the specific task
        localStorage.setItem("task", JSON.stringify(task)); // Save updated list
    }
}

// Load saved tasks on page load
document.addEventListener("DOMContentLoaded", getPrevious);

// Function to display tasks saved in localStorage
function getPrevious() {
    let task;

    // Check if any task exists in localStorage
    if (localStorage.getItem("task") === null) {
        task = []; // No tasks found
    } else {
        task = JSON.parse(localStorage.getItem("task")); // Get tasks
        task.forEach(function(element) {
            // Create task item
            const li = document.createElement("li");
            li.className = "task bg-black-100 p-3 rounded-md flex justify-between items-center";
            li.innerHTML = `${element} `;

            // Create delete button
            let a = document.createElement("a");
            a.className = "delete_task";
            a.href = "#";
            a.innerHTML = `<i class="fa fa-remove"></i>`;

            // Append delete button and task to list
            li.appendChild(a);
            task_list.appendChild(li);
        });
    }
}
