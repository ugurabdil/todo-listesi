const form = document.querySelector("#todoAddForm");
const addInput = document.querySelector("#todoName");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const clearButton = document.querySelector("#clearButton");
const filterInput = document.querySelector("#todoSearch");

// const form = document.querySelector("#todoAddForm");
// const addInput = document.querySelector("#todoName");
// const todoList = document.querySelector(".list-group");
// const firstCardBody = document.querySelectorAll(".card-body")[0];
// const secondCardBody = document.querySelectorAll(".card-body")[1];
// const clearButton = document.querySelector("#clearButton");

let todos = [];
runEvents();

function runEvents() {
  form.addEventListener("submit", addTodo);
  document.addEventListener("DOMContentLoaded", pageLoaded);
  secondCardBody.addEventListener("click", removeTodoToUI);
  clearButton.addEventListener("click", allTodosEveryWhere);
  filterInput.addEventListener("keyup", filter);
}
function filter(e) {
  const filterValue = e.target.value.toLowerCase().trim();
  const todoListesi = document.querySelectorAll(".list-group-item");

  if (todoListesi.length > 0) {
    todoListesi.forEach(function (todo) {
      if (todo.textContent.toLowerCase().trim().includes(filterValue)) {
        todo.setAttribute("style", "display:block");
      } else {
        todo.setAttribute("style", "display:none !important");
      }
    });
  } else {
    showAlert("warning","Filtreleme için en az bir tane todo olması gerekmektedir.");
  }
}
function pageLoaded() {
  checkTodosFromStorge();
  todos.forEach(function (todo) {
    addTodoToUI(todo);
  });
}
function allTodosEveryWhere() {
  const todoListesi = document.querySelectorAll(".list-group-item");
  if (todoListesi.length > 0) {
    todoListesi.forEach(function (todo) {
      todo.remove();
    });
    todos = [];
    localStorage.setItem("todos", JSON.stringify(todos));
    showAlert("success", "Başarılı bir şekilde silindi");
  } else {
    showAlert("warning", "En az bir tane todo olmalıdır");
  }
}
function removeTodoToUI(e) {
  if (e.target.className === "fa fa-remove") {
    const todo = e.target.parentElement.parentElement;
    todo.remove();
    removeTodoToStorge(todo.textContent);
    showAlert("success", "Todo başarıyla silini.");
  }
}

function removeTodoToStorge(removeTodo) {
  checkTodosFromStorge();
  todos.forEach(function (todo, index) {
    if (removeTodo === todo) {
      todos.splice(index, 1);
    }
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}

function addTodo(e) {
  const inputText = addInput.value.trim();
  if (inputText == null || inputText == "") {
    // alert("lütfen bir değer giriniz!");
    showAlert("warning", "Lütfen boş girmeyiniz");
  } else {
    addTodoToUI(inputText);
    addTodoToStorage(inputText);
    showAlert("success", "Todo Eklendi.");
  }

  e.preventDefault();
}

function addTodoToUI(newTodo) {
  const li = document.createElement("li");
  li.className = "list-group-item d-flex justify-content-between";
  li.textContent = newTodo;

  const a = document.createElement("a");
  a.href = "#";
  a.className = "delete-item";

  const i = document.createElement("i");
  i.className = "fa fa-remove";
  a.appendChild(i);
  li.appendChild(a);
  todoList.appendChild(li);

  addInput.value = "";
}

function addTodoToStorage(newTodo) {
  checkTodosFromStorge();
  todos.push(newTodo);
  localStorage.setItem("todos", JSON.stringify(todos));
}
function checkTodosFromStorge() {
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
}

function showAlert(type, message) {
  /*
  <div class="alert alert-warning" role="alert">
  This is a warning alert—check it out!
</div>*/
  const div = document.createElement("div");
  //   div.className="alert alert-"+type;
  div.className = `alert alert-${type}`; //litirel template
  div.textContent = message;

  firstCardBody.appendChild(div);

  setTimeout(function () {
    div.remove();
  }, 2500);
}
