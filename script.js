
const MAXCELL = 25;
const MINCELL = 0;

// Crea el tablero inicial mediante un número de jugadas aleatorias segun el nivel

function initialBoard() {
    for (i=1; i<=gameLevel; i++) {
        let randomCell = Math.floor(Math.random() * (MAXCELL - MINCELL) + MINCELL);
        selectTypeCellAndChangeCellState(randomCell);
        cells = document.querySelectorAll(".cell");
    }
}

// Determina el tipo de celda (esquina, lateral, central) y cambia el estado de las celdas afectadas

function selectTypeCellAndChangeCellState(randomCell) {

        if (randomCell==0) {
            leftTopCorner(randomCell);
        } else if (randomCell==4) {
            rightTopCorner(randomCell);
        } else if (randomCell==20) {
            leftBottomCorner(randomCell);
        } else if (randomCell==24) {
            rightBottomCorner(randomCell);
        } else if (randomCell>0 && randomCell<4) {
            topCentralFile(randomCell);
        } else if (randomCell>20 && randomCell<24) {
            bottomCentralFile(randomCell);
        } else if (randomCell%5==0) {
            leftCentralFile(randomCell);
        } else if ((randomCell+1)%5==0) {
            rightCentralFile(randomCell);
        } else {
            centralCell(randomCell);
        }
}

// Grupo de funciones que marcan las celdas afectadas segun el tipo de celda principal

function leftTopCorner (index) {
    changeCellState(cells[index]);
    changeCellState(cells[index+1]);
    changeCellState(cells[index+5]);
}

function rightTopCorner(index) {
    changeCellState(cells[index]);
    changeCellState(cells[index-1]);
    changeCellState(cells[index+5]);
}

function leftBottomCorner(index) {
    changeCellState(cells[index]);
    changeCellState(cells[index+1]);
    changeCellState(cells[index-5]);
}

function rightBottomCorner(index) {
    changeCellState(cells[index]);
    changeCellState(cells[index-1]);
    changeCellState(cells[index-5]);
}

function topCentralFile(index) {
    changeCellState(cells[index]);
    changeCellState(cells[index-1]);
    changeCellState(cells[index+1]);
    changeCellState(cells[index+5]);
}

function bottomCentralFile(index) {
    changeCellState(cells[index]);
    changeCellState(cells[index-1]);
    changeCellState(cells[index+1]);
    changeCellState(cells[index-5]);
}

function leftCentralFile(index) {
    changeCellState(cells[index]);
    changeCellState(cells[index-5]);
    changeCellState(cells[index+5]);
    changeCellState(cells[index+1]);
}

function rightCentralFile(index) {
    changeCellState(cells[index]);
    changeCellState(cells[index-5]);
    changeCellState(cells[index+5]);
    changeCellState(cells[index-1]);
}

function centralCell(index) {
    changeCellState(cells[index]);
    changeCellState(cells[index-5]);
    changeCellState(cells[index+5]);
    changeCellState(cells[index-1]);
    changeCellState(cells[index+1]);
}

// Cambia el color de la celda pasada como parametro

function changeCellState (cellElement) {
    const isCellOff = cellElement.classList.contains("bg-light-off")
    if (isCellOff) {
        cellElement.classList.replace("bg-light-off", "bg-light-on");
    } else {
        cellElement.classList.replace("bg-light-on", "bg-light-off");
    }
}

// Comprueba si todas las celdas estan apagadas (off)

function checkIsAllLightsOff(cells) {
    let isAllLightsOff = false;
    for (let i=0; i<cells.length; i++) {
        if (cells[i].classList.contains("bg-light-on")) {
            isAllLightsOff = false;
            break;
        } else {
            isAllLightsOff = true;
        }
    }
    return isAllLightsOff;
}

// Acciones si el jugador resuelve el nivel

function isWinner() {
    gameLevel++;
    newGame();

}

// Acciones cuando el jugador clickea una celda

function handleCellClick(index) {
    return function() {
        selectTypeCellAndChangeCellState(index);
        checkIsAllLightsOff(cells);
        if (checkIsAllLightsOff(cells)) isWinner();
    };
}

// Movimiento del jugador

function playerMove() {
    
    cells.forEach((node, index)=>{
        const handler = handleCellClick(index);
        node.addEventListener("click", handler);
        node.handler = handler;
        });
    };

// Procedimiento para empezar un nuevo nivel

function newGame() { 
    const textLevel = "Nivel: " + gameLevel;
    const level = document.querySelector("#levelGame");
    level.textContent = textLevel;
    cells.forEach((node) => {
        if (node.handler) {
            node.removeEventListener("click", node.handler);
            delete node.handler;
        }
    });
    
    initialBoard();
    playerMove();
}

let cells = document.querySelectorAll(".cell");
let gameLevel = 1;

newGame();

//TODO: Un boton para volver al estado inicial del nivel
//TODO: Un contador de movimientos