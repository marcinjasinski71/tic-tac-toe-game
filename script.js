// przechowujemy status gry
const statusDisplay = document.querySelector(`.game--status`);

// gameactive - do pauzowania gry w momencie wygrania przez jednego z zawodników
let gameActive = true;
// przechowujemy aktualnego gracza - X O
let currentPlayer = 'X';

// gamestate bedzie przechowywał aktualny stan gry -> 9 pustych elementów w tablicy (3x3 pola)
let gameState = ['', '', '', '', '', '', '', '', ''];

// win
const winningMessage = () => {
	`Gracz ${currentPlayer} wygrał grę !`;
};
// remis
const drawMessage = () => {
	`Gra zakończona remisem.`;
};
// który gracz
const currentPlayerTurn = () => {
	`Kolej gracza ${currentPlayer}`;
};

// statusdisplay pod naszym .game--status bedzie wyswietlał zmienną currentPlayerTurn
statusDisplay.innerHTML = currentPlayerTurn();

//
function handleCellPlayed() {}

// fn - zmiana gracza
function handlePlayerChange() {}

// fn - sprawdzanie rezultatu
function handleResultValidation() {}

// fn - klikniecie komorki => listener na wszystkie nasze komórki wywołujący tą funkcję \/
function handleCellClick() {}

// fn - restart gry
function handleRestartGame() {}






//
//
//
// LISTENERY==========================================================================================
// dla kazdej klasy .cell nakladamy nasluchiwanie na klik wywołujące funkcje handleCellClick
document
	.querySelectorAll(`.cell`)
	.forEach(cell => addEventListener(`click`, handleCellClick));
// dla naszego .game--restart (button) nadajemy listenera wywołującego na klik funkcję handleRestartGame
document
	.querySelector(`.game--restart`)
	.addEventListener(`click`, handleRestartGame);
