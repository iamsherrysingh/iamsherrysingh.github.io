/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

function init() {
	score = [0, 0];
	roundScore = 0;
	activePlayer = 0;
	gamePlaying = true;

	new Audio('start.mp3').play();

	document.querySelector('.dice').style.display = 'none';

	document.querySelector('#current-' + activePlayer).textContent = 0;
	document.querySelector('.info').textContent = 'PLAYER 1 turn';

	document.querySelector('#name-0').textContent = 'Player 1';
	document.querySelector('#name-1').textContent = 'Player 2';

	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
}

var score, roundScore, activePlayer, dice, gamePlaying, info;

init();

function rollDice() {
	if (gamePlaying) {
		//1. Random Number
		var dice = Math.floor(Math.random() * 6) + 1;

		//2. Display the result
		new Audio('dice.mp3').play();
		var diceDOM = document.querySelector('.dice');
		diceDOM.style.display = 'block';
		diceDOM.src = 'dice-' + dice + '.png';

		//3. update the round score
		if (dice !== 1) {
			roundScore += dice;
			document.querySelector(
				'#current-' + activePlayer
			).textContent = roundScore;
			info = document.querySelector('.info').textContent;
			if (info === 'You have to roll dice before you can hold') {
				var activePlayerRealNumber = activePlayer + 1;
				document.querySelector('.info').textContent =
					'PLAYER ' + activePlayerRealNumber + ' turn';
			}
		} else {
			nextPlayer();
		}
	}
}

document.querySelector('.btn-roll').addEventListener('click', rollDice);

document.addEventListener('keypress', function (event) {
	if (event.keyCode === 82 || event.which === 82) {
		rollDice();
	}
});

function holdScore() {
	if (gamePlaying && roundScore === 0) {
		document.querySelector('.info').textContent =
			'You have to roll dice before you can hold';
	}

	if (gamePlaying && roundScore !== 0) {
		score[activePlayer] += roundScore;
		roundScore = 0;
		document.getElementById('score-' + activePlayer).textContent =
			score[activePlayer];

		if (score[activePlayer] >= 100) {
			document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
			var activePlayerRealNumber = activePlayer + 1;
			document.querySelector('.info').textContent =
				'PLAYER ' + activePlayerRealNumber + ' Wins!';
			document.querySelector('.dice').style.display = 'none';
			new Audio('winner.mp3').play();
			gamePlaying = false;
		} else {
			new Audio('hold.mp3').play();
			nextPlayer();
		}
	}
}

document.querySelector('.btn-hold').addEventListener('click', holdScore);

document.addEventListener('keypress', function (event) {
	if (event.keyCode === 72 || event.which === 72) {
		holdScore();
	}
});

function nextPlayer() {
	roundScore = 0;
	document.querySelector('#current-' + activePlayer).textContent = 0;
	activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
	var activePlayerRealNumber = activePlayer + 1;
	document.querySelector('.info').textContent =
		'PLAYER ' + activePlayerRealNumber + ' turn';

	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');

	document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

document.addEventListener('keypress', function (event) {
	if (event.keyCode === 78 || event.which === 78) {
		init();
	}
});
