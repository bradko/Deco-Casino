function postCard(card) {
	document.getElementById('cardValue').innerHTML = card

	document.getElementById('cardImg').src = "static/images/200px-Playing_card_" + card.suit.toLowerCase() + "_" + card.val.toString().slice(0,1) + ".svg.png"
	document.getElementById('cardImg').alt = card.val.toString().slice(0,1) + " of " + card.suit.toLowerCase() + "s"
}

function dealBjDealer(deck, dealerHand) {
	let card1 = deck.drawCard()

	document.getElementById('cardImgD1').src = "static/images/card_back.png"
	document.getElementById('cardImgD1').alt = "unknown dealer first card"

	let card2 = deck.drawCard()

	document.getElementById('cardImgD2').src = "static/images/200px-Playing_card_" + card2.suit.toLowerCase() + "_" + card2.val.toString().slice(0,1) + ".svg.png"
	document.getElementById('cardImgD2').alt = card2.val.toString().slice(0,1) + " of " + card2.suit.toLowerCase() + "s"

	dealerHand.push(card1)
	dealerHand.push(card2)

	return deck, dealerHand
}

function dealBjPlayer(deck, playerHand) {
	let card3 = deck.drawCard()

	document.getElementById('cardImgP1').src = "static/images/200px-Playing_card_" + card3.suit.toLowerCase() + "_" + card3.val.toString().slice(0,1) + ".svg.png"
	document.getElementById('cardImgP1').alt = card3.val.toString().slice(0,1) + " of " + card3.suit.toLowerCase() + "s"

	let card4 = deck.drawCard()

	document.getElementById('cardImgP2').src = "static/images/200px-Playing_card_" + card4.suit.toLowerCase() + "_" + card4.val.toString().slice(0,1) + ".svg.png"
	document.getElementById('cardImgP2').alt = card4.val.toString().slice(0,1) + " of " + card4.suit.toLowerCase() + "s"

	playerHand.push(card3)
	playerHand.push(card4)

	return deck, playerHand
}

function revealDealerCard(card) {
	document.getElementById('cardImgD1').src = "static/images/200px-Playing_card_" + card.suit.toLowerCase() + "_" + card.val.toString().slice(0,1) + ".svg.png"
	document.getElementById('cardImgD1').alt = card.val.toString().slice(0,1) + " of " + card.suit.toLowerCase() + "s"
}

