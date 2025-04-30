let boxes = document.querySelectorAll('.box');
let reseBtn = document.querySelector('#reset-btn');
let newGameBtn = document.querySelector('#new-btn');
let msgContainer = document.querySelector('.msg-container');
let msg = document.querySelector('#msg');

let turnO = true; // Start With player O.

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];


const resetGame = () => {
    turnO = true;

    enableBoxes();
    msgContainer.classList.add("hide");
    msg.innerText = "";
}


boxes.forEach( (box) => {
    box.addEventListener("click", () => {

        if (turnO) {
            // PlayerO
            box.innerText = "O";
            box.style.color = "#d8031c";
            turnO = false;
        }
        else {
            // PlayerX
            box.innerText = "X";
            box.style.color = "#01016f";
            turnO = true;
        }
        // if a player clicked at once the value store, and the player again checjed the same box ,tha timevalue will not change
        box.disabled = true;

        checkWinner();
    });
});


// Disable all boxes after game ends, we can't click again
const disableBoxes = () => {
    for (box of boxes){
        box.disabled = true;
    }
};


// Enable and clear all boxes for new game
const enableBoxes = () => {
    for (box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
};


const showWinner = (winner) => {
    msg.innerText = `Congratulation, Player  ${winner}  is Winner`;
    msgContainer.classList.remove('hide');

    disableBoxes();
};


const showdraw = () => {
    msg.innerText = `It's a Draw!`;
    msgContainer.classList.remove('hide');
};



// // Check for winner or draw after every move
const checkWinner = () => {

    let isWinnerFound = false;

    for (let pattern of winPatterns) {
        let positon1 = boxes[pattern[0]].innerText;
        let positon2 = boxes[pattern[1]].innerText;
        let positon3 = boxes[pattern[2]].innerText;

        if (positon1 != "" && positon2 != "" && positon3 != ""){
            if (positon1 === positon2 && positon2 === positon3){
                isWinnerFound = true;

                showWinner(positon1);

                return;
            }
        }


         // If no winner, check for draw
         let boxesCheck = true;
         boxes.forEach( (box) => {
            if (box.innerText === ""){
                boxesCheck = false;
            }
        });

        if (!isWinnerFound && boxesCheck){
            showdraw();
        }
            }
        };


newGameBtn.addEventListener('click', resetGame);
reseBtn.addEventListener('click', resetGame);