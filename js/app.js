/*
 * Create a list that holds all of your cards
 */
const iconsList = ["fa fa-diamond", "fa fa-diamond",
"fa fa-paper-plane-o", "fa fa-paper-plane-o",
"fa fa-anchor", "fa fa-anchor",
"fa fa-bolt", "fa fa-bolt",
"fa fa-cube", "fa fa-cube",
"fa fa-leaf", "fa fa-leaf",
"fa fa-bicycle", "fa fa-bicycle",
"fa fa-bomb", "fa fa-bomb"];

const cardsContainer = document.querySelector(".deck");
//we need to select the parent and append children to the parent in order to see the cards

// need to save opened cards in an array and compare them

let openedCards = [];
let matchedCards = [];

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
* Initialise the game
*/

//create the cards: loop over the array. The counter helps to create cards based on how many icons we have.
function init() {
  const icons = shuffle(iconsList);

  for(let i = 0; i < icons.length; i++){
    const card = document.createElement("li");
    card.classList.add("card"); //HTMK has card class
    card.innerHTML = `<i class="${icons[i]}"> </i>`; // <-- new JS --> old JS "<i class='" + icons[i] + "'</i>"//loops over the icons and pick one at a time
    //card.innerHTML = "<i class='"+ icons[i] +"'</i>";
    cardsContainer.appendChild(card); //parent/child append. Adding card as an argument

    // add click event to each card
    click(card);
  }
}

  /*
  * Click event
  */

  // first click event
let isFirstClick = true;
//why placing this in click(card) function made the time go weird and not stop

function click(card){


  // card click event, going to select each card and apply event listener to the card
//because we're still in the same loop it will be applied to all cards here
  card.addEventListener("click", function() {

/*
* first click set the condition to true
* will call startTimer function
* then we're setting the isFirstClick to false to after the next click
* it will be if(false) and nothing will happen
*/

if(isFirstClick) {
  //start start
  startTimer();
  //change isFirstClick indicator's value
  isFirstClick = false;
}
    const currentCard = this;
    const previousCard = openedCards[0];
    // we have an existing OPENED card
    if(openedCards.length === 1) {
// only applies match class to two cards, it compares to the first child, so we need to reset the array

        // need card flipping, links to CSS classes
        card.classList.add("open", "show", "disable");
        // this is pushing open cards into an empty array
        openedCards.push(this); // this reffered to card. the one with event listener at the beginning

        // compare two opened cards
        compare(currentCard, previousCard);


    } else {
      //we don't have any opened cards
        // need card flipping, links to CSS classes
        card.classList.add("open", "show", "disable");
        // this is pushing open cards into an empty array
        openedCards.push(this); // this reffered to card. the one with event listener at the beginning
    }
  });
}

/*
* Compare the 2 cards
*/

function compare(currentCard, previousCard){
//matcher

  //we should compare our 2 opened cards
  // this is the 2nd last clicked element.openedCards[0] is the first element as we saved it before
  if(currentCard.innerHTML === previousCard.innerHTML){

    currentCard.classList.add("match");
    previousCard.classList.add("match");
    //CSS match class

    matchedCards.push(currentCard, previousCard);

    openedCards = [];
    //check if the game is over
    isOver();

  } else {
    //wait 500ms before performing an action
    setTimeout(function(){
      //if don't match need to remove open and show class
      currentCard.classList.remove("open", "show", "disable");
      previousCard.classList.remove("open", "show", "disable");

    }, 500);
  openedCards = [];
  }

  //add moves
  addMove();
}

/*
* check if the game is over
*/

function isOver(){
  if(matchedCards.length === iconsList.length) {
// stop timer
    stopTimer();

    /*
     * Display your popup here, the `alert` is for explanation only!
     *
     * In your popup, you should create a button,
     * To let the user play a new game
     *
     * After clicking on that button, you should:
     *  - Call the `init` function to re-create the cards
     *  - Call the `reset` function to reset all variables
     */
    gameOverMessage();
  }
}

