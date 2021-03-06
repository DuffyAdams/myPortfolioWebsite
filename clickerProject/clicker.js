
function empty() {
  var x;
  var letters = (/^[A-Za-z]+$/);
  x = document.getElementById("username").value;
  if (x == "") {
    alert("Please enter a valid username");
    return false;
  };
  if (x.length > 10) {
    alert("Username must be shorter than 12 characters");
    return false;
  };
  if (!x.match(letters)) {
    alert('Please input alphabet characters only');
    return false;
  };
  if (confirm("Submitting a score will decrease count by 50%\nDo you want to continue?") == true) {
  }

}
function resetConfirmation() {
  if (confirm("Are you sure you want to reset?") == true) {
    startGame();
    location.reload();
  }
}
var clickBonusAmount = null;
var random = null;
var button = document.getElementById("clickme");
var button2 = document.getElementById("upgrade");
document.getElementById("upgrade").disabled = true;
var button3 = document.getElementById("passiveUpgrade");
document.getElementById("passiveUpgrade").disabled = true;
var countDisplay = document.getElementById("count-display");
var persecDisplay = document.getElementById("persec-display");
var savButton = document.getElementById("saveGame");
const progressBar = document.querySelector("#progress-bar");

const myBtn = document.getElementById("lightmode");
const theme = document.getElementById("theme-link");

myBtn.addEventListener("click", function () {
  if (theme.getAttribute("href") == "styles.css") {
    theme.href = "dark-styles.css";
  } else {
    theme.href = "styles.css";
  }
});

function startGame() {
  username = "Guest";
  convertCount = 0;
  count = 0;
  upgrade = 0;
  seconds = 0;
  upgradeCost = 10;
  clickPower = 1;
  passiveUpgradeCost = 10;
  passiveUpgrade = 0;
  timeSpeed = 1000;
  autoClickPower = 0;
}
startGame();
load();
displayButtons();
check_count();
myInterval = setInterval(function () {
  for (var i = 0; i < 1; i++) {
    update()
  }
}, timeSpeed);

function displayButtons() {
  convertCount = nFormatter(count, 2);
  upgradeCost = round5(upgradeCost);
  passiveUpgradeCost = round5(passiveUpgradeCost);

  countDisplay.innerHTML = convertCount;
  button2.innerHTML =
    "Clicker Upgrade: " +
    nFormatter(clickPower, 2) +
    " (" +
    nFormatter(upgradeCost, 2) +
    ")";
  button3.innerHTML =
    "Auto Click Upgrade: " +
    nFormatter(passiveUpgrade, 2) +
    " (" +
    nFormatter(passiveUpgradeCost, 2) +
    ")";
}

function save() {
  localStorage.setItem("timeSpeed", JSON.stringify(timeSpeed));
  localStorage.setItem("darkMode", JSON.stringify(darkMode));
  localStorage.setItem("upgrade", JSON.stringify(upgrade));
  localStorage.setItem("count", JSON.stringify(count));
  localStorage.setItem("seconds", JSON.stringify(seconds));
  localStorage.setItem("upgradeCost", JSON.stringify(upgradeCost));
  localStorage.setItem("passiveUpgrade", JSON.stringify(passiveUpgrade));
  localStorage.setItem(
    "passiveUpgradeCost",
    JSON.stringify(passiveUpgradeCost)
  );
  localStorage.setItem("clickPower", JSON.stringify(clickPower));
  localStorage.setItem("timeSpeed", JSON.stringify(timeSpeed));
  localStorage.setItem("autoClickPower", JSON.stringify(autoClickPower));
}
function load() {
  darkMode = JSON.parse(localStorage.getItem("darkMode") || true);
  timeSpeed = JSON.parse(localStorage.getItem("timeSpeed") || 1000);
  upgrade = JSON.parse(localStorage.getItem("upgrade") || 0);
  count = JSON.parse(localStorage.getItem("count") || 0);
  seconds = JSON.parse(localStorage.getItem("seconds") || 0);
  upgradeCost = JSON.parse(localStorage.getItem("upgradeCost") || 10);
  passiveUpgrade = JSON.parse(localStorage.getItem("passiveUpgrade") || 0);
  passiveUpgradeCost = JSON.parse(
    localStorage.getItem("passiveUpgradeCost") || 10
  );
  clickPower = JSON.parse(localStorage.getItem("clickPower") || 1);
  timeSpeed = JSON.parse(localStorage.getItem("timeSpeed") || timeSpeed);
  autoClickPower = JSON.parse(localStorage.getItem("autoClickPower") || 0);
}

