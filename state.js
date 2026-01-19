const STORAGE_KEY = "syncState";

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return {
      project: { name: "Untitled Project", createdAt: Date.now() },
      members: [],
      tasks: []
    };
  }
  try {
    return JSON.parse(raw);
  } catch {
    return {
      project: { name: "Untitled Project", createdAt: Date.now() },
      members: [],
      tasks: []
    };
  }
}

function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

