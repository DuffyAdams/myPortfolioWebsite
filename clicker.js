

if (
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
) {
  
  var button = document.getElementById("clickme");
  var button2 = document.getElementById("upgrade");
  document.getElementById("upgrade").disabled = true;
  var button3 = document.getElementById("passiveUpgrade");
  document.getElementById("passiveUpgrade").disabled = true;
  var countDisplay = document.getElementById("count-display");
  var savButton = document.getElementById("saveGame");

  const btn = document.getElementById("lightmode");
  const theme = document.getElementById("theme-link");

  btn.addEventListener("click", function () {
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
    timeSpeed = 500;
    autoClickPower = 0;
  }
  startGame();
  load();
  displayButtons();
  check_count();
  myInterval = setInterval(update, timeSpeed);

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
    upgrade = JSON.parse(localStorage.getItem("upgrade") || 0);
    count = JSON.parse(localStorage.getItem("count") || 0);
    seconds = JSON.parse(localStorage.getItem("seconds") || 0);
    upgradeCost = JSON.parse(localStorage.getItem("upgradeCost") || 10);
    passiveUpgrade = JSON.parse(localStorage.getItem("passiveUpgrade") || 0);
    passiveUpgradeCost = JSON.parse(
      localStorage.getItem("passiveUpgradeCost") || 10
    );
    clickPower = JSON.parse(localStorage.getItem("clickPower") || 1);
    timeSpeed = JSON.parse(localStorage.getItem("timeSpeed") || 500);
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
  }
  function clickMeFunc() {
    count += clickPower;
    check_count();
  }
  function round5(x) {
    return Math.ceil(x / 5) * 5;
  }
  function buyUpgradeFunc() {
    count -= upgradeCost;
    upgrade += 1;
    upgradeCost = upgradeCost * 1.1;
    clickPower += 1;
    button2.innerHTML =
      "Clicker Upgrade: " + clickPower + " (" + upgradeCost + ")";
    countDisplay.innerHTML = count;
    check_count();
  }

  function autoClickerFunc() {
    count -= Math.round(passiveUpgradeCost);
    passiveUpgrade += 1;
    passiveUpgradeCost = passiveUpgradeCost * 1.1;
    autoClickPower += 1;
    check_count();
  }
} else {
  function pop(e) {
    let amount = 30;
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
      for (let i = 0; i < 30; i++) {
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

    switch (type) {
      case "square":
        particle.style.background = `hsl(${
          Math.random() * 90 + 270
        }, 70%, 60%)`;
        particle.style.border = "1px solid white";
        break;
      case "money":
        particle.innerHTML = ["", "", "", " +" + clickPower, "", "", ""][
          Math.floor(Math.random() * 7)
        ];
        particle.style.fontSize = `${Math.random() * 24 + 10}px`;
        width = height = "auto";
        break;
      case "autoClick":
        particle.innerHTML = ["⏫", "⏫", "⏫", "", "", "", ""][
          Math.floor(Math.random() * 7)
        ];
        particle.style.fontSize = `${Math.random() * 24 + 10}px`;
        width = height = "auto";
        break;
      case "upgradeIcon":
        particle.innerHTML = ["🔼", "🔼", "🔼", "⠀", "⠀", "⠀", "⠀"][
          Math.floor(Math.random() * 7)
        ];
        particle.style.fontSize = `${Math.random() * 24 + 10}px`;
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
          transform: `translate(-50%, -50%) translate(${x + destinationX}px, ${
            y + destinationY
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

  var button = document.getElementById("clickme");
  var button2 = document.getElementById("upgrade");
  document.getElementById("upgrade").disabled = true;
  var button3 = document.getElementById("passiveUpgrade");
  document.getElementById("passiveUpgrade").disabled = true;
  var countDisplay = document.getElementById("count-display");

  const btn = document.getElementById("lightmode");
  const theme = document.getElementById("theme-link");
  const savbtn = document.getElementById("saveButton");

  btn.addEventListener("click", function () {
    if (theme.getAttribute("href") == "styles.css") {
      theme.href = "dark-styles.css";
    } else {
      theme.href = "styles.css";
    }
  });

  function startGame() {
    convertCount = 0;
    count = 0;
    upgrade = 0;
    seconds = 0;
    upgradeCost = 10;
    clickPower = 1;
    passiveUpgradeCost = 10;
    passiveUpgrade = 0;
    timeSpeed = 500;
    x = 0;
    autoClickPower = 0;
  }
  startGame();
  load();
  displayButtons();
  check_count();
  myInterval = setInterval(update, timeSpeed);

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
    upgrade = JSON.parse(localStorage.getItem("upgrade") || 0);
    count = JSON.parse(localStorage.getItem("count") || 0);
    seconds = JSON.parse(localStorage.getItem("seconds") || 0);
    upgradeCost = JSON.parse(localStorage.getItem("upgradeCost") || 10);
    passiveUpgrade = JSON.parse(localStorage.getItem("passiveUpgrade") || 0);
    passiveUpgradeCost = JSON.parse(
      localStorage.getItem("passiveUpgradeCost") || 10
    );
    clickPower = JSON.parse(localStorage.getItem("clickPower") || 1);
    timeSpeed = JSON.parse(localStorage.getItem("timeSpeed") || 500);
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
  }
  function clickMeFunc() {
    count += clickPower;
    check_count();
  }
  function round5(x) {
    return Math.ceil(x / 5) * 5;
  }
  function buyUpgradeFunc() {
    count -= upgradeCost;
    upgrade += 1;
    upgradeCost = upgradeCost * 1.1;
    clickPower += 1;
    button2.innerHTML =
      "Clicker Upgrade: " + clickPower + " (" + upgradeCost + ")";
    countDisplay.innerHTML = count;
    check_count();
  }

  function autoClickerFunc() {
    count -= Math.round(passiveUpgradeCost);
    passiveUpgrade += 1;
    passiveUpgradeCost = passiveUpgradeCost * 1.1;
    autoClickPower += 1;
    check_count();
  }
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