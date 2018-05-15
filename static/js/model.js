"use strict"

class Subject {
	constructor() {
		this.handlers = []
	}

	subscribe(fn) {
		this.handlers.push(fn)
	}

	unsubscribe(fn) {
		this.handlers = this.handlers.filter(
			function(item) {
				if (item !== fn) {
					return item;
				}
			}
		);
	}

	publish(msg, someobj) {
		var scope = someobj || window;
		for (let fn of this.handlers) {
			fn(scope, msg)
		}
	}

}

class Deck {
	constructor(cardList) {
		this._cardList = cardList
		this._deck = []

		for (let Card of cardList) {
			this._deck.push(Card)
		}

		this.resetDeck()
	}

	resetDeck() {
		this._deck =[]
		for (let Card of this._cardList) {
			this._deck.push(Card)
		}
	}

	shuffle() {
	    for (let i = this._deck.length - 1; i > 0; i--) {
	        let randIndex = Math.floor(Math.random() * (i + 1));
	        let temp = this._deck[i];
	        this._deck[i] = this._deck[randIndex];
	        this._deck[randIndex] = temp;
	    }
	}

	drawCard() {
		return this._deck.pop()
	}

	returnCard(Card) {
		this._deck.push(Card)
	}

}

class Card {
	constructor(suit, val) {
		this._suit = suit
		this._val = val
	}

	toString() {
		return this._val + " of " + this._suit
	}

	get suit() {
		return this._suit
	}

	get val() {
		let special = ['J', 'Q', 'K', 'A']

		if (special.indexOf(this._val) == -1) {
			return this._val
		}
		else {
			if (this._val == 'J') {
				return 'Jack'
			}
			else if (this._val == 'Q') {
				return 'Queen'
			}
			else if (this._val == 'K') {
				return 'King'
			}
			else {
				return 'Ace'
			}
		}

	}

	get valNum() {
		let special = ['J', 'Q', 'K', 'A']

		if (special.indexOf(this._val) == -1) {
			return this._val
		}
		else {
			if (this._val == 'J') {
				return 11
			}
			else if (this._val == 'Q') {
				return 12
			}
			else if (this._val == 'K') {
				return 13
			}
			else {
				return [1,11,14]
			}
		}

	}

	set suit(newSuit) {
		this._suit = newSuit
	}

	set val(newVal) {
		this._val = newVal
	}

}
