// Import SASS styles
import './styles/main.scss';

// Code to split later

const destination = document.getElementById('city');
const dateDepart = document.getElementById('date-depart');
const dateReturn = document.getElementById('date-return');
const form = document.getElementById('form');

const countdown = document.getElementById('countdown');

document.addEventListener('submit', performAction);

// Function triggered after submiting the form
function performAction(event) {
  event.preventDefault();

  const userDestination = destination.value;
  const userDateDepart = dateDepart.value;
  const userDateReturn = dateReturn.value;

  validateForm(userDestination);

  createCountdown(userDateDepart);

}

// Validate Form
function validateForm(userDestination) {

  if (userDestination === '' || userDestination === null) {
      alert('Please add your destination');
      return;
    } else {
      return true;
    }
}

// Countdown
function createCountdown (userDateDepart) {
  
  const today = new Date();

  const userDateDepartFormatted = new Date(userDateDepart);
  
  const differenceMs = userDateDepartFormatted.getTime() - today.getTime();

  const differenceDays = Math.ceil(differenceMs / 1000 / 60 / 60 / 24);

  // Make sure it's a future date
  if (differenceDays <= 0) {
    alert('Please select a future date');
    return;
  } 

  countdown.innerHTML = differenceDays;
}