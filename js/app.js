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
  
  
  //  MAKE NEW DECK AND SHUFFLE
  const newDeck = new Deck;
  newDeck.shuffle();
//   newDeck.render();


/*===================================================================================================
          EVENT LISTENERS & GAME
===================================================================================================*/

//*  GLOBAL VARIABLES  -------------------------------------------------------------

const deal = document.getElementById("deal");
const hit = document.getElementById("hit");
const dealer = document.getElementById("dealer");
const player = document.getElementById("player");
const result = document.getElementById("result");
let playersHand = [];
let dealersHand = [];
let playerScore = 0;
let dealerScore = 0;

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

//  Remove back of the dealer card
function removeBack () {
  dealer.firstElementChild.classList.remove("back");
}

//  TODO: Refactor the following 4 functions

function addPlayerScore () {
  for (let i = 0; i < playersHand.length; i++) {
    playerScore += playersHand[i];
  }
}


function addDealerScore () {
  for (let i = 0; i < dealersHand.length; i++) {
    dealerScore += dealersHand[i];
  }
}

function checkPlayersScore() {
  addPlayerScore();
  if (playerScore < 21) {
    playerScore = 0;
  } else if (playerScore === 21) {
    removeBack();
    result.style.display = "flex";
    result.innerText = "Player has 21.";
  } else {
    removeBack();
    result.style.display = "flex";
    result.innerText = "Player has bust.";
  }
}

function checkDealersScore() {
  addDealerScore();
  if (dealerScore < 21) {
    dealerScore = 0;
  } else if (dealerScore === 21) {
    removeBack();
    result.style.display = "flex";
    result.innerText = "Dealer has 21.";
  } else {
    removeBack();
    result.style.display = "flex";
    result.innerText = "Dealer has bust.";
  }
}

//*  EVENT LISTENERS ---------------------------------------------------------------

//  Deal button

deal.addEventListener("click", () => {
    dealCard(player, playersHand);
    dealCard(dealer, dealersHand);
    dealer.firstElementChild.classList.toggle("back");
    dealCard(player, playersHand);
    dealCard(dealer, dealersHand);
    deal.disabled = true;
    checkPlayersScore();
});

//  Hit button

hit.addEventListener("click", () => {
  dealCard(player, playersHand);
  checkPlayersScore();
})

// TODO: Finish this function

stand.addEventListener("click", () => {
  checkDealersScore();
  if (dealerScore < 17) {
    removeBack();
    dealCard(dealer, dealersHand);
  }
})

