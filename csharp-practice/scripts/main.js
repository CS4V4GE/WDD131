import { topics, statuses } from "./topics.js";

const grid = document.querySelector("#topicGrid");
const difficultySelect = document.querySelector("#difficultySelect");
const categorySelect = document.querySelector("#categorySelect");
const shuffleBtn = document.querySelector("#shuffleBtn");

const progressText = document.querySelector("#progressText");
const progressFill = document.querySelector("#progressFill");
const year = document.querySelector("#year");

const STORAGE_KEY = "csharpHubStatus";

function loadStatusMap() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    return typeof parsed === "object" && parsed !== null ? parsed : {};
  } catch {
    return {};
  }
}

function saveStatusMap(map) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
}

function uniqueCategories(list) {
  const set = new Set(list.map(t => t.category));
  return ["all", ...Array.from(set).sort((a, b) => a.localeCompare(b))];
}

function shuffleArray(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function filterTopics(list) {
  const diff = difficultySelect.value;
  const cat = categorySelect.value;

  return list.filter(t => {
    const diffOk = diff === "all" || t.difficulty === diff;
    const catOk = cat === "all" || t.category === cat;
    return diffOk && catOk;
  });
}

function buildCard(topic, statusMap) {
  const card = document.createElement("article");
  card.className = "card";

  const media = document.createElement("div");
  media.className = "card-media";
  media.textContent = "Image";
  media.setAttribute("aria-hidden", "true");

  const body = document.createElement("div");
  body.className = "card-body";

  const title = document.createElement("h3");
  title.className = "card-title";
  title.textContent = topic.title;

  const meta = document.createElement("div");
  meta.className = "card-meta";

  const b1 = document.createElement("span");
  b1.className = "badge";
  b1.textContent = topic.category;

  const b2 = document.createElement("span");
  b2.className = "badge";
  b2.textContent = topic.difficulty === "beginner" ? "Beginner" : "Intermediate";

  meta.append(b1, b2);

  const desc = document.createElement("p");
  desc.className = "card-desc";
  desc.textContent = topic.description;

  const actions = document.createElement("div");
  actions.className = "card-actions";

  const select = document.createElement("select");
  select.className = "status";
  select.setAttribute("aria-label", `Status for ${topic.title}`);

  statuses.forEach(s => {
    const opt = document.createElement("option");
    opt.value = s;
    opt.textContent = s;
    select.appendChild(opt);
  });

  select.value = statusMap[topic.id] ?? "Not Started";

  select.addEventListener("change", () => {
    statusMap[topic.id] = select.value;
    saveStatusMap(statusMap);
    updateProgress(statusMap);
  });

  actions.append(select);

  body.append(title, meta, desc, actions);
  card.append(media, body);

  return card;
}

function updateProgress(statusMap) {
  const total = topics.length;
  const mastered = topics.filter(t => statusMap[t.id] === "Mastered").length;
  const inProgress = topics.filter(t => statusMap[t.id] === "In Progress").length;

  const percent = total === 0 ? 0 : Math.round((mastered / total) * 100);

  progressText.textContent = `Mastered: ${mastered} • In progress: ${inProgress} • Total: ${total}`;
  progressFill.style.width = `${percent}%`;

  const bar = document.querySelector(".progress-bar");
  if (bar) bar.setAttribute("aria-valuenow", String(percent));
}

function render(list, statusMap) {
  grid.innerHTML = "";
  if (list.length === 0) {
    const p = document.createElement("p");
    p.textContent = "No topics match your filters.";
    p.style.color = "var(--muted)";
    grid.appendChild(p);
    return;
  }
  list.forEach(t => grid.appendChild(buildCard(t, statusMap)));
}

function init() {
  if (year) year.textContent = String(new Date().getFullYear());

  const cats = uniqueCategories(topics);
  categorySelect.innerHTML = "";
  cats.forEach(c => {
    const opt = document.createElement("option");
    opt.value = c === "all" ? "all" : c;
    opt.textContent = c === "all" ? "All" : c;
    categorySelect.appendChild(opt);
  });

  const statusMap = loadStatusMap();
  updateProgress(statusMap);

  let current = [...topics];
  render(filterTopics(current), statusMap);

  function rerender() {
    render(filterTopics(current), statusMap);
  }

  difficultySelect.addEventListener("change", rerender);
  categorySelect.addEventListener("change", rerender);

  shuffleBtn.addEventListener("click", () => {
    current = shuffleArray(current);
    rerender();
  });
}

init();
