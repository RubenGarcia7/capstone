import {
  countdownUI,
  countdownUIText1,
  countdownUIText2,
  weatherDurHeading,
  weatherDurValue
} from './variables'

// Validate Form
export function validateForm(userDestination, userDateDepart, userDateReturn, differenceDaysDep) {

  if (userDestination === '' || userDestination === null) {
    alert('Please add your destination');
    return;
  } 

  // Get today's date
  const today = new Date();

  // Create data objects for the dates entered by the user
  const userDateDepartFormatted = new Date(userDateDepart);
  const userDateReturnFormatted = new Date(userDateReturn);

  // Calculate the time difference in milisecons between now and departure time
  const differenceMsDep = userDateDepartFormatted.getTime() - today.getTime();

  // Calculate the time difference in milisecons for the duration of the trip
  const differenceMsDur = userDateReturnFormatted.getTime() - userDateDepartFormatted.getTime();

  // Convert the difference between now and departure time to days and round the number
  differenceDaysDep = Math.ceil(differenceMsDep / 1000 / 60 / 60 / 24);

  // Convert the difference for the duration of the trip to days and add 1 to count the return day as part of the trip
  const differenceDaysDur = (differenceMsDur / 1000 / 60 / 60 / 24) + 1;

  // Make sure the date entered is in the future
  if (differenceDaysDep <= 0) {
    alert('Please select a future date');
    return;
  } else if (differenceDaysDep === 1) {
    countdownUI.innerHTML = `${differenceDaysDep}`;
    countdownUIText2.style.display = 'none';
    countdownUIText1.style.display = 'inline-block';
    
  } else {
    countdownUI.innerHTML = `${differenceDaysDep}`;
    countdownUIText1.style.display = 'none';
    countdownUIText2.style.display = 'inline-block';
  }

  if (differenceDaysDur <= 0) {
    alert('Please retype your return date');
    return;
  } else if (differenceDaysDur === 1) {
    weatherDurHeading.style.display = 'block';
    weatherDurValue.innerHTML = differenceDaysDur + ' Day';
  } else {
    weatherDurHeading.style.display = 'block';
    weatherDurValue.innerHTML = differenceDaysDur + ' Days';
  }
}