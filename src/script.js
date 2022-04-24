import data from '../data.json' assert { type: 'json' };

const switchButtons = document.getElementsByClassName('switchButton');
const hours = document.getElementsByClassName('hours');
const prevHours = document.getElementsByClassName('prevHours');
let state = 'weekly';

for (let i = 0; i < switchButtons.length; i++) {
  switchButtons[i].addEventListener('click', handleClick);
}

function handleClick(e) {
  state = e.target.id;
  handleCurrent();
  handlePrev();
  highlightButton(state);
}

function highlightButton(state) {
  for (let i = 0; i < switchButtons.length; i++) {
    switchButtons[i].id === state
      ? (switchButtons[i].style.color = 'white')
      : (switchButtons[i].style.color = 'hsl(235, 45%, 61%)');
  }
}

function handleCurrent() {
  for (let j = 0; j < hours.length; j++) {
    for (let k = 0; k < data.length; k++) {
      if (
        hours[j].classList.contains(
          data[k].title.toLowerCase().replace(/\s+/g, '')
        )
      ) {
        handleCurrentState(data[k], hours[j]);
      }
    }
  }
}

function handleCurrentState(data, hour) {
  if (state === 'daily') {
    hour.innerHTML = `${data.timeframes.daily.current}hrs`;
  } else if (state === 'weekly') {
    hour.innerHTML = `${data.timeframes.weekly.current}hrs`;
  } else {
    hour.innerHTML = `${data.timeframes.monthly.current}hrs`;
  }
}

function handlePrev() {
  for (let j = 0; j < prevHours.length; j++) {
    for (let k = 0; k < data.length; k++) {
      if (
        prevHours[j].classList.contains(
          data[k].title.toLowerCase().replace(/\s+/g, '')
        )
      ) {
        handlePrevState(data[k], prevHours[j]);
      }
    }
  }
}

function handlePrevState(data, prevHour) {
  if (state === 'daily') {
    prevHour.innerHTML = `Last Week - ${data.timeframes.daily.previous} hrs`;
  } else if (state === 'weekly') {
    prevHour.innerHTML = `Last Week - ${data.timeframes.weekly.previous} hrs`;
  } else {
    prevHour.innerHTML = `Last Week - ${data.timeframes.monthly.previous} hrs`;
  }
}
