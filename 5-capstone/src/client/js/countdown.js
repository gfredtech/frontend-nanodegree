// Countdown clock inspiration found at https://www.w3schools.com/howto/howto_js_countdown.asp
function displayCountdown(tripDate) {
  // Set the date we're counting down to
  var countDownDate = new Date(tripDate).getTime();

  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));

  // Display the result in the element with id="countdown"
  if (document.getElementById("countdown")) {
    document.getElementById("countdown").innerHTML = `Days until trip: ${days}`;
  }

  // Update text if countdown has finished.
  if (distance < 0) {
    document.getElementById("countdown").innerHTML = "Trip has passed";
  }

  return days;
}

export { displayCountdown };
