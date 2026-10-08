/* Save Key */
const SAVE_KEY = "potatoIncrementalSavev2.9.4";

/* Game State */
const game = {
    potatoes: 0,
    farmers: 0,
    potatoPerClick: 1,
    potatoPerSecond: 0,
    fertilizer: 0,
    tractor: 0,
    pesticide: 0,
    hoe: 0
};
/* More states */
let isPressed = false

/* Save System */
function autoSave() {
  localStorage.setItem(SAVE_KEY, JSON.stringify(game));
}

function loadGame() {
  const data = JSON.parse(localStorage.getItem(SAVE_KEY));
  if (!data) return;
  Object.assign(game, data);
}

setInterval(() => {
  autoSave();
  console.log("Autosaved.");
}, 5000);

/* UpdateUI */
function updateUI() {
  potatoText.textContent = `Potatoes: ${game.potatoes}`;
  clickvalue.textContent = `Potatoes per click: ${getClickValue()}`;
  secondvalue.textContent = `Potatoes per second: ${game.potatoPerSecond}`;
  buyFarmer.textContent = `Buy Farmer (${getFarmerCost()} Potatoes)`;
  buyFertilizer.textContent = `Buy Fertilizer (${getFertilizerCost()} Potatoes)`;
  buyTractor.textContent = `Buy Tractor (${getTractorCost()} Potatoes)`;
  buyPesticide.textContent = `Buy Pesticide (${getPesticideCost()}) Potatoes`;
  if (game.farmers >= 30) {
    document.querySelector('.tractorbutton').style.visibility = 'visible';
    }
  if (game.hoe >= 1) {
  document.querySelector('.hoe1').style.visibility = 'hidden';
  document.querySelector('.hoe2').style.visibility = 'visible';
  }
  if (game.hoe >= 2) {
  document.querySelector('.hoe2').style.visibility = 'hidden';
  document.querySelector('.hoe3').style.visibility = 'visible';
  }
  if (game.hoe >= 3) {
  document.querySelector('.hoe3').style.visibility = 'hidden';
  }
  if (game.fertilizer >= 50) {
      if (game.hoe === 3) {
  document.querySelector('.hoe4').style.visibility = 'visible';
    }}
  if (game.fertilizer >= 20) {
  document.querySelector('.pesticidebutton').style.visibility = 'visible';
  }
  // Upgrade Counts //
  farmerCount.textContent = `Farmers: ${game.farmers}`;
  fertilizerCount.textContent = `Fertilizers: ${game.fertilizer}`;
  tractorCount.textContent = `Tractors: ${game.tractor}`;
  hoeTier.textContent = `Hoe Tier: ${game.hoe}`;
  pesticideCount.textContent = `Pesticides: ${game.pesticide}`;
};

/* Safe Dom Get */
/* Game Doms */
const el = (id) => document.getElementById(id);
const potatoText = el("potatoes");
const potatoButton = el("potatoButton");
const clickvalue = el("clickvalue");
const secondvalue = el("secondvalue");
/* Upgrades */
const buyFarmer = el("buyFarmer");
const buyTractor = el("buyTractor");
const buyFertilizer = el("buyFertilizer");
const buyPesticide = el("buyPesticide");
/* Hoes */
const buyHoe1 = el("buyHoe1");
const buyHoe2 = el("buyHoe2");
const buyHoe3 = el("buyHoe3");
const buyHoe4 = el("buyHoe4");

/* Functions */
function getClickValue() {
    let value = game.potatoPerClick;

    value += game.fertilizer;
    if (game.hoe >= 4) {value *= 3};
    value += (game.pesticide *3);
    return value
}

function clickPotato() {
   
  game.potatoes += getClickValue();

    console.log("Ui Updated. Total Potatoes: " + game.potatoes);
    updateUI();
};

const potatoesPerSecond = () => {
    if (game.potatoPerSecond === 0) return;
    game.potatoes += game.potatoPerSecond;
    console.log("Ui Updated. Automatically gained: " + game.potatoPerSecond);
    updateUI();
};

function getFarmerCost() {
    return 10 + game.farmers * 10;
};

function getFertilizerCost() {
    return 40 + game.fertilizer * 30
};

