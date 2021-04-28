//  TODO: If dealer gets 21 on draw, card doesn't flip
//  TODO: Dealer drew 5 cards before getting over 16, no results displayed

/*===================================================================================================
          CLASSES
===================================================================================================*/

//*  CARD CLASS ---------------------------------------------------------------------------

class Card {
    constructor(value, suit, points) {
        this.value = value;
        this.suit = suit;
        this.points = points;
    }
  }   
  
//*  DECK CLASS ---------------------------------------------------------------------------

class Deck {
  constructor(){
      this.cards = [];
      this.createDeck();
      this.shuffle();
  }
  createDeck() {
    const values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
      // Hearts, Diamonds, Spades and Clubs (respectively) in HTML code
    const suits = ["&#9829;", "&#9830;", "&#9824;", "&#9827;"];
    for (let i = 0; i < values.length; i++) {
      for (let j = 0; j < suits.length; j++) {
        Card.value = values[i];
        Card.suit = suits[j];
        let num;
        if (i < 9) {
          num = i + 2;
        } else if (i < 12) {
          num = 10;
        } else {
          num = 11;
        }
        this.cards.push(new Card(values[i], suits[j], num));
      }
    }
  }
  /*-------------------------
    FISHER-YEATS SHUFFLE
    Better than Math.random()
    Code credit to Anh-Thu Huynh for this version
    Article here:https://medium.com/@oldwestaction/randomness-is-hard-e085decbcbb2
    Comments within code are mine for understanding the method
  --------------------------*/
  shuffle() {
      const { cards } = this;
      for (let i = cards.length - 1; i > 0; i--) {
          const swapIndex = Math.floor(Math.random() * (i + 1)); 
          const currentCard = this.cards[i];
          const cardToSwap = this.cards[swapIndex];
          this.cards[i] = cardToSwap;
          this.cards[swapIndex] = currentCard;
      };
      return this;
  }
}

//*  PLAYER CLASS ---------------------------------------------------------------------------

class Player {
  constructor (name) {
    this.name = name;
    this.score = 0;
    this.hand = [];
  }
  getName() {
    const playerName = prompt("Player name: ");
    document.getElementById("playerName").innerText = playerName + "'s Hand";
  }
  addScore() {
    this.score = 0;
    for (let i = 0; i < this.hand.length; i++) {
      const card = this.hand[i];
      this.score += card;
    }
  } 
  checkFor21() {
    if (this.score === 21) {
      dealer.firstElementChild.classList.toggle("back");
      endGame.style.display = "flex";
      result.innerText = "Player has 21.";
    } 
    for (let i = 0; i < this.hand.length; i++) {
      if (this.hand[i] == 11 && this.score > 21) {
        this.score = this.score - 10;
      } 
    }
    if (this.score > 21) {
      dealer.firstElementChild.classList.toggle("back");
      endGame.style.display = "flex";
      result.innerText = "Player has bust.";
    }
}
}

//*  DEALER CLASS ---------------------------------------------------------------------------

class Dealer {
  constructor() {
    this.score = 0;
    this.hand = [];
  }
  addScore() {
    this.score = 0;
    for (let i = 0; i < this.hand.length; i++) {
      const card = this.hand[i];
      this.score += card;
    }
  }
  checkFor21() {
      
      if (this.score === 21) {
        if (dealer.firstElementChild.className == "back") {
        dealer.firstElementChild.classList.toggle("back");
        }
        endGame.style.display = "flex";
        result.innerText = "Dealer has 21.";
      } 
      for (let i = 0; i < this.hand.length; i++) {
        if (this.hand[i] == 11 && this.score > 21) {
          this.score = this.score - 10;
        } 
      }
      if (this.score > 21) {
        endGame.style.display = "flex";
        result.innerText = "Dealer has bust.";
      }
  }
}
  
  
  //  MAKE NEW DECK AND PLAYERS
  const newDeck = new Deck;
  newDeck.shuffle();

  const newPlayer = new Player;
  // newPlayer.getName();

  const newDealer = new Dealer;


