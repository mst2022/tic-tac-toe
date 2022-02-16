const O_CLASS = 'o';
const X_CLASS = 'x';
const WIN_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let oTurn;

const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winMessage = document.getElementById('data-winning-message-text');

console.log(winMessage)


function startGame() {
    board.classList.remove(X_CLASS);
    board.classList.remove(O_CLASS);

    oTurn = false;
    setHoverClass();
    cellElements.forEach(cell => {
        cell.classList.remove(O_CLASS);
        cell.classList.remove(X_CLASS);
        cell.removeEventListener('click', handleClicked);
        cell.addEventListener("click", handleClicked, { once: true });
    })
    document.getElementById('winning-message').classList.add('hidden');

}

startGame();

document.getElementById('restart-button').addEventListener('click', startGame);


// const handleClicked = (e) => {
//     console.log("clicked");
// }
// const handleClicked = function (e) {
//     console.log("clicked")
// }


function handleClicked(e) {
    //place a marker
    const cell = e.target;
    const mark = oTurn ? O_CLASS : X_CLASS;

    placeMarker(cell, mark);

    //check for win
    if (chcekWin(mark)) {
        endGame(false);

    }
    else if (isDraw()) {//chcek for draw
        //chcek for draw
        endGame(true)
    }
    else {
        //change turns
        swapTurns();
        setHoverClass();
    }



}

function placeMarker(cell, mark) {
    cell.classList.add(mark);
}

function swapTurns() {
    oTurn = !oTurn;
}

function setHoverClass() {
    board.classList.remove(X_CLASS);
    board.classList.remove(O_CLASS);
    if (oTurn) {
        board.classList.add(O_CLASS);
    } else {
        board.classList.add(X_CLASS);
    }
}

function chcekWin(mark) {
    return WIN_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(mark);
        })
    })
}

function endGame(draw) {
    if (draw) {
        winMessage.innerText = "Its a DRAW!";
        document.getElementById('winning-message').classList.remove('hidden');
    } else {
        console.log("We have a winner");
        winMessage.innerText = `${!oTurn ? `X` : `O`}'s wins!`;
        document.getElementById('winning-message').classList.remove('hidden');
    }
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(O_CLASS) || cell.classList.contains(X_CLASS);
    })
}