function getTractorCost() {
  return 100 + game.tractor * 150;
};

function getPesticideCost() {
  return 100 + game.pesticide * 75
}

function buyFarmerfunc() {
      const cost = getFarmerCost();
    if (game.potatoes < cost) return;

    game.potatoes -= cost;
    game.farmers += 1;
    game.potatoPerSecond += 1;
    console.log("Ui Updated. Farmer Bought, Total Farmers: " + game.farmers);
    updateUI();
};

function buyFertilizerfunc() {
    const cost = getFertilizerCost();
  if (game.potatoes < cost) return;

  game.potatoes -= cost;
  game.fertilizer += 1;
  console.log("Ui Updated. Fertilizer Bought, Total Fertilizer: " + game.fertilizer);
  updateUI();
};

function buyTractorfunc() {
    const cost = getTractorCost();
    if (game.farmers < 30) return;
    if (game.potatoes < cost) return;

    game.potatoes -= cost;
    game.tractor += 1;
    game.potatoPerSecond += 3;
  console.log("Ui Updated. Tractor Bought, Total Tractors: " + game.tractor);
    updateUI();
};

function buyPesticidefunc() {
  const cost = getPesticideCost();
  if (game.fertilizer < 20) return;
  if (game.potatoes < cost) return;

  game.potatoes -= cost;
  game.pesticide += 1;
  console.log("Ui Updated. Pesticide Bought, Total Pesticides: " + game.pesticide);
  updateUI();
}

/* Events */
potatoButton.addEventListener("click", () => {
  clickPotato();
});

buyFarmer.addEventListener("click", () => {
  buyFarmerfunc();
});

buyFertilizer.addEventListener("click", () => {
  buyFertilizerfunc();
});

buyTractor.addEventListener("click", () => {
  buyTractorfunc();
});

buyPesticide.addEventListener("click", () => {
  buyPesticidefunc();
})

buyHoe1.addEventListener("click", () => {
  const cost = 500 ;
  if (game.potatoes < cost) return;

  game.potatoes -= cost;
  game.potatoPerClick += 3;
  game.hoe += 1
  console.log("Tier 1 hoe unlocked.");
  updateUI();
  document.querySelector('.hoe1').style.visibility = 'hidden';
  document.querySelector('.hoe2').style.visibility = 'visible';
});

buyHoe2.addEventListener("click", () => {
  const cost = 2500 ;
  if (game.potatoes < cost) return;

  game.potatoes -= cost;
  game.potatoPerClick += 6;
  game.hoe += 1
  console.log("Tier 2 hoe unlocked.");
  updateUI();
  document.querySelector('.hoe2').style.visibility = 'hidden';
  document.querySelector('.hoe3').style.visibility = 'visible';
});

buyHoe3.addEventListener("click", () => {
    const cost = 7500 ;
    if (game.potatoes < cost) return;
    
    game.potatoes -= cost;
    game.potatoPerClick += 10;
    game.hoe += 1
    console.log("Tier 3 hoe unlocked.");
    updateUI();
    document.querySelector('.hoe3').style.visibility = 'hidden';
})
buyHoe4.addEventListener("click", () => {
    const cost = 50000 ;
    if (game.potatoes < cost) return;

    game.potatoes -= cost;
    game.hoe += 1
    console.log("Tier 4 hoe unlocked.");
    updateUI();
    document.querySelector('.hoe4').style.visibility = 'hidden';
})

// =====================
//        Keybinds
// =====================
/* Stops spam holding enter to click (fixes insane farming of tubers) */ 
document.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "Enter":
            e.preventDefault();
            break;
/* Actually keybinds (unconfigurable currently) */
        case "1":
            buyFarmerfunc();
            break;
        case "2":
            buyFertilizerfunc();
            break;
        case "3":
            buyTractorfunc();
            break;
        case "4":
            buyPesticidefunc();
            break;
        case " ":
            if (!isPressed) {
                isPressed = true;
                clickPotato();
            }
            break;
    }
});

document.addEventListener("keyup", (e) => {
    if (e.key === " ") {
        isPressed = false;
    }
});




/* Automatics */
setInterval(() => {
    potatoesPerSecond();
}, 1000);

/* Init */
loadGame();
updateUI();