let validSquares = [];
const pieces = document.querySelectorAll('.piece');
const squares = document.querySelectorAll('.square');

const moviment = {
    piece: null,
    square: null
};

const move = () => {
    moviment.square.append(moviment.piece);
    moviment.piece = null;
    moviment.square = null;
    updateSquares();
}

const squareMovement = function () {
    let isPieceSelected = moviment.piece !== null;
    if (isPieceSelected) {
        moviment.square = this;
        move()
    }
}

const updateSquares = () => {
    validSquares = [];
    for (const square of squares) {
        if (square.lastElementChild) {
            let isPiece = square.lastElementChild.className.includes('piece');
            if (!isPiece) {
                square.removeEventListener('click', squareMovement);
                validSquares.push(square);
                square.addEventListener('click', squareMovement);
            } else {
                square.removeEventListener('click', squareMovement);
            }
        } else {
            square.removeEventListener('click', squareMovement);
            validSquares.push(square);
            square.addEventListener('click', squareMovement);
        }
    }
}

updateSquares();
for (const piece of pieces) {
    piece.addEventListener('click', () => {
        moviment.piece = piece;
    });
}