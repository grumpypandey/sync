// no modules, just simple js for now

let state = loadState();

const projectNameEl = document.getElementById("projectName");
const memberListEl = document.getElementById("memberList");
const taskListEl = document.getElementById("taskList");

projectNameEl.textContent = state.project.name;

function renderMembers() {
  memberListEl.innerHTML = "";
  state.members.forEach(member => {
    const div = document.createElement("div");
    div.textContent = member.name;
    div.style.color = member.color;
    memberListEl.appendChild(div);
  });
}

function renderTasks() {
  taskListEl.innerHTML = "";
  state.tasks.forEach(task => {
    const div = document.createElement("div");
    div.textContent = task.title;
    taskListEl.appendChild(div);
  });
}

document.getElementById("addMemberBtn").onclick = () => {
  const name = prompt("Enter member's name");
  if (!name) return;

  const member = {
    id: "m" + Date.now(),
    name,
    color: `hsl(${Math.floor(Math.random() * 360)}, 80%, 60%)`
  };

  state.members.push(member);
  saveState(state);
  renderMembers();
};

document.getElementById("addTaskBtn").onclick = () => {
  const title = prompt("Enter task title");
  if (!title) return;

  const task = {
    id: "t" + Date.now(),
    title,
    assignedTo: null,
    status: "not_started",
    due: null,
    updatedAt: Date.now()
  };

  state.tasks.push(task);
  saveState(state);
  renderTasks();
};

// initial render
renderMembers();
renderTasks();


