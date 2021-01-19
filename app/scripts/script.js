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

init();

function init() {
    addLogic();
    saveNextMove();
}

function addLogic() {
    for (const square of squares) {
        square.removeEventListener('click', logic);
        square.addEventListener('click', logic);
    }
}

function saveNextMove() {
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
}

function cleanNextMove() {
    moviment.piece = null;
    moviment.square = null;

    capture.piece1 = null;
    capture.piece2 = null;

    addLogic();
}

function logic() {
    const square = this;
    let isPiece = false;
    if (square.lastElementChild) {
        isPiece = square.lastElementChild.className.includes('piece');
    }

    if (isPiece) {
        if (capture.piece2) {
            square.removeChild(capture.piece2);
            square.append(capture.piece1);
        } else {
            return
        }
    } else if (moviment.piece) {
        moviment.square = square;
        moviment.square.append(moviment.piece);

    } else {
        return
    }

    cleanNextMove();
}