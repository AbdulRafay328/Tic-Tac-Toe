// Get all necessary DOM elements
var boxes = document.querySelectorAll(".box");
var resetBtn = document.querySelector("#reset-btn");
var newGameBtn = document.querySelector("#new-btn");
var msgContainer = document.querySelector(".msg-container");
var msg = document.querySelector("#msg");
var turnO = true; // PlayerX, PlayerO flag
var count = 0; // To track draw
// Winning patterns for Tic-Tac-Toe
var winPatterns = [
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
var resetGame = function () {
    turnO = true;
    count = 0;
    enableBoxes();
    msgContainer === null || msgContainer === void 0 ? void 0 : msgContainer.classList.add("hide");
};
// Add event listeners to boxes
boxes.forEach(function (box) {
    box.addEventListener("click", function () {
        if (turnO) {
            // PlayerO
            box.innerText = "O";
            turnO = false;
        }
        else {
            // PlayerX
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        count++;
        var isWinner = checkWinner();
        if (count === 9 && !isWinner) {
            gameDraw();
        }
    });
});
// Function to show draw message
var gameDraw = function () {
    if (msg)
        msg.innerText = "Game was a Draw.";
    msgContainer === null || msgContainer === void 0 ? void 0 : msgContainer.classList.remove("hide");
    disableBoxes();
};
// Disable all boxes
var disableBoxes = function () {
    boxes.forEach(function (box) {
        box.disabled = true;
    });
};
// Enable all boxes
var enableBoxes = function () {
    boxes.forEach(function (box) {
        box.disabled = false;
        box.innerText = "";
    });
};
// Function to show the winner message
var showWinner = function (winner) {
    if (msg)
        msg.innerText = "Congratulations, Winner is ".concat(winner);
    msgContainer === null || msgContainer === void 0 ? void 0 : msgContainer.classList.remove("hide");
    disableBoxes();
};
// Check if there's a winner
var checkWinner = function () {
    for (var _i = 0, winPatterns_1 = winPatterns; _i < winPatterns_1.length; _i++) {
        var pattern = winPatterns_1[_i];
        var pos1Val = boxes[pattern[0]].innerText;
        var pos2Val = boxes[pattern[1]].innerText;
        var pos3Val = boxes[pattern[2]].innerText;
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
newGameBtn === null || newGameBtn === void 0 ? void 0 : newGameBtn.addEventListener("click", resetGame);
resetBtn === null || resetBtn === void 0 ? void 0 : resetBtn.addEventListener("click", resetGame);
