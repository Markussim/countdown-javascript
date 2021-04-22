var input = 0;
var countdownTimeInt = 0;

setTimeout(function () {
  input = myText.value;
}, 100);

let titleUpdate = false;

function update() {
  var d = new Date();
  var n = d.getTime();
  let inputUpdate = document.getElementById("myText").value;

  let myText = document.getElementById("myText");
  let textBox = document.getElementById("textBox");
  let minuteBox = document.getElementById("minuteBox");
  let hourBox = document.getElementById("hourBox");

  if (
    input.toString().length == 5 &&
    !Number.isNaN(countdownTimeInt) &&
    Number(inputUpdate.toString().substr(0, 2)) <= 23 &&
    Number(inputUpdate.toString().substr(inputUpdate.toString().length - 2)) <=
      59
  ) {
    if (-1 * ((n - countdownTimeInt) / 1000) < 0) {
      localStorage.removeItem("time");
      console.log("countdownTimeInt");
      document.getElementById("myText").value = "";
      onInputThing();
    }
    myText.className = "transparent";
    myText.disabled = true;
    localStorage.setItem("time", inputUpdate);
    textBox.innerHTML =
      (-1 * ((n - countdownTimeInt) / 1000)).toFixed(3) + " in seconds";
    minuteBox.innerHTML =
      (-1 * ((n - countdownTimeInt) / 60000)).toFixed(3) + " in minutes";
    document.getElementById("hourBox").innerHTML =
      (-1 * ((n - countdownTimeInt) / 60000 / 60)).toFixed(3) + " in hours";

    if (!titleUpdate) {
      updateTitle();
    }
  } else {
    textBox.innerHTML = "Please input time";
    minuteBox.innerHTML = "";
    hourBox.innerHTML = "";
    myText.className = "";
    myText.disabled = false;
  }

  window.requestAnimationFrame(update);
}

window.requestAnimationFrame(update);

function updateTitle() {
  var d = new Date();
  var n = d.getTime();
  titleUpdate = true;

  if (-1 * ((n - countdownTimeInt) / 60000) > 0) {
    document.title =
      (-1 * ((n - countdownTimeInt) / 60000)).toFixed(1) + " minutes";
  } else {
    document.title = "Countdown";
    titleUpdate = false;
  }

  let timeLeftToUpdate =
    -1 * ((n - countdownTimeInt) / 60000) * 60000 -
    (-1 * ((n - countdownTimeInt) / 60000)).toFixed(1) * 60000;

  if (timeLeftToUpdate < 0) {
    timeLeftToUpdate *= -1;
    timeLeftToUpdate = 3000 - timeLeftToUpdate;
    timeLeftToUpdate += 3000;
  }

  if (timeLeftToUpdate <= 500) timeLeftToUpdate += 6000;

  console.log(parseInt(timeLeftToUpdate.toFixed(0)));

  if (titleUpdate) {
    setTimeout(function () {
      updateTitle();
    }, timeLeftToUpdate);
  }
}

function onInputThing() {
  let myText = document.getElementById("myText");
  let textBox = document.getElementById("textBox");
  let minuteBox = document.getElementById("minuteBox");
  let hourBox = document.getElementById("hourBox");

  let countdownTime = new Date();

  input = document.getElementById("myText").value;

  countdownTime.setHours(Number(input.toString().substr(0, 2)));

  countdownTime.setMinutes(
    Number(input.toString().substr(input.toString().length - 2))
  );

  countdownTime.setSeconds(0);

  countdownTime.setMilliseconds(0);

  countdownTimeInt = countdownTime.getTime();

  if (myText.value.length == 3 && !isNaN(myText.value.substr(2, 2))) {
    let cutValue = myText.value.substr(0, 2);

    myText.value =
      myText.value.substring(0, 2) + ":" + myText.value.substr(2, 2);
  }

  if (myText.value.length == 3) {
    myText.value = myText.value.substring(0, 2) + ":";
  }
}
function clearTime() {
  document.getElementById("myText").value = "";
  onInputThing();
}

function onLoad() {
  if (localStorage.getItem("time")) {
    console.log(localStorage.getItem("time"));
    document.getElementById("myText").value = localStorage.getItem("time");
    onInputThing();
  }
}