function predictHigh(card) {
	nextCard = deck.drawCard()
	let currVal
	let nextVal
	let special = ['Jack', 'Queen', 'King']
	if (card.val == 'Ace') {
		currVal = card.valNum[2]
	}
	else if (special.indexOf(card.val) != -1) {
		currVal = card.valNum[1]
	}
	else {
		currVal = card.valNum
	}
	if (nextCard.val == 'Ace') {
		nextVal = nextCard.valNum[2]
	}
	else if (special.indexOf(nextCard.val) != -1) {
		nextVal = nextCard.valNum[1]
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
	let special = ['Jack', 'Queen', 'King']
	if (card.val == 'Ace') {
		currVal = card.valNum[2]
	}
	else if (special.indexOf(card.val) != -1) {
		currVal = card.valNum[1]
	}
	else {
		currVal = card.valNum
	}
	if (nextCard.val == 'Ace') {
		nextVal = nextCard.valNum[2]
	}
	else if (special.indexOf(nextCard.val) != -1) {
		nextVal = nextCard.valNum[1]
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
	bet = document.getElementById('bet')
	
	flash = document.getElementsByClassName('flashes')

	flash.style = "display: none"
	placeButton.disabled = true
	bet.disabled = true

	betAmount = document.getElementById('betAmount')
	betAmount.value = bet.value
	
	higher = document.getElementById('higher')
	lower = document.getElementById('lower')
	higher.style = "display: center"
	lower.style = "display: center"

}

function placeBetBj() {
	placeButton = document.getElementById('placeButton')
	bet = document.getElementById('bet')
	flash = document.getElementsByClassName('flashes')

	flash.style = "display: none"
	placeButton.disabled = true
	bet.disabled = true

	betAmount = document.getElementById('betAmount')
	betAmount.value = bet.value
	
	hit = document.getElementById('hit')
	stay = document.getElementById('stay')
	hit.style = "display: center"
	stay.style = "display: center"

}

function checkBet(object) {
	value = parseInt(object.value)
	max = parseInt(object.max)
	min = parseInt(object.min)

	if (value > max) {
		object.value = max
	}

	if (value < min) {
		object.value = min
	}
}

function hitPlayer(deck, playerHand, cardNum) {
	console.log(cardNum)
	let card = deck.drawCard()

	let cardContainer = document.createElement('div')
	cardContainer.id = "cardP" + cardNum
	cardContainer.className = "columnPlayer"

	let img = document.createElement('img')
	img.id = 'cardImgP' + cardNum
	img.src = "static/images/200px-Playing_card_" + card.suit.toLowerCase() + "_" + card.val.toString().slice(0,1) + ".svg.png"

	cardContainer.appendChild(img)

	document.getElementById('playerHand').appendChild(cardContainer)

	playerHand.push(card)

	return deck, playerHand
}

function hitDealer(deck, dealerHand, cardNum) {
	console.log(cardNum)
	let card = deck.drawCard()

	let cardContainer = document.createElement('div')
	cardContainer.id = "cardD" + cardNum
	cardContainer.className = "columnDealer"

	let img = document.createElement('img')
	img.id = 'cardImgD' + cardNum
	img.src = "static/images/200px-Playing_card_" + card.suit.toLowerCase() + "_" + card.val.toString().slice(0,1) + ".svg.png"

	cardContainer.appendChild(img)

	document.getElementById('dealerHand').appendChild(cardContainer)

	dealerHand.push(card)

	return deck, dealerHand
}

function calcHand(handList) {
	let special = ['Jack', 'Queen', 'King']
	let score = 0
	for (let i = 0; i < handList.length; i++) {
		let card = handList[i]
		if (card.val == 'Ace') {
			score += card.valNum[1]
		}
		else if (special.indexOf(card.val) != -1) {
			score += card.valNum[0]
		}
		else {
			score += card.valNum
		}
	}
	return score
}

function clearHands() {
	let num1 = getCount(document.getElementById('dealerHand'), false)
	let num2 = getCount(document.getElementById('playerHand'), false)
	console.log(num2)
	for (let i = 3; i < num1+1; i++) {
		console.log('cardD' +i)
		document.getElementById("cardD" + i).remove();
	}

	for (let i = 3; i < num2+1; i++) {
		console.log('cardP' +i)
		document.getElementById("cardP" + i).remove();
	}
}

function checkPlayerHand(playerHand) {
	let bust = false
	let ace = 0
	let score
	for (let i = 0; i < playerHand.length; i++) {
		if (playerHand[i].val == 'Ace') {
			ace += 1
		}
	}
	if (calcHand(playerHand) > 21 && ace == 0) {
		// PLAYER LOSE: BUST
		bust = true
	}
	else if (calcHand(playerHand) > 21 && ace != 0) {
		score = calcHand(playerHand) - (10 * ace)
		document.getElementById('playerScore').innerHTML = score
		if (score > 21) {
			// PLAYER LOSE: BUST
			bust = true
		}
	}

	return bust
}

function processDealerHand(dealerHand, playerHand) {
	let ace = 0
	let status = 'not processed'
	let dScore
	console.log('stuck')
	if (calcHand(dealerHand) > 21) {
		ace = 0
		for (let i = 0; i < dealerHand.length; i++) {
			if (dealerHand[i].val == 'Ace') {
				ace += 1
			}
		}
		dScore = calcHand(dealerHand) - (10 * ace)
		document.getElementById('dealerScore').innerHTML = dScore
		if (dScore > 21) {
			// PLAYER WIN
			status = 'win'
			console.log('2')
			return status
		}
		else if (dScore < 17) {
			status = 'again'
			console.log('8')
			return status
		}
		else if (dScore < calcHand(playerHand)) {
			// PLAYER WIN
			status = 'win'
			console.log('3', dScore, pScore)
			return status
		}
		else if (dScore > calcHand(playerHand)) {
			// PLAYER LOSE
			status = 'lose'
			console.log('6')
			return status
		}
	}
	else if (calcHand(dealerHand) < 17) {
		status = 'again'
		console.log('9')
		return status
	}
	else {
		let dScore = calcHand(dealerHand)
		let pScore = calcHand(playerHand)
		if (dScore < pScore) {
			// PLAYER WIN
			status = 'win'
			console.log('3', dScore, pScore)
			return status
		}
		else if (dScore > pScore) {
			// PLAYER LOSE
			status = 'lose'
			console.log('6')
			return status
		}
		else if (dScore == pScore) {
			// TIE
			status = 'tie'
			console.log('4')
			return status
		}

		return status
	}
	return status
}

function bjWin() {
	betWon = document.getElementById("betWon")
	betWon.value = true

	streak = parseInt(document.getElementById('streak').innerHTML)
	currentStreak = document.getElementById('currentStreak').value
	bestStreak = document.getElementById('bestStreak').value
	bestStreakDisplay = document.getElementById('bestStreakDisplay').innerHTML

	streak += 1
	document.getElementById('streak').innerHTML = streak

	currentStreak += 1

	if (bestStreak < streak) {
		document.getElementById('bestStreak').value = streak
		document.getElementById('bestStreakDisplay').innerHTML = streak
	}

	document.getElementById('hiddenSubmit').click()
}

function bjLose() {
	betLost = document.getElementById("betLost")
	betLost.value = true

	streak = parseInt(document.getElementById('streak').innerHTML)
	currentStreak = document.getElementById('currentStreak').value

	streak = 0
	currentStreak = 0
	document.getElementById('streak').innerHTML = streak

	document.getElementById('hiddenSubmit').click()
}

function bjTie() {
	tie = document.getElementById("tie")
	tie.value = true
	document.getElementById('hiddenSubmit').click()
}