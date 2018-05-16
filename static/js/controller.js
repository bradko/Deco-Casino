function postCard(card) {
	document.getElementById('cardValue').innerHTML = card

	document.getElementById('cardImg').src = "static/images/200px-Playing_card_" + card.suit.toLowerCase() + "_" + card.val.toString().slice(0,1) + ".svg.png"
}

function predictHigh(card) {
	nextCard = deck.drawCard()
	let currVal
	let nextVal
	if (card.val == 'Ace') {
		currVal = card.valNum[2]
	}
	else {
		currVal = card.valNum
	}
	if (nextCard.val == 'Ace') {
		nextVal = nextCard.valNum[2]
	}
	else {
		nextVal = nextCard.valNum
	}

	if (nextVal > currVal) {
		document.getElementById('results').innerHTML = "CORRECT!"
		streak = parseInt(document.getElementById('streak').innerHTML)
		numCorrect = parseInt(document.getElementById('numCorrect').innerHTML)
		bestStreak = parseInt(document.getElementById('bestStreak').value)
		streak += 1
		numCorrect += 1
		document.getElementById('currentStreak').value = streak
		document.getElementById('streak').innerHTML = streak
		document.getElementById('numCorrect').innerHTML = numCorrect
		console.log(streak)
		console.log(bestStreak)
		if (streak > bestStreak) {
			document.getElementById('bestStreak').value = streak
			document.getElementById('bestStreakDisplay').innerHTML = streak
		}
		if (numCorrect == 5) {
			document.getElementById('betWon').value = true
			document.getElementById('numCorrect').innerHTML = '0'
			document.getElementById('hiddenSubmit').click()
		}
	}
	else if (nextVal == currVal) {
		document.getElementById('results').innerHTML = "SAME: STREAK NOT LOST"
	}
	else {
		document.getElementById('results').innerHTML = 'INCORRECT'
		document.getElementById('streak').innerHTML = '0'
		document.getElementById('numCorrect').innerHTML = '0'
		document.getElementById('currentStreak').value = 0
		document.getElementById('betLost').value = true
		document.getElementById('hiddenSubmit').click()
	}

	postCard(nextCard)

	return nextCard
}

function predictLow(card) {
	nextCard = deck.drawCard()
	let currVal
	let nextVal
	if (card.val == 'Ace') {
		currVal = card.valNum[2]
	}
	else {
		currVal = card.valNum
	}
	if (nextCard.val == 'Ace') {
		nextVal = nextCard.valNum[2]
	}
	else {
		nextVal = nextCard.valNum
	}

	if (nextVal < currVal) {
		document.getElementById('results').innerHTML = "CORRECT!"
		streak = parseInt(document.getElementById('streak').innerHTML)
		numCorrect = parseInt(document.getElementById('numCorrect').innerHTML)
		bestStreak = parseInt(document.getElementById('bestStreak').value)
		streak += 1
		numCorrect += 1
		document.getElementById('streak').innerHTML = streak
		document.getElementById('numCorrect').innerHTML = numCorrect
		document.getElementById('currentStreak').value = streak
		if (streak > bestStreak) {
			document.getElementById('bestStreak').value = streak
			document.getElementById('bestStreakDisplay').innerHTML = streak
		}
		if (numCorrect == 5) {
			document.getElementById('betWon').value = true
			document.getElementById('numCorrect').innerHTML = '0'
			document.getElementById('hiddenSubmit').click()
		}
	}
	else if (nextVal == currVal) {
		document.getElementById('results').innerHTML = "SAME: STREAK NOT LOST"
	}
	else {
		document.getElementById('results').innerHTML = 'INCORRECT'
		document.getElementById('streak').innerHTML = '0'
		document.getElementById('numCorrect').innerHTML = '0'
		document.getElementById('currentStreak').value = 0
		document.getElementById('betLost').value = true
		document.getElementById('hiddenSubmit').click()
	}

	postCard(nextCard)

	return nextCard
}

function placeBet() {
	placeButton = document.getElementById('placeButton')
	placeButton.disabled = true
	
	bet = document.getElementById('bet')
	bet.disabled = true

	betAmount = document.getElementById('betAmount')
	betAmount.value = bet.value
	
	higher = document.getElementById('higher')
	lower = document.getElementById('lower')
	higher.style = "display: center"
	lower.style = "display: center"
}