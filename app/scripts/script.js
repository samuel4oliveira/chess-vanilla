let boardWidth = '';
let board = document.getElementById('board');

resizeBoard()
window.addEventListener("resize", function () {
    resizeBoard()
});

function resizeBoard() {
    boardWidth = board.offsetWidth;
    board.style.height = `${boardWidth}px`;
}