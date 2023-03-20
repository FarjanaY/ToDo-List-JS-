// select html elements
const todoInput = document.querySelector('.todoInput');
const todoAddButton = document.querySelector('.todoAddButton');
const todoForm = document.querySelector('.todoForm');
const message = document.querySelector('#message');
const todoList = document.querySelector('.todoList');
const filterOption = document.querySelector("#filterTodo");
// create todo element function
const createTodo = (todoId, todoValue) =>{
  const todoItem = document.createElement("li");
  todoItem.id = todoId;

  //adding style
  todoItem.classList.add("listItem");

  todoItem.innerHTML = `
    <span>${todoValue}</span>
    <span>
    <button id= 'checkBtn'><i class="fa-solid fa-check"></i></button>
    <button id= 'deleteBtn'><i class="fa-solid fa-trash"></i></button>
    </span>`;

  //adding to the unordered list
  todoList.appendChild(todoItem);

  //delete item button find out
  const checkBtn = todoItem.querySelector("#checkBtn");

  //adding listener to delete button
  checkBtn.addEventListener("click", checkTodo);

  //delete item button find out
  const deleteBtn = todoItem.querySelector("#deleteBtn");

  //adding listener to delete button
  deleteBtn.addEventListener("click", deleteTodo);
}

//Filter todo item function
const filterTodo = (e) => {
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch (e.target.value) {
          case "all":
            todo.style.display = "flex";
            break;
          case "completed":
            if (todo.classList.contains("completed")) {
              todo.style.display = "flex";
            } else {
              todo.style.display = "none";
            }
            break;
          case "pending":
            if (!todo.classList.contains("completed")) {
              todo.style.display = "flex";
            } else {
              todo.style.display = "none";
            }
            break;
        }   
       
    }) 
}


//Check Todo Function
const checkTodo = (event)=>{
    const selectItemForCheck = event.target.parentElement.parentElement.parentElement;
    selectItemForCheck.classList.toggle('completed');

}
//Delete Todo Function
const deleteTodo = (event)=>{
    const selectItemForDelete = event.target.parentElement.parentElement.parentElement;
    todoList.removeChild(selectItemForDelete );

    // showing message for delete
    showMessage("Deleted Successfully!...", 'Delete');

    let todos = getTodosFromLocalStorage();
    todos = todos.filter((todo)=> todo.todoId !== selectItemForDelete.id);
    localStorage.setItem('myTodos', JSON.stringify(todos));

}

// Get Todos list from Local storage
const getTodosFromLocalStorage = ()=>{
    return localStorage.getItem("myTodos") 
    ? JSON.parse(localStorage.getItem("myTodos")) 
    : [];    
}

// Show add and delete message function
const showMessage = (text, status)=> {
    //set message
    message.textContent = text;
    message.classList.add(`msg${status}`);

    //remove message after 1 sec
    setTimeout(()=>{
        message.textContent="";
        message.classList.remove(`msg${status}`);
    }, 1000);
}

// List add Function from input
const todoListAdd = (event)=>{
    event.preventDefault();
    const todoValue = todoInput.value;

    //UNIQUE id generate
    const todoId = Date.now().toString();
    
    //create todo list item
    createTodo(todoId, todoValue);

    //show add message 
    showMessage('Added successfully!..' , "Success");

    //adding list item into localstorage 
    const todo = getTodosFromLocalStorage();
    todo.push({todoId, todoValue});
    localStorage.setItem('myTodos', JSON.stringify(todo));

     //remove the input value
     todoInput.value="";
}

//Read or load item from loacl storage function
const loadItemFromLoacalStorage = ()=>{
    const todos = getTodosFromLocalStorage();
    todos.map((todo) => {createTodo(todo.todoId , todo.todoValue);})
}

//Event Listeners
todoForm.addEventListener('submit',todoListAdd);
filterOption.addEventListener('click', filterTodo);
window.addEventListener('DOMContentLoaded', loadItemFromLoacalStorage);