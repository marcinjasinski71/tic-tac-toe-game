// przechowujemy status gry
const statusDisplay = document.querySelector('.game--status');
const darkBtn = document.querySelector(`.colorDark`);
const lightBtn = document.querySelector(`.colorLight`);
let root = document.documentElement;

// gameactive - do pauzowania gry w momencie wygrania przez jednego z zawodników
let gameActive = true;
// przechowujemy aktualnego gracza - X O
let currentPlayer = 'X';

// gamestate bedzie przechowywał aktualny stan gry -> 9 pustych elementów w tablicy (3x3 pola)
let gameState = ['', '', '', '', '', '', '', '', ''];

// win
const winningMessage = () => `Player ${currentPlayer} has won !`;
// remis
const drawMessage = () => `Game ended in a draw.`;
// który gracz
const currentPlayerTurn = () => `Player ${currentPlayer} turn.`;
// statusdisplay pod naszym .game--status bedzie wyswietlał zmienną currentPlayerTurn
statusDisplay.innerHTML = currentPlayerTurn();

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

//handler kliknietej cellki przyjmujacy dwie wartosci -> clickedCell i clickedCellIndex
function handleCellPlayed(clickedCell, clickedCellIndex) {
	gameState[clickedCellIndex] = currentPlayer;
	clickedCell.innerHTML = currentPlayer;
}

// fn - zmiana gracza
function handlePlayerChange() {
	currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
	statusDisplay.innerHTML = currentPlayerTurn();
}

// fn - sprawdzanie rezultatu

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
	// remis -> jeżeli gameState (nasze pola)nie posiadają pustych komórek i nie osiagnelismy roundWon -> nastepuje odpalenie fukcji roundDraw + wyswietlenie w statusDisplay zmiennej drawMessage() => koniec gry
	let roundDraw = !gameState.includes('');
	if (roundDraw) {
		statusDisplay.innerHTML = drawMessage();
		gameActive = false;
		return;
	}
	handlePlayerChange();
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
function handleRestartGame() {
	gameActive = true;
	currentPlayer = 'X';
	gameState = ['', '', '', '', '', '', '', '', ''];
	statusDisplay.innerHTML = currentPlayerTurn();
	document.querySelectorAll(`.cell`).forEach(cell => (cell.innerHTML = ''));
}

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
// color

lightBtn.addEventListener(`click`, () => {
	root.style.setProperty('--first-color', '#141414ea');
	root.style.setProperty('--second-color', '#d1d0d0');
});

darkBtn.addEventListener(`click`, () => {
	root.style.setProperty(
		'--firshttps://marcinjasinski71.github.io/tic-tac-toe-game/t-color',
		'#d1d0d0'
	);
	root.style.setProperty('--second-color', '#141414ea');
});
