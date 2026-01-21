// const STORAGE_KEY = "syncState";

// function loadState() {
//   const raw = localStorage.getItem(STORAGE_KEY);
//   if (!raw) {
//     return {
//       project: { name: "Untitled Project", createdAt: Date.now() },
//       members: [],
//       tasks: []
//     };
//   }
//   try {
//     return JSON.parse(raw);
//   } catch {
//     return {
//       project: { name: "Untitled Project", createdAt: Date.now() },
//       members: [],
//       tasks: []
//     };
//   }
// }

// function saveState(state) {
//   localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
// }

const STORE_KEY = "sync_projects_v1"

function loadProjects() {
  let raw = localStorage.getItem(STORE_KEY)
  if (!raw) return []
  try {
    return JSON.parse(raw)
  } catch (e) {
    return []
  }
}

function saveProjects(projects) {
  localStorage.setItem(STORE_KEY, JSON.stringify(projects))
}

function createProject(title, desc, members, deadline) {
  let projects = loadProjects()

  let project = {
    id: Date.now().toString(),
    title: title,
    desc: desc,
    members: members,
    deadline: deadline,
    tasks: [],
    logs: [
      { text: "project created", time: Date.now() }
    ],
    createdAt: Date.now()
  }

  projects.push(project)
  saveProjects(projects)
}

function getProjectById(id) {
  let projects = loadProjects()
  return projects.find(p => p.id === id)
}

function updateProject(updated) {
  let projects = loadProjects()
  let i = projects.findIndex(p => p.id === updated.id)
  if (i !== -1) {
    projects[i] = updated
    saveProjects(projects)
  }
}
