// -------------------- Declaring the variables that hold the DOM elements --------------------
const elAddTaskBtn = document.querySelector("#addTaskBtn");
const elTaskInput = document.querySelector("#taskInput");
const elTaskList = document.querySelector("#taskList");
const elWarningMsg = document.querySelector("#warningMsg");
const elNumOfCompletes = document.querySelector("#numOfCompletes");

// -------------------- Declaring a variable for the section "completed..." --------------------
let completedCount = 0; 

// -------------------- Declaring variables for the section "adding list items to an array" --------------------
const taskData = []; // Creates an empty array variable that stores the list items as objects.
let nextId = 1; // Creates a counter variable to give each list item a unique id.



// -------------------- The main function --------------------
elAddTaskBtn.addEventListener("click", addTodoItem); 
elTaskInput.addEventListener("keydown", function (event) { 
    if (event.key === "Enter") { 
        addTodoItem(); 
    }
});

function addTodoItem(){
    const inputText = elTaskInput.value; 

    // ----- Warning message -----
    if (inputText.trim() === "") { 
        elWarningMsg.textContent = "Input must not be empty";
        return;
    }
    elWarningMsg.textContent = ""; 

    // ----- Creation of list items -----
    const newItem = document.createElement("li"); 
    elTaskList.appendChild(newItem); 
    const newItemLabel = document.createElement("span"); 
    newItemLabel.textContent = inputText; 
    newItem.appendChild(newItemLabel); 

    // ----- Adding list items to an array -----
    const taskId = nextId++; // assigns a list item a unique id, and increments the counter.
    newItem.dataset.id = taskId; // stores that id on the "li" so it can be matched back to its object in taskData later.

    const newTask = {id: taskId, text: inputText, completed: false}; // creates an object holding the li data, id, text, and completed status.
    taskData.push(newTask); // adds the created object above to the end of the taskData array.

    // ----- Adds the class name "completed" to list items that you click on -----    
    newItemLabel.addEventListener("click", function () { 
        if (newItem.getAttribute("class") == "completed") { 
            newItem.setAttribute("class", ""); 
            completedCount--; 
        }
        else {
            newItem.setAttribute("class", "completed"); 
            completedCount++; 
        }

        elNumOfCompletes.textContent = completedCount; 

        const matchingTask = taskData.find(task => task.id === taskId); // finds the object in taskData whose id matches this task's id.
        matchingTask.completed = !matchingTask.completed; // flips its completed boolean (true to false, false to true).
    });

    // ----- Creates a delete button and adds it to the list items -----
    const newDeleteBtn = document.createElement("button");
    newDeleteBtn.textContent = "🗑️"; 
    newDeleteBtn.setAttribute("class", "deleteBtn"); 
    newItem.appendChild(newDeleteBtn); 

    newDeleteBtn.addEventListener("click", function () { 
        const matchingTask = taskData.find(task => task.id === taskId); // finds this task's object before it's removed (array function).

        if (matchingTask.completed) { 
            completedCount--; 
            elNumOfCompletes.textContent = completedCount; 
        }

        newItem.remove(); 
        taskData = taskData.filter(task => task.id !== taskId); // creates a new array excluding this task, and stores it back in taskData (array function).
    });

    elTaskInput.value = ""; 
}