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

//handler kliknietej cellki przyjmujacy dwie wartosci -> clickedCell i clickedCellIndex
function handleCellPlayed(clickedCell, clickedCellIndex) {
	gameState[clickedCellIndex] = currentPlayer;
	clickedCell.innerHTML = currentPlayer;
}

// fn - zmiana gracza
function handlePlayerChange() {}

// fn - sprawdzanie rezultatu

// wartosci w tablicy winningConditions to indeksy dla komorek ktore musza byc zaznaczone przez TEGO SAMEGO gracza żeby był uznany jako zwycięzca
const winningConditions = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
];
// sprawdzamy wynik
function handleResultValidation() {
	let roundWon = false;
	// i <= 7 ponieważ mamy indeksy naszych tablic od 0-7 więc iterujemy po kazdej naszej tablicy sprawdzając poprawnosc wyniku
	for (let i = 0; i <= 7; i++) {
		const winCondition = winningConditions[i];
		let a = gameState[winCondition[0]];
		let b = gameState[winCondition[1]];
		let c = gameState[winCondition[2]];

		if (a === '' || b === '' || c === '') {
			continue;
		}
		if (a === b && b === c) {
			roundWon = true;
			break;
		}
	}
	// jeżeli są spełnione warunki zwycięstwa dla jednego z graczy gameActive przyjmie wartosc false, innerHTML wyświetli winningMessage, funkcja zostanie zwrocona
	if (roundWon) {
		statusDisplay.innerHTML = winningMessage();
		gameActive = false;
		return;
	}
}

// fn - klikniecie komorki => listener na wszystkie nasze komórki wywołujący tą funkcję \/
function handleCellClick(clickedCellEvent) {
	// kliknieta cellka
	const clickedCell = clickedCellEvent.target;
	// index celki => musimy zamienić stringa z data-cell-index na number => parseInt (bez tego bysmy otrzymywali numery ale w stringu)

	const clickedCellIndex = parseInt(
		clickedCell.getAttribute(`data-cell-index`)
	);

	// sprawdzamy czy ktoras komorka została już kliknięta lub czy gra nie jest zapauzowana => jeżeli tak to ignorujemy kliknięcie.
	// => jeżeli - dana kliknięta komórka NIE JEST pusta lub gra nie jest aktywna to zwraca nam spowrotem funkcję

	if (gameState[clickedCellIndex] !== '' || !gameActive) {
		return;
	}
	// jezeli nasz if nie jest spełniony możemy kontynuować grę i wywołujemy funkcję handleResultValidation
	handleCellPlayed(clickedCell, clickedCellIndex);
	handleResultValidation();
}

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
