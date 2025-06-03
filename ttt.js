let boxes = document.querySelectorAll(".box");
let newgamebtn = document.querySelector(".newgamebtn");
let msgcontainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let gamecontainer=document.querySelector(".game-container")
let turn0 = true;
let count = 0;

let winPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

// adding click event to each boxes
boxes.forEach((box) => {
    box.addEventListener("click", () => {

        if (turn0) {
            box.innerText = "O"
            box.style.color = "#4ecdc4"
            turn0 = false;
        }
        else {
            box.innerText = "X"
            box.style.color = "#ff6b6b"
            turn0 = true;
        }
        // here you NEEDN'T write turn0===true
        box.disabled = true;
        count++;

        let isWinner = checkWinner();
        // draw condition
        if (count === 9 && !isWinner) {
            gameDraw();
        }
    })
})

checkWinner = () => {
    for (pattern of winPattern) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if (pos1val != "" && pos2val != "" && pos3val != "") {
            if (pos1val === pos2val && pos2val === pos3val) {
                showWinner(pos1val);
                hideGame();
                return true;
            }
        }
    }
}
const hideGame=()=>{
    gamecontainer.classList.add("hide");
}
const showWinner = (winner) => {
    if (winner === "X") {
        msg.innerHTML = `<span id="congrats_color">Congratulations!!</span> <br> Winner is <span id="tic">${winner}</span>`;
    } else {
        msg.innerHTML = `<span id="congrats_color">Congratulations!!</span> <br> Winner is <span id="toe">${winner}</span>`;
    }
    msgcontainer.classList.remove("hide");
    disablebox();
}

const gameDraw = () => {
    msg.innerText = "Oops! It is a draw!"
    msgcontainer.classList.remove("hide");
    disablebox();
}

const disablebox = () => {
    for (box of boxes) {
        box.disabled = true;
    }
}

const enableboxes = () => {
    for (box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}

const resetgame = () => {
    turn0 = true;
    count = 0
    enableboxes();
    msgcontainer.classList.add("hide")
    gamecontainer.classList.remove("hide")
}
newgamebtn.addEventListener("click", resetgame);

