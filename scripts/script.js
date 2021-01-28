const pieces = document.querySelectorAll('.piece');
const squares = document.querySelectorAll('.square');

const movement = {
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
            movement.piece = piece;
            if (capture.piece1 === null) {
                capture.piece1 = piece;
            } else if (piece !== capture.piece1) {
                capture.piece2 = piece;
            }
        });
    }
}

function cleanNextMove() {
    movement.piece = null;
    movement.square = null;

    capture.piece1 = null;
    capture.piece2 = null;

    addLogic();
}

function promotion(piece) {
    const isWhitePawn = piece.classList.contains('white-pawn');
    const inRow8 = piece.parentElement.id.includes('8');
    if (isWhitePawn && inRow8) {
        piece.classList.remove('white-pawn');
        piece.classList.add('white-queen');
        return;
    }

    const isBlackPawn = piece.classList.contains('black-pawn');
    const inRow1 = piece.parentElement.id.includes('1');
    if (isBlackPawn && inRow1) {
        piece.classList.remove('black-pawn');
        piece.classList.add('black-queen');
        return;
    }
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
    } else if (movement.piece) {
        movement.square = square;
        movement.square.append(movement.piece);
    } else {
        return
    }

    promotion(capture.piece1);
    cleanNextMove();
}