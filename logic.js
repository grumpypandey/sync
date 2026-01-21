// // no modules, just simple js for now

// let state = loadState();

// const projectNameEl = document.getElementById("projectName");
// const memberListEl = document.getElementById("memberList");
// const taskListEl = document.getElementById("taskList");

// projectNameEl.textContent = state.project.name;

// function renderMembers() {
//   memberListEl.innerHTML = "";
//   state.members.forEach(member => {
//     const div = document.createElement("div");
//     div.textContent = member.name;
//     div.style.color = member.color;
//     memberListEl.appendChild(div);
//   });
// }

// function renderTasks() {
//   taskListEl.innerHTML = "";
//   state.tasks.forEach(task => {
//     const div = document.createElement("div");
//     div.textContent = task.title;
//     taskListEl.appendChild(div);
//   });
// }

// document.getElementById("addMemberBtn").onclick = () => {
//   const name = prompt("Enter member's name");
//   if (!name) return;

//   const member = {
//     id: "m" + Date.now(),
//     name,
//     color: `hsl(${Math.floor(Math.random() * 360)}, 80%, 60%)`
//   };

//   state.members.push(member);
//   saveState(state);
//   renderMembers();
// };

// document.getElementById("addTaskBtn").onclick = () => {
//   const title = prompt("Enter task title");
//   if (!title) return;

//   const task = {
//     id: "t" + Date.now(),
//     title,
//     assignedTo: null,
//     status: "not_started",
//     due: null,
//     updatedAt: Date.now()
//   };

//   state.tasks.push(task);
//   saveState(state);
//   renderTasks();
// };

// // initial render
// renderMembers();
// renderTasks();




function qs(id) {
  return document.getElementById(id)
}

function formatTime(t) {
  let d = new Date(t)
  return d.toLocaleString()
}

/* landing */
function initLanding() {
  let list = qs("recent")
  if (!list) return

  let projects = loadProjects().slice(-3).reverse()
  projects.forEach(p => {
    let div = document.createElement("div")
    div.className = "row"
    div.innerText = p.title
    list.appendChild(div)
  })
}

/* create project */
function handleCreateProject() {
  let title = qs("title").value.trim()
  let desc = qs("desc").value.trim()
  let members = qs("members").value.split(",").map(m => m.trim())
  let deadline = qs("deadline").value

  if (!title) return alert("title missing")

  createProject(title, desc, members, deadline)
  window.location.href = "projects.html"
}

/* list projects */
function renderProjects() {
  let wrap = qs("projects")
  if (!wrap) return

  let projects = loadProjects()
  projects.forEach(p => {
    let row = document.createElement("div")
    row.className = "row clickable"
    row.innerText = p.title
    row.onclick = () => {
      window.location.href = "project.html?id=" + p.id
    }
    wrap.appendChild(row)
  })
}

/* single project */
function renderProject() {
  let params = new URLSearchParams(window.location.search)
  let id = params.get("id")
  if (!id) return

  let project = getProjectById(id)
  if (!project) return

  qs("ptitle").innerText = project.title
  qs("pdesc").innerText = project.desc
  qs("pmembers").innerText = project.members.join(", ")

  let tasks = qs("tasks")
  project.tasks.forEach(t => {
    let div = document.createElement("div")
    div.className = "row"
    div.innerText = t.title + " → " + (t.assignedTo || "unassigned")
    tasks.appendChild(div)
  })

  let logs = qs("logs")
  project.logs.slice().reverse().forEach(l => {
    let div = document.createElement("div")
    div.className = "log"
    div.innerText = "[" + formatTime(l.time) + "] " + l.text
    logs.appendChild(div)
  })
}

/* add task */
function addTask() {
  let params = new URLSearchParams(window.location.search)
  let id = params.get("id")
  let project = getProjectById(id)

  let title = qs("tasktitle").value.trim()
  let assigned = qs("assign").value.trim()

  if (!title) return

  project.tasks.push({
    id: Date.now().toString(),
    title: title,
    assignedTo: assigned || null,
    status: "open"
  })

  project.logs.push({
    text: "task added: " + title,
    time: Date.now()
  })

  updateProject(project)
  location.reload()
}