function check_count() {
  if (count >= upgradeCost) {
    document.getElementById("upgrade").disabled = false;
  } else {
    document.getElementById("upgrade").disabled = true;
  }
  if (count >= passiveUpgradeCost) {
    document.getElementById("passiveUpgrade").disabled = false;
  } else {
    document.getElementById("passiveUpgrade").disabled = true;
  }
  displayButtons();
  save();
}
function nFormatter(num, digits) {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "B" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "Q" },
    { value: 1e18, symbol: "Qu" },
    { value: 1e21, symbol: "S" },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });
  return item
    ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol
    : "0";
}
function update() {
  count += autoClickPower;
  check_count();
  clickerBar = ((count / upgradeCost) * 100);
  autoClickerBar = ((count / passiveUpgradeCost) * 100);
  if (clickerBar > autoClickerBar) {
    progressBar.style.width = clickerBar + "%";
    if (clickerBar > 100) {
      progressBar.style.background = 'rgb(' + [46, 204, 113].join(',') + ')';
    }
    else {
      progressBar.style.background = 'rgb(' + [52, 152, 219].join(',') + ')';
    }
  } else {
    progressBar.style.width = autoClickerBar + "%";
    if (autoClickerBar > 100) {
      progressBar.style.background = 'rgb(' + [46, 204, 113].join(',') + ')';
    }
    else {
      progressBar.style.background = 'rgb(' + [52, 152, 219].join(',') + ')';
    }
  }
}

function autoClickerFunc() {
  update();
  count -= Math.round(passiveUpgradeCost);
  passiveUpgrade += 1;
  passiveUpgradeCost = passiveUpgradeCost * 1.08;
  autoClickPower += 1;
  perSec();
  if (passiveUpgrade % 10 === 0 && passiveUpgrade != 0) {
    timeSpeed = timeSpeed /1.15;
    clearInterval(myInterval);
    myInterval = setInterval(function () {
      for (var i = 0; i < 1; i++) {
        update()
      }
    }, timeSpeed);
    console.log(timeSpeed/1000 + " Seconds");

  }
  check_count();
  update();
}
function round5(x) {
  return Math.ceil(x / 5) * 5;
}
function buyUpgradeFunc() {
  update();
  count -= upgradeCost;
  upgrade += 1
  upgradeCost = upgradeCost * 1.05;
  clickPower += 1;
  console.log(clickPower);
  button2.innerHTML =
    "Clicker Upgrade: " + clickPower + " (" + upgradeCost + ")";
  countDisplay.innerHTML = count;
  check_count();
}
function clickMeFunc() {
  count += clickPower;
  update();

}
function perSec(){
  persecDisplay.innerHTML = nFormatter((1000/timeSpeed) * autoClickPower,2) + " per/sec"
}

