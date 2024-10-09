// Get all necessary DOM elements
const boxes = document.querySelectorAll<HTMLButtonElement>(".box");
const resetBtn = document.querySelector<HTMLButtonElement>("#reset-btn");
const newGameBtn = document.querySelector<HTMLButtonElement>("#new-btn");
const msgContainer = document.querySelector<HTMLDivElement>(".msg-container");
const msg = document.querySelector<HTMLParagraphElement>("#msg");

let turnO: boolean = true; // PlayerX, PlayerO flag
let count: number = 0; // To track draw

// Winning patterns for Tic-Tac-Toe
const winPatterns: number[][] = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

// Function to reset the game
const resetGame = (): void => {
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer?.classList.add("hide");
};

// Add event listeners to boxes
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      // PlayerO
      box.innerText = "O";
      turnO = false;
    } else {
      // PlayerX
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true;
    count++;

    const isWinner = checkWinner();

    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});

// Function to show draw message
const gameDraw = (): void => {
  if (msg) msg.innerText = `Game was a Draw.`;
  msgContainer?.classList.remove("hide");
  disableBoxes();
};

// Disable all boxes
const disableBoxes = (): void => {
  boxes.forEach((box) => {
    box.disabled = true;
  });
};

// Enable all boxes
const enableBoxes = (): void => {
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerText = "";
  });
};

// Function to show the winner message
const showWinner = (winner: string): void => {
  if (msg) msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer?.classList.remove("hide");
  disableBoxes();
};

// Check if there's a winner
const checkWinner = (): boolean => {
  for (const pattern of winPatterns) {
    const pos1Val = boxes[pattern[0]].innerText;
    const pos2Val = boxes[pattern[1]].innerText;
    const pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        return true;
      }
    }
  }
  return false;
};

// Add event listeners to reset and new game buttons
newGameBtn?.addEventListener("click", resetGame);
resetBtn?.addEventListener("click", resetGame);
