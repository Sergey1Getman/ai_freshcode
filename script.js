document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("todo-form");
  const input = document.getElementById("todo-input");
  const list = document.getElementById("todo-list");

  let todos = JSON.parse(localStorage.getItem("todos")) || [];

  function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  function renderTodos() {
    list.innerHTML = "";
    todos.forEach((todo, index) => {
      const li = document.createElement("li");
      li.className = "todo-item" + (todo.done ? " done" : "");
      const span = document.createElement("span");
      span.textContent = todo.text;
      li.appendChild(span);

      const buttonsDiv = document.createElement("div");
      buttonsDiv.className = "todo-buttons";

      const toggleBtn = document.createElement("button");
      toggleBtn.textContent = todo.done ? "↩️" : "✅";
      toggleBtn.onclick = () => {
        todos[index].done = !todos[index].done;
        saveTodos();
        renderTodos();
      };

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "🗑️";
      deleteBtn.onclick = () => {
        todos.splice(index, 1);
        saveTodos();
        renderTodos();
      };

      buttonsDiv.appendChild(toggleBtn);
      buttonsDiv.appendChild(deleteBtn);
      li.appendChild(buttonsDiv);

      list.appendChild(li);
    });
  }

  form.onsubmit = (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (text !== "") {
      todos.push({ text, done: false });
      input.value = "";
      saveTodos();
      renderTodos();
    }
  };

  renderTodos();
});
