let board = document.querySelector('.board');

function buildBoard() {
    if (board.innerHTML === '') {
        for (let i = 1; i <= 9; i++) {
            let block = document.createElement('div');
            block.classList.add('block');
            block.setAttribute('id', i);
            board.appendChild(block);
        }
    }
}

buildBoard();

let turn = 0;
let won = document.getElementById('winner');
let windiv = document.querySelector('.winner');
let blocks = board.querySelectorAll('.block');

function checkWin(par) {
    if ((blocks[0].innerText === par && blocks[1].innerText === par && blocks[2].innerText === par) ||
        (blocks[3].innerText === par && blocks[4].innerText === par && blocks[5].innerText === par) ||
        (blocks[6].innerText === par && blocks[7].innerText === par && blocks[8].innerText === par) ||
        (blocks[0].innerText === par && blocks[3].innerText === par && blocks[6].innerText === par) ||
        (blocks[1].innerText === par && blocks[4].innerText === par && blocks[7].innerText === par) ||
        (blocks[2].innerText === par && blocks[5].innerText === par && blocks[8].innerText === par) ||
        (blocks[0].innerText === par && blocks[4].innerText === par && blocks[8].innerText === par) ||
        (blocks[2].innerText === par && blocks[4].innerText === par && blocks[6].innerText === par)) {
        return true;
    }
    return false;
}

function checkDraw() {
    for (let i = 0; i < blocks.length; i++) {
        if (blocks[i].innerText === '') {
            return false; // There's an empty block, game can continue
        }
    }
    return true; // All blocks are filled, it's a draw
}

function addListener() {
    blocks = board.querySelectorAll('.block');
    blocks.forEach((ele) => {
        ele.addEventListener('click', () => {
            if (turn === 0 && ele.innerHTML === "") {
                ele.innerHTML = `<h2 class="fadeIn">O</h2>`;
                if (checkWin('O')) {
                    board.innerHTML = '';
                    windiv.style.display = "flex";
                    won.innerText = "O Wins!";
                } else if (checkDraw()) {
                    board.innerHTML = '';
                    windiv.style.display = "flex";
                    won.innerText = "It's a draw!";
                }
                turn = 1;
            }
            if (turn === 1 && ele.innerHTML === "") {
                ele.innerHTML = `<h2 class="fadeIn">X</h2>`;
                if (checkWin('X')) {
                    board.innerHTML = '';
                    windiv.style.display = "flex";
                    won.innerText = "X Wins!";
                } else if (checkDraw()) {
                    board.innerHTML = '';
                    windiv.style.display = "flex";
                    won.innerText = "It's a draw!";
                }
                turn = 0;
            }
        });
    });
}

addListener();

document.getElementById('play').addEventListener('click', () => {
    board.innerHTML = '';
    won.innerText = '';
    windiv.style.display = "none";
    buildBoard();
    addListener();
});
