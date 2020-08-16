/** @format */

const form = document.getElementById('js-form'),
  input = form.querySelector('input'),
  pendingList = document.getElementById('js-pending'),
  doneList = document.getElementById('js-done');

const PENDING_LS = 'PENDING',
  DONE_LS = 'DONE';

let pendingTasks = [], doneTasks = [];

// Task object
function getTaskObject(text) {
  return {
    id: String(new Date().getTime()),
    text,
  };
}

// Utility
function findItem(id, list) {
  return list.find((task) => task.id === id);
}

function addToPending(task) {
  pendingTasks.push(task);
}

function addToDone(task) {
  doneTasks.push(task);
}

function removeFromPending(id) {
  pendingTasks = pendingTasks.filter((task) => task.id !== id);
}

function removeFromDone(id) {
  doneTasks = doneTasks.filter((task) => task.id !== id);
}

// Delete
function deleteTask(e) {
  const li = e.target.parentNode;
  li.parentNode.removeChild(li);
  removeFromPending(li.id);
  removeFromDone(li.id);
  saveState();
}

// Do/Undo
function checkTask(event) {
  const target = event.target.parentNode;
  target.parentNode.removeChild(target);
  const task = findItem(target.id, pendingTasks);
  removeFromPending(target.id);
  addToDone(task);
  paintDoneTask(task);
  saveState();
}

function undoTask(event) {
  const target = event.target.parentNode;
  target.parentNode.removeChild(target);
  const task = findItem(target.id, doneTasks);
  removeFromDone(target.id);
  addToPending(task);
  paintPendingTask(task);
  saveState();
}

// Paint
function makeTaskItem(task) {
  const li = document.createElement('li');
  const label = document.createElement('span');
  const deleteBtn = document.createElement('button');
  label.innerText = task.text;
  deleteBtn.classList.add('btn-delete');
  deleteBtn.innerText = '×';
  deleteBtn.addEventListener('click', deleteTask);
  li.append(label, deleteBtn);
  li.id = task.id;

  return li;
}

function paintPendingTask(task) {
  const ui = makeTaskItem(task);
  const checkBtn = document.createElement('button');
  checkBtn.classList.add('btn-check');
  checkBtn.innerText = '✌︎';
  checkBtn.addEventListener('click', checkTask);
  ui.append(checkBtn);
  pendingList.append(ui);
}

function paintDoneTask(task) {
  const ui = makeTaskItem(task);
  const undoBtn = document.createElement('button');
  undoBtn.classList.add('btn-undo');
  undoBtn.innerText = '←';
  undoBtn.addEventListener('click', undoTask);
  ui.append(undoBtn);
  doneList.append(ui);
}

// Save
function saveState() {
  localStorage.setItem(PENDING_LS, JSON.stringify(pendingTasks));
  localStorage.setItem(DONE_LS, JSON.stringify(doneTasks));
}

// Submit
function handleSubmit(event) {
  event.preventDefault();
  if (input.value === '') return;

  const taskObj = getTaskObject(input.value);
  input.value = '';

  paintPendingTask(taskObj);
  addToPending(taskObj);
  saveState();
}

// Load
function loadState() {
  pendingTasks = JSON.parse(localStorage.getItem(PENDING_LS)) || [];
  doneTasks = JSON.parse(localStorage.getItem(DONE_LS)) || [];

  pendingTasks.forEach((item) => paintPendingTask(item));
  doneTasks.forEach((item) => paintDoneTask(item));
}

function init() {
  loadState();
  form.addEventListener('submit', handleSubmit);
}

init();
