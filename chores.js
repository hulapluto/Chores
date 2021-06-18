'use strict';

const picker = datepicker('#setDate', {
  formatter: (input, date, instance) => {
    const value = date.toLocaleDateString()
    input.value = value // => '1/1/2099'
  }
});
let curDate = new Date().toLocaleDateString();

const chore = document.querySelector('#chore');
const choreLabel = document.querySelector('#choreLabel');
const choreDate = document.getElementById('setDate');
const dateLabel = document.querySelector('#dateLabel');
const output = document.querySelector('#output');
const add = document.querySelector('#addChore');

const lsTasks = JSON.parse(localStorage.getItem('tasks'));

let tasks = localStorage.getItem('tasks') !== null ? lsTasks : [];

function addChore() {
  if (chore.value === '') {
    choreLabel.innerText = "Please enter a chore or task";
    setTimeout(function() {
      choreLabel.innerText = "";
    }, 3000);
  } else if (choreDate.value === '') {
    dateLabel.innerText = "Please choose date";
    setTimeout(function() {
      dateLabel.innerText = "";
    }, 3000);
  } else {
    const task = {
      id: generateID(),
      task: chore.value,
      date: choreDate.value
    };
    tasks.push(task);
    updateLS();
    chore.value = '';
    choreDate.value = '';
  }
  init();
}

function generateID() {
  return Math.floor(Math.random() * 100000);
}

function addChoreDOM(tasks) {
    let normalDate = 'o-date';
    let pastDate = 'o-date-behind';
    let dateColor = (tasks.date < curDate) ? pastDate : normalDate;

    const el = document.createElement('div');
    el.classList.add('container');
    el.innerHTML = `
        <div class="columns">
          <div class="column is-four-fifths">
            <p class="subtitle">
              <span class="${dateColor}">${tasks.date}</span> : ${tasks.task}</p>
          </div>
          
          <div class="column">
            <div class="control chore-done">
                <button class="button is-link is-danger" onclick="removeTask(${tasks.id})">Done<span class="icon is-small ml-2"><i class="fas fa-check"></i></span></button>
              </div>
          </div>
        </div>
        <hr>`;
    output.appendChild(el);
  }

function removeTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  updateLS();
  init();
}

function updateLS() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function init() {
  output.innerHTML = '';
  tasks.forEach(addChoreDOM)
}

init();
add.addEventListener('click', addChore);