const form = document.getElementById('js-form-user');
const input = form.querySelector('input');
const username = document.getElementById('js-username');

const USER_LS = 'currentUser',
      ACTIVE_CLASSNAME = 'show';

function saveName(name) {
  localStorage.setItem(USER_LS, name);
}

function handleSubmit(event) {
  event.preventDefault();
  if (input.value === '') return;

  paintUsername(input.value);
  saveName(input.value);
}

function getUsername() {
  form.classList.add(ACTIVE_CLASSNAME);
  form.addEventListener('submit', handleSubmit);
}

function paintUsername(name) {
  form.classList.remove(ACTIVE_CLASSNAME);
  username.classList.add(ACTIVE_CLASSNAME);
  username.innerText = `Hello, ${name}`;
}

function loadState() {
  const currentUser = localStorage.getItem(USER_LS);

  if (currentUser === null) {
    getUsername();
  } else {
    paintUsername(currentUser);
  }
}

function init() {
  loadState();
}

init();
