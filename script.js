/* Save Key */
const SAVE_KEY = "potatoIncrementalSavev1.9.6";

/* Game State */
const game = {
    potatoes: 0,
    farmers: 0,
    potatoPerClick: 1,
    potatoesPerSecond: 0,
    fertilizer: 0,
    tractor: 0,
    pesticide: 0,
    hoe: 0,
    potatoTier: 1,
    autoHarvester: 0
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
  buyautoHarvester.textContent = `Buy Auto Harvester (${getautoHarvesterCost()}) Potatos`;
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
  //if (game.potatoTier < 2 && game.potatoes >= 100000) {
  //  game.potatoTier = 2;
  //}
  //potatoImage.src = game.potatoTier >= 2 ? 'images/potato1.png' : 'images/potato1.png';
  if (game.farmers >= 50) {
    document.querySelector('.autoHarvesterbutton').style.visibility = 'visible';
  }
  // Upgrade Counts //
  farmerCount.textContent = `Farmers: ${game.farmers}`;
  fertilizerCount.textContent = `Fertilizers: ${game.fertilizer}`;
  tractorCount.textContent = `Tractors: ${game.tractor}`;
  hoeTier.textContent = `Hoe Tier: ${game.hoe}`;
  pesticideCount.textContent = `Pesticides: ${game.pesticide}`;
  autoHarvesterCount.textContent = `Auto Harvesters: ${game.autoHarvester}`;
};

/* Safe Dom Get */
/* Game Doms */
const el = (id) => document.getElementById(id);
const potatoText = el("potatoes");
const potatoButton = el("potatoButton");
const potatoImage = el("potatoImage")
const clickvalue = el("clickvalue");
const secondvalue = el("secondvalue");
const farmerCount = el("farmerCount");
const fertilizerCount = el("fertilizerCount");
const tractorCount = el("tractorCount");
const hoeTier = el("hoeTier");
const pesticideCount = el("pesticideCount");
const autoHarvesterCount = el("autoHarvesterCount");
/* Upgrades */
const buyFarmer = el("buyFarmer");
const buyTractor = el("buyTractor");
const buyFertilizer = el("buyFertilizer");
const buyPesticide = el("buyPesticide");
const buyautoHarvester = el("buyautoHarvester");
/* Hoes */
const buyHoe1 = el("buyHoe1");
const buyHoe2 = el("buyHoe2");
const buyHoe3 = el("buyHoe3");
const buyHoe4 = el("buyHoe4");

/* Functions */
function getClickValue() {
    let value = game.potatoPerClick;

    /* Base Upgrades */
    value += game.fertilizer;
    value += (game.pesticide *3);
    /* Doubling Tripling etc. (must be at end) */
    if (game.hoe >= 4) {value *= 3};
    return value
}

function clickPotato() {
   
  game.potatoes += getClickValue();

    console.log("Ui Updated. Total Potatoes: " + game.potatoes);


    updateUI();
};

function potatoesPerSecond() {
  let value = 0;

    /* Base Upgrades */
    value += game.farmers;
    value += (game.tractor * 3);
    value += (game.autoHarvester * getClickValue());
    /* Doubling Tripling etc. (must be at end) */
    if (game.hoe >= 4) { value *= 3; }
    game.potatoPerSecond = value;
    return value;
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

function getautoHarvesterCost() {
  return 100000 + game.autoHarvester * 50000
}

function buyFarmerfunc() {
      const cost = getFarmerCost();
    if (game.potatoes < cost) return;

    game.potatoes -= cost;
    game.farmers += 1;
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

function buyautoHarvesterfunc() {
  const cost = getautoHarvesterCost();
  if (game.farmers < 50 || game.potatoes < cost) return;

  game.potatoes -= cost;
  game.autoHarvester += 1;
  console.log("Ui Updated. Auto Harvester Bought, Total Auto Harvesters: " + game.autoHarvester);
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
  game.potatoes += potatoesPerSecond();
  updateUI();
}, 1000);

setInterval;(() => {
  updateUI();
}, 50);

/* Init */
loadGame();
updateUI();