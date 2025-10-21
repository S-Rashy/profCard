function updateTime() {
  const timeElement = document.getElementById("currentTime");
  const currentMilliseconds = "Current Time: " + Date.now(); // current time in ms
  timeElement.textContent = currentMilliseconds;
}

// Update every second (optional)
setInterval(updateTime, 1000);

// Run once at load
updateTime();
