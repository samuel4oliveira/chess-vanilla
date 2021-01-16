const pieces = document.querySelectorAll('.piece');
const squares = document.querySelectorAll('.square');

const moviment = {
    piece: null,
    square: null
};

const capture = {
    piece1: null,
    piece2: null
};

const move = () => {
    moviment.square.append(moviment.piece);

    moviment.piece = null;
    moviment.square = null;

    capture.piece1 = null;
    capture.piece2 = null;

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
    for (const square of squares) {
        if (square.lastElementChild) {
            let isPiece = square.lastElementChild.className.includes('piece');
            if (!isPiece) {
                square.removeEventListener('click', squareMovement);
                square.addEventListener('click', squareMovement);
            } else {
                square.removeEventListener('click', teste);
                square.removeEventListener('click', squareMovement);
                square.addEventListener('click', teste);
            }
        } else {
            square.removeEventListener('click', squareMovement);
            square.addEventListener('click', squareMovement);
        }
    }
}

updateSquares();
for (const piece of pieces) {
    piece.addEventListener('click', () => {
        moviment.piece = piece;
        if (capture.piece1 === null) {
            capture.piece1 = piece;
        } else if (piece !== capture.piece1) {
            capture.piece2 = piece;
        }
    });
}

function teste() {
    const square = this;
    if (capture.piece1 !== null && capture.piece2 !== null) {
        square.removeChild(capture.piece2);
        square.append(capture.piece1);

        moviment.piece = null;
        moviment.square = null;

        capture.piece1 = null;
        capture.piece2 = null;

        updateSquares();
    }
}