/*
 * add move
 */
const movesContainer = document.querySelector(".moves");
let moves = 0;
movesContainer.innerHTML = 0;
function addMove() {
  moves ++;
  movesContainer.innerHTML = moves;

  // set the rating
  rating();
}

/*
 * rating
 */

const starsContainer = document.querySelector(".stars");
starsContainer.innerHTML = `
  <li> <i class="fa fa-star"></i></li>
  <li><i class="fa fa-star"></i></li>
  <li><i class="fa fa-star"></i></li>`
function rating() {
    switch(moves) {
      case 15:
        starsContainer.innerHTML = `
          <li><i class="fa fa-star"></i></li>
          <li><i class="fa fa-star"></i></li>`
    break;
      case 25:
        starsContainer.innerHTML = `
          <li><i class="fa fa-star"></i></li>`
        break;
    }
  };

/*
 * Timer
 */

const timerContainer = document.querySelector(".timer");
let liveTimer,
    second = 0,
    minute = 0;

//set default value to the timer's container

timerContainer.innerHTML = minute + " min " + second + " secs";
/*
 * We call this function to start our function,
 * the totalSeconds will be increased
 * by 1 after 1000ms (1 second!)
 *
 * HINT: We need to call this function ONCE, and the best time to call it
 * is when the user click on a card (The first card!)
 * This means that our user is start playing now! ;)
 */

function startTimer() {
  liveTimer = setInterval(function(){
  timerContainer.innerHTML = minute + " min " + second + " secs";
//increase the totalSeconds by 1
    second++;
    if (second === 60) {
      minute++;
      second = 0;
    }
    //update html container with the new time

  }, 1000);
}

/*
 * Our timer won't stop. To stop it, we should clearInterval!
 * We will call it when the game is over.
 * So, we will call it at the end of `isOver` function
 *
 * HINT: That's why I created the `liveTimer` variable,
 * to store the setInterval's function, so that we can stop it by its name!
 */

 function stopTimer() {
   clearInterval(liveTimer);
 }


/*
 * Restart button
 */

const restartBtn = document.querySelector(".restart");
restartBtn.addEventListener("click", function(){
// delete all cards
cardsContainer.innerHTML = "";
// call "init" to create new cards
init();
// reset the Game
reset();
});

/*
* reset all variables
*/
function reset(){

// reset any related variables
matchedCards = [];
moves = 0;
movesContainer.innerHTML = moves;
starsContainer.innerHTML = `
  <li> <i class="fa fa-star"></i></li>
  <li><i class="fa fa-star"></i></li>
  <li><i class="fa fa-star"></i></li>`
  /*
       * Reset the `timer`
       *
       * - Stop it first
       * - Then, reset the `isFirstClick` to `true` to be able to start the timer again!
       * - Don't forget about `totalSeconds`, it must be `0`
       * - One more thing, is to update the HTML timer's container
       */
      stopTimer();
      isFirstClick = true;
      second = 0;
      timerContainer.innerHTML = minute + " min " + second + " secs";

}

// start the game for the first time
init();



// Get the modal
const modal = document.getElementById('myModal');

// Get the button that opens the modal
const btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
/////////////////////////

const gameOverModal = document.getElementById('gameOverModal');


// Get the <span> element that closes the modal
const span2 = document.getElementsByClassName("closeModal")[0];


// When the user clicks on <span> (x), close the modal
span2.onclick = function() {
    gameOverModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == gameOverModal) {
        gameOverModal.style.display = "none";
    }
}

function gameOverMessage() {
  gameOverModal.style.display = "block";
  container.style.display = "none"; //make container deck dissapear from the screen
  stars[1].innerHTML = starsContainer[0].innerHTML;
  timer[1].innerHTML = timerContainer[0].innerHTML;
  console.log ("game over");

}












/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */



/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