/*===================================================================================================
          EVENT LISTENERS & GAME
===================================================================================================*/

//*  GLOBAL VARIABLES  -------------------------------------------------------------

const board = document.getElementById("board");
const deal = document.getElementById("deal");
const hit = document.getElementById("hit");
const dealer = document.getElementById("dealer");
const player = document.getElementById("player");
const endGame = document.getElementById("endGame");
const result = document.getElementById("result");
const playAgain = document.getElementById("playAgain");


//*  GLOBAL FUNCTIONS  -------------------------------------------------------------

//  Deal a card
function dealCard(person, array) {
  const card = document.createElement('div');
  card.className = 'card container';
  let randomCard = newDeck.cards.pop();
  card.innerHTML = randomCard.value + " " + randomCard.suit;
  if (randomCard.suit == "&#9829;" || randomCard.suit == "&#9830;") {
    card.style.color = 'red';
    }
  array.push(randomCard.points);
  person.appendChild(card);
}

//  Check dealer's hand for to place new cards if under 17

function willDealerHit() {
  if (newDealer.score < 17) {
    dealCard(dealer, newDealer.hand);
    newDealer.addScore();
    newDealer.checkFor21();
  }
}

// If no one has bust and both players stand

function dealerHandOver16() {
    if (newDealer.score > 16 && newDealer.score < 21) {
    if (newDealer.score > newPlayer.score) {
      endGame.style.display = "flex";
      result.innerText = "Dealer wins";
    } else if (newDealer.score == newPlayer.score) {
      endGame.style.display = "flex";
      result.innerText = "Stand-off, no winner";
    } else {
      endGame.style.display = "flex";
      result.innerText = "Player wins";
    }
  } else {
    newDealer.hand = newDealer.hand;
  }
}

function resetGame() {
  endGame.style.display = "none";
  result.innerText = "";
  newPlayer.hand = [];
  newDealer.hand = [];
  newPlayer.score = 0;
  newDealer.score = 0;
  deal.disabled = false;
  removePlayerCards();
  removeDealerCards();
}

function removePlayerCards(){
  // let player = document.getElementById("player");
  let cards = player.getElementsByClassName('card');
   //   Iterate and remove each child
   for (let i = cards.length - 1; i >= 0; i--) {
       let allCards = cards[i];
       player.removeChild(allCards);
   }
}

function removeDealerCards(){
  // let dealer = document.getElementById("dealer");
  let cards = dealer.getElementsByClassName('card container');
   //   Iterate and remove each child
   for (let i = cards.length - 1; i >= 0; i--) {
       let allCards = cards[i];
       dealer.removeChild(allCards);
   }
}

//*  EVENT LISTENERS ---------------------------------------------------------------

//  Deal button

deal.addEventListener("click", () => {
    dealCard(player, newPlayer.hand);
    dealCard(dealer, newDealer.hand);
    dealer.firstElementChild.classList.toggle("back");
    dealCard(player, newPlayer.hand);
    dealCard(dealer, newDealer.hand);
    deal.disabled = true;
    newPlayer.addScore();
    newPlayer.checkFor21();
    newDealer.addScore();
    newDealer.checkFor21();
});

//------------------------------
//  Hit button

hit.addEventListener("click", () => {
  dealCard(player, newPlayer.hand);
  // newPlayer.score = 0;
  newPlayer.addScore();
  newPlayer.checkFor21();
});

//------------------------------
//  Stand button

stand.addEventListener("click", () => {
  dealer.firstElementChild.classList.toggle("back");
  newDealer.addScore();
  newDealer.checkFor21();
  willDealerHit();
  setTimeout(() => {
    newDealer.addScore();
    newDealer.checkFor21();
    willDealerHit();
  }, 1000);
  setTimeout(() => {
    newDealer.addScore();
    newDealer.checkFor21();
    willDealerHit();
  }, 1000);
  dealerHandOver16();
  newDealer.checkFor21();
});

//------------------------------
//  Play again button

playAgain.addEventListener("click", () => {
  resetGame();
})