const welcome = document.querySelector(".welcome");
const game_area = document.querySelector(".game-area");
const sprite = document.querySelector(".sprite");
const platform = document.querySelector(".platform");
const score = document.querySelector(".score");
const final_score = document.querySelector(".final-score-on-dead");
let scorenr = 0;
let dead = false;
let started = false;

function generateEnemy() {
  let enemy = document.createElement("div");
  enemy.className = "enemy";
  enemy.style.animation = `enemy ${Math.random() * 1.5 + 1}s linear`;

  game_area.appendChild(enemy);
  var moving = true;
  el = document.querySelector(".enemy");
  window.requestAnimationFrame(getPosition);
  function getPosition() {
    var rectenemy = el.getBoundingClientRect();
    var rectsprite = sprite.getBoundingClientRect();
    if (
      !(
        rectenemy.right < rectsprite.left ||
        rectenemy.left > rectsprite.right ||
        rectenemy.bottom < rectsprite.top ||
        rectenemy.top > rectsprite.bottom
      )
    ) {
      dead = true;
      sprite.style.animation = `dead 1s forwards`;
      platform.style.animation = "none";
      game_area.style.animation = "none";
      final_score.style.opacity = "1";

      if (scorenr >= 0) {
        final_score.querySelector("h2").innerHTML = `FINAL SCORE - ${scorenr}`;
        if (scorenr < 3) {
          final_score.querySelector(".final-comment p").innerHTML =
            "You suck XD";
        } else if (scorenr < 7) {
          final_score.querySelector(".final-comment p").innerHTML =
            "boi not bad";
        } else {
          final_score.querySelector(".final-comment p").innerHTML =
            "damn boi u good";
        }
      }
      score.style.opacity = "0";
      score.innerHTML = 0;
      scorenr = -1;
    }
    if (moving) {
      window.requestAnimationFrame(getPosition);
    }
  }

  enemy.addEventListener("animationend", () => {
    scorenr++;
    game_area.removeChild(enemy);
    score.innerHTML = scorenr;
  });
}

function jump() {
  sprite.style.animation = "jump 1s";
  sprite.addEventListener("animationend", () => {
    sprite.style.animation = `run 1s infinite `;
  });
}

window.addEventListener("keypress", (e) => {
  if (!started) {
    started = true;
    welcome.style.opacity = "0";
    setInterval(function () {
      if (!dead) {
        if (scorenr == -1) {
          scorenr = 0;
        }
        generateEnemy();
      } else {
        console.log("bruh u dead");
      }
    }, Math.floor(Math.random() * 1500 + 2500));
  }

  if (dead) {
    dead = false;
    sprite.style.animation = `run 1s infinite`;
    platform.style.animation = "animatebg 2s reverse linear infinite";
    game_area.style.animation = "animatebg 2.5s reverse linear infinite";
    final_score.style.opacity = "0";

    score.style.opacity = "1";
  }
  if (e.key == "w") {
    console.log("running");
    jump();
  }
});
window.addEventListener("touchstart", (e) => {
  if (!started) {
    started = true;
    welcome.style.opacity = "0";
    setInterval(function () {
      if (!dead) {
        if (scorenr == -1) {
          scorenr = 0;
        }
        generateEnemy();
      } else {
        console.log("bruh u dead");
      }
    }, Math.floor(Math.random() * 1500 + 2500));
  }

  if (dead) {
    dead = false;
    sprite.style.animation = `run 1s infinite`;
    platform.style.animation = "animatebg 2s reverse linear infinite";
    game_area.style.animation = "animatebg 2.5s reverse linear infinite";
    final_score.style.opacity = "0";

    score.style.opacity = "1";
  }
  jump();
});

//START THE GAME
