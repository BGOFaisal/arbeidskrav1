//Denne JS-koden er laget klar for deg. Den trenger du ikke endre på.

//Stats for heroes
let heroesArray = [
  {
    id: 0,
    name: "Henriette Healer",
    maxHP: 400,
    currentHP: 400,
    damage: 100,
    alive: true,
  },
  {
    id: 1,
    name: "Ariana archer",
    maxHP: 500,
    currentHP: 500,
    damage: 400,
    alive: true,
  },
  {
    id: 2,
    name: "Wyona Warrior",
    maxHP: 600,
    currentHP: 600,
    damage: 400,
    alive: true,
  },
];

let dragonObject = {
  name: "Daar Dragon",
  maxHP: 2000,
  currentHP: 2000,
  damage: 200,
  alive: true,
};

// map the hero according to their 'id'.
const heroMap = {
  0: "healer",
  1: "archer",
  2: "warrior",
};

// all the healthbar background color opacity set to 1
document.querySelectorAll(".healthbar").forEach((item) => {
  item.style.opacity = 1;
});

// update the healthbar depending on their currentHP
function updateHealthbarBG(id, currentHP) {
  const el = document.querySelector(
    `.${typeof id === "number" ? heroMap[id] : id}-health`
  );

  const val = (currentHP * 0.1) / 100;
  el.style.opacity = Math.abs(el.style.opacity - val > 1 ? 0.8 : val);
}

function getTextHP(currentHP, maxHP) {
  return currentHP + " / " + maxHP + " HP";
}

// to get the random hero id whom are alive
function getRandomHeroId() {
  const length = heroesArray.map((item) => item.alive).length;
  return Math.floor(Math.random() * length);
}

// showing the game result
function showGameResult(message, bgColor) {
  const container = document.querySelector(".main-container");
  const div = document.createElement("div");
  const h1 = document.createElement("h1");

  h1.textContent = message;
  div.style.maxWidth = "350px";
  div.style.position = "absolute";
  div.style.top = "10px";
  div.style.left = "40%";
  div.style.backgroundColor = bgColor;
  div.style.borderRadius = "5px";
  div.style.padding = "10px";
  h1.style.textAlign = "center";
  h1.style.color = "#fff";

  h1.style.fontSize = "18px";

  div.appendChild(h1);
  container.appendChild(div);
}

function getHeroDocHP(heroName) {
  return document.getElementById(`${heroName}-health-txt`);
}

const dragonName = document.getElementById("dragon-name-txt");
const dragonHP = document.querySelector(".dragon-health-txt");

dragonName.textContent = dragonObject.name;
dragonHP.textContent = getTextHP(dragonObject.currentHP, dragonObject.maxHP);

// when pressing 'D' from the keyboard, heroes are get damage boost at 10%
document.addEventListener("keydown", function (event) {
  if (event.key === "D") {
    heroesArray.forEach((item) => {
      item.damage = item.damage + (item.damage * 10) / 100;
    });
  }
});

heroesArray.forEach((item) => {
  const hero = document.querySelector(`.${heroMap[item.id]}`);
  const heroName = document.getElementById(`${heroMap[item.id]}-name-txt`);
  const heroHP = getHeroDocHP(heroMap[item.id]);

  let currentHP = item.currentHP;

  heroName.textContent = item.name;
  heroHP.textContent = getTextHP(currentHP, item.maxHP);

  // clicking one of the hero
  hero.addEventListener("click", function () {
    alert(
      `${item.name} has done ${item.damage} damage to ${dragonObject.name}!`
    );

    // calculate the current hp of dragon
    dragonObject.currentHP = dragonObject.currentHP - item.damage;
    updateHealthbarBG("dragon", dragonObject.currentHP);
    dragonHP.textContent = getTextHP(
      dragonObject.currentHP,
      dragonObject.maxHP
    );

    // find alive hero according to the random id
    const randomId = getRandomHeroId();
    const findHero = heroesArray.find((el) => el.alive && el.id === randomId);

    if (findHero) {
      alert(`${dragonObject.name} has attacked ${findHero.name}!`);
      const currentHeroHP = getHeroDocHP(heroMap[findHero.id]);

      findHero.currentHP = findHero.currentHP - dragonObject.damage;
      updateHealthbarBG(findHero.id, findHero.currentHP);
      currentHeroHP.textContent = getTextHP(findHero.currentHP, findHero.maxHP);

      if (findHero.currentHP <= 0) {
        findHero.alive = false;
        currentHeroHP.parentElement.parentElement.remove();
      }
    }

    // if the dragon current HP is less than or equals zero - show game result won
    if (dragonObject.currentHP <= 0) {
      showGameResult("Congratulations, you have won the game!", "#00AE48");
      dragonName.parentElement.parentElement.parentElement.remove();
    }

    // if their is no hero alive - show game result lost
    const aliveHero = heroesArray.some((item) => item.alive);
    if (!aliveHero && dragonObject.currentHP > 0) {
      showGameResult(
        `The game is lost! ${dragonObject.name} has won!`,
        "#ff0000"
      );
    }
  });
});
