const player1 = document.getElementById("player1");
const player2 = document.getElementById("player2");
const boxes = document.querySelectorAll(".box");
const userChance = document.getElementById("userChance");
const gameContainer = document.getElementById("game_container");
const formContainer = document.getElementById("form_container");
const playGame = document.getElementById("play");
const resetContainer = document.getElementById("reset_container");
const winContainer = document.getElementById("win_container");
const winner = document.getElementById("winner");
let chance = false;

// At initial time game field should not appear
gameContainer.style.display = "none";
winContainer.style.height = "0";

const winPatterns = [
  [0, 1, 2], // Top row
  [3, 4, 5], // Middle row
  [6, 7, 8], // Bottom row
  [0, 3, 6], // Left column
  [1, 4, 7], // Middle column
  [2, 5, 8], // Right column
  [0, 4, 8], // Top-left to bottom-right diagonal
  [2, 4, 6], // Top-right to bottom-left diagonal
];

// Reset Game Logic ___________________________
function handleResetGame() {
  const resetGame = document.createElement("button");
  resetGame.innerText = "Reset game";
  resetContainer.append(resetGame);
  resetGame.classList.add(
    "bg-red-500",
    "text-white",
    "px-3",
    "py-2",
    "text-lg",
    "mt-5",
    "rounded-md",
    "active:bg-red-600"
  );

  resetGame.id = "resetGame";

  resetGame.addEventListener("click", () => {
    gameContainer.style.display = "none";
    formContainer.style.display = "block";
    // Enable boxes
    boxes.forEach((box) => {
        box.disabled = false
        box.innerText = ""
        box.style.background = "#fdba74"
        box.style.opacity = "1"
    });

    // Reset chance
    chance = false;

    // Reset inputs value
    player1.value = "";
    player2.value = "";

    userChance.innerText = "";

    resetContainer.innerHTML = "";

    winContainer.style.height = "0";

  });
}

// Form Logic_____________________________
function handleForm() {
  if (player1.value.length > 0 && player2.value.length > 0) {
    gameContainer.style.display = "grid";
    formContainer.style.display = "none";

    userChance.innerText = `${player1.value.toUpperCase()}, Your chance`;
  } else {
    alert("provide user name");
  }

  if (player1.value.length > 0 && player2.value.length > 0) {
    handleResetGame();
  }

  //   handleResetGame(resetGame);
}

playGame.addEventListener("click", handleForm);

// game box logic _______________________________

function showUserChance(chance) {
  if (chance)
    userChance.innerText = `${player2.value.toUpperCase()}, Your chance`;
  else userChance.innerText = `${player1.value.toUpperCase()}, Your chance`;
}

function matchPatterns() {
  let isWinner = false;
  winPatterns.forEach((pattern) => {
    const pattern1 = boxes[pattern[0]].innerText;
    const pattern2 = boxes[pattern[1]].innerText;
    const pattern3 = boxes[pattern[2]].innerText;

    if (pattern1 && pattern2 && pattern3) {
      if (pattern1 == pattern2 && pattern2 == pattern3) {
        if (pattern1 == "X") winner.innerText = player1.value;
        else winner.innerText = player2.value;

        winContainer.style.height = "auto";
        userChance.innerText = "";
        isWinner = true;

        const resetGame = document.getElementById("resetGame");
        resetGame.style.display = "inline-block";

        return;
      }
    }
  });

  if (isWinner) return true;

  return false;
}

function handleDisableBox(disableBox) {
  if (disableBox) {
    boxes.forEach((box) => {
      box.style.background = "#f97316";
      box.style.opacity = .5
      box.disabled = true;
    });
  }
}

let count = 0;

// Entry point of box logic __________________________
boxes.forEach((box) => {
  // box.innerText = count++
  box.addEventListener("click", () => {
    if (chance) {
      box.innerText = "O";
      chance = false;
    } else {
      box.innerText = "X";
      chance = true;
    }

    box.disabled = true;

    const resetGame = document.getElementById("resetGame");
    resetGame.style.display = "none";

    let disableBox = matchPatterns();

    handleDisableBox(disableBox);

    disableBox == false && showUserChance(chance);
  });
});
