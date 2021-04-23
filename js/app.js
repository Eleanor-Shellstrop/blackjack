/*===================================================================================================
          CLASSES
===================================================================================================*/

//  CARD CLASS

class Card {
    constructor(value, suit, points) {
        this.value = value;
        this.suit = suit;
        this.points = points;
    }
  }   
  
  //  DECK CLASS
  
  class Deck {
    constructor(){
        this.cards = [];
        this.createDeck();
        this.shuffle();
        // this.render();
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
              //  Find a random number in index
              //  Assign to variable "swapIndex," 
              //  Add new card every loop to this index
            const swapIndex = Math.floor(Math.random() * (i + 1)); 
              //  In this case, i+1 is 52 for cards in the deck
              //  Locate current place in array
            const currentCard = this.cards[i];
              //  Moves the chosen cards to the front of the array
              //  Then swaps with remaining cards
              //  Chooses a card from remaining array
            const cardToSwap = this.cards[swapIndex];
            this.cards[i] = cardToSwap;
            this.cards[swapIndex] = currentCard;
        };
        return this;
    }
    // render() {
    //   document.getElementById("board").innerHTML = '';
    //   //  Create new card class for each playing card, append to "board" element
    //   for (let i = 0; i < this.cards.length; i++) {
    //     let div = document.createElement('div');
    //     div.className = 'card container';
    //     div.innerHTML += this.cards[i].value + " " + this.cards[i].suit;
    //     document.getElementById("board").appendChild(div);
    //     //  Change color to red if card is a heart or diamond  
    //     if (this.cards[i].suit == "&#9829;" || this.cards[i].suit == "&#9830;") {
    //       div.style.color = 'red';
    //     } else {
    //       div.style.color = 'black';
    //     }; 
    //   }
    // }
  }
  
  
  //  MAKE NEW DECK AND SHUFFLE
  const newDeck = new Deck;
  newDeck.shuffle();
//   newDeck.render();
  
document.getElementById("deal");
document.getElementById("dealer");
document.getElementById("player");

function dealCard(person) {
    const card = document.createElement('div');
    const randomCard = Math.floor(Math.random() * newDeck.cards.length);
    card.className = 'card container';
    card.innerHTML = newDeck.cards[randomCard].value + " " + newDeck.cards[randomCard].suit;
    let removedCard = newDeck.cards.splice(randomCard, 1);
    person.appendChild(card);
    console.log(removedCard);
}

deal.addEventListener("click", () => {
    dealCard(player);
    dealCard(dealer);
    dealCard(player);
    dealCard(dealer);
    deal.disabled = true;
});