function pop(e) {
  let amount = 1;
  switch (e.target.dataset.type) {
    case "shadow":
    case "line":
      amount = 60;
      break;
  }
  // Quick check if user clicked the button using a keyboard
  if (e.clientX === 0 && e.clientY === 0) {
    const bbox = e.target.getBoundingClientRect();
    const x = bbox.left + bbox.width / 2;
    const y = bbox.top + bbox.height / 2;
    for (let i = 0; i < 1; i++) {
      // We call the function createParticle 30 times
      // We pass the coordinates of the button for x & y values
      createParticle(x, y, e.target.dataset.type);
    }
  } else {
    for (let i = 0; i < amount; i++) {
      createParticle(
        e.clientX,
        e.clientY + window.scrollY,
        e.target.dataset.type
      );
    }
  }
}
function createParticle(x, y, type) {
  const particle = document.createElement("particle");
  const particleClickMe = document.createElement("particleClickMe");
  document.body.appendChild(particle);
  document.body.appendChild(particleClickMe);
  let width = Math.floor(Math.random() * 30 + 8);
  let height = width;
  let destinationX = (Math.random() - 0.5) * 300;
  let destinationY = (Math.random() - 0.5) * 300;
  let rotation = Math.random() * 520;
  let delay = Math.random() * 100;
  function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  switch (type) {
    case "square":
      particle.style.background = `hsl(${Math.random() * 90 + 270
        }, 70%, 60%)`;
      particle.style.border = "1px solid white";
      break;
    case "money": {
      random = Math.floor(Math.random() * 100) + 1
      if (random < 10 && random > 2) {

        clickBonusAmount = randomIntFromInterval(2, 15);
        bonusClick = clickPower * clickBonusAmount;
        count += (bonusClick-1);
        particle.innerHTML = ["", "", "", "<span style='color:#f1c40f','font-weight: bolder'>" + " +" + bonusClick + "</span>", "", "", ""][
          Math.floor(3)

        ];


        check_count();
        displayButtons();
      }
      else if (random < 2) {
        clickBonusAmount = randomIntFromInterval(100, 150);
        bonusClick = clickPower * clickBonusAmount;
        count += (bonusClick-1);
        particle.innerHTML = ["", "", "", "<span style='color:#2ecc71'>" + " +" + bonusClick + "</span>", "", "", ""][
          Math.floor(3)

        ];


        check_count();
        displayButtons();

      }
      else {
        particle.innerHTML = ["", "", "", " +" + clickPower, "", "", ""][
          Math.floor(3)
        ];
      }

    }
      particle.style.fontSize = `${Math.random() * 5 + 2}vh`;
      width = height = "auto";
      break;
    case "autoClick":
      if (autoClickPower % 10 == 0) {
        particle.innerHTML = ["????", "????", "????", "????", "????", "????", "????"][
        Math.floor(1)
        ];
      } else{
        particle.innerHTML = ["???", "???", "???", "", "", "", ""][
          Math.floor(1)
        ];
      }

      particle.style.fontSize = `${Math.random() * 5 + 2}vh`;
      width = height = "auto";
      break;
    case "upgradeIcon":
      particle.innerHTML = ["????", "????", "????", "???", "???", "???", "???"][
        Math.floor(1)
      ];
      particle.style.fontSize = `${Math.random() * 5 + 2}vh`;
      width = height = "auto";
      break;
    case "shadow":
      var color = `hsl(${Math.random() * 90 + 90}, 70%, 50%)`;
      particle.style.boxShadow = `0 0 ${Math.floor(
        Math.random() * 10 + 10
      )}px ${color}`;
      particle.style.background = color;
      particle.style.borderRadius = "50%";
      width = height = Math.random() * 5 + 4;
      break;
    case "line":
      var color = `hsl(${Math.random() * 90 + 90}, 70%, 50%)`;
      particle.style.background = "black";
      height = 1;
      rotation += 1000;
      delay = Math.random() * 1000;
      break;
  }

  particle.style.width = `${width}px`;
  particle.style.height = `${height}px`;
  const animation = particle.animate(
    [
      {
        transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(0deg)`,
        opacity: 1,
      },
      {
        transform: `translate(-50%, -50%) translate(${x + destinationX}px, ${y + destinationY
          }px) rotate(${rotation}deg)`,
        opacity: 0,
      },
    ],
    {
      duration: Math.random() * 1000 + 5000,
      easing: "cubic-bezier(0, .9, .57, 1)",
      delay: delay,
    }
  );
  animation.onfinish = removeParticle;
}
function removeParticle(e) {
  e.srcElement.effect.target.remove();
}

if (document.body.animate) {
  document
    .querySelectorAll("button")
    .forEach((button) => button.addEventListener("click", pop));
}
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn2 = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn2.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}