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
  checkFor21OnDeal() {
    if (this.score == 21) {
      showResult();
      result.innerText = "You drew 21. You win!"; 
    }
  }
  checkForBusts() {
    for (let i = 0; i < this.hand.length; i++) {
      if (this.hand[i] == 11 && this.score > 21) {
        this.score = this.score - 10;
      } else if (this.score > 21) {
      showResult();
      result.innerText = "You bust. Dealer wins."
      } else {
        return;
      }
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
        if (this.hand[i] == 11 && this.score > 21) {
          this.score -= 10;
        } 
      }
    for (let i = 0; i < this.hand.length; i++) {
      const card = this.hand[i];
      this.score += card;
    }
  }
  checkFor21OnDeal() {
    if (this.score == 21) {
      showResult();
      result.innerText = "Dealer drew 21. Dealer wins.";
    }
  }
  checkForBusts() {
    for (let i = 0; i < this.hand.length; i++) {
      if (this.hand[i] == 11 && this.score > 21) {
        this.score = this.score - 10;
      } else if (this.score > 21) {
      showResult();
      result.innerText = "Dealer busts. You win!"
      } else {
        return;
      }
    }
  }
  willDealerHit() {
    if (this.score < 17) {
      dealCard(dealer, this.hand);
      this.addScore();
    }
  }
  dealerHandOver16() {
    if (this.score > 16 && this.score < 21) {
      if (newPlayer.score > newDealer.score) {
        showResult();
        result.innerText = "You win!"
      } else if (newPlayer.score < newDealer.score) {
        showResult();
        result.innerText = "Dealer wins.";
      } else if (newPlayer.score == newDealer.score) {
        showResult();
        result.innerText = "Stand-off, no winner";
      } else {
        console.log(outcome);
      }
    }
  }
}
  
  
  //  MAKE 4 NEW DECKS AND PLAYERS
  const newDeck = new Deck;
  newDeck.createDeck();
  newDeck.createDeck();
  newDeck.createDeck();
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
const playerChips = document.getElementById('playerChips');
let chips = 100;


//*  GLOBAL FUNCTIONS  -------------------------------------------------------------

//  Deal a card   ................................................

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

function showResult() {
  endGame.style.display = "flex";
}


//  If no 21 on deal or busts, see who wins ......................

function whoWinsTheRound() {
  if (newPlayer.score > newDealer.score) {
    showResult();
    result.innerText = "You win!"
  } else if (newPlayer.score < newDealer.score) {
    showResult();
    result.innerText = "Dealer wins.";
  } else if (newPlayer.score == newDealer.score) {
    showResult();
    result.innerText = "Stand-off, no winner";
  } else {
    console.log(outcome);
  }
}


//  Reset all fields  .........................................

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
  let cards = player.getElementsByClassName('card');
   //   Iterate and remove each child
   for (let i = cards.length - 1; i >= 0; i--) {
       let allCards = cards[i];
       player.removeChild(allCards);
   }
}

function removeDealerCards(){
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
    newDealer.addScore();
    newPlayer.checkFor21OnDeal();
    newDealer.checkFor21OnDeal();
});

//------------------------------
//  Hit button

hit.addEventListener("click", () => {
  newPlayer.addScore();
  dealCard(player, newPlayer.hand);
  newPlayer.addScore();
  newPlayer.checkForBusts();
});

//------------------------------
//  Stand button

stand.addEventListener("click", () => {
  dealer.firstElementChild.classList.toggle("back");
  newDealer.addScore();
  newDealer.willDealerHit();
  setTimeout(() => {
    newDealer.addScore();
    newDealer.checkForBusts();
    newDealer.dealerHandOver16();
    newDealer.willDealerHit();
  }, 1000);
  newDealer.addScore();
  setTimeout(() => {
    newDealer.addScore();
    newDealer.checkForBusts();
    newDealer.dealerHandOver16();
    newDealer.willDealerHit();
  }, 1000);
  newDealer.addScore();
  newDealer.dealerHandOver16();
});

//------------------------------
//  Play again button

playAgain.addEventListener("click", () => {
  resetGame();
});