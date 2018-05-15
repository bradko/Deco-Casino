from random import shuffle

class Deck:
	def __init__(self, cardList):
		self._cardList = cardList
		self._deck = []

		for Card in cardList:
			self._deck.append(Card)


	def resetDeck(self):
		self._deck = []
		for Card in self._cardList:
			self._deck.append(Card)

	def shuffle(self):
		shuffle(self._deck)

	def drawCard(self):
		return self._deck.pop()

	def returnCard(self, Card):
		self._deck.push(Card)


class Card:
	def __init__(self, suit, val):
		self._suit = suit
		self._val = val

	@property
	def suit(self):
		return self._suit

	@property
	def val(self):
		special = ['Jack','Queen','King','Ace']

		if (special.indexOf(self._val) != -1):
			return self._val

		else:
			if (self._val == 'Jack'):
				return 11
			elif (self._val == 'Queen'):
				return 12
			elif (self._val == 'King'):
				return 13
			else:
				return [1,14]

	@suit.setter
	def suit(self, newSuit):
		self._suit = newSuit

	@val.setter
	def val(self, newVal):
		self._val = newVal

	def __str__(self):
		return self._val + " of " + self._suit