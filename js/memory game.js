/*
 * List of cards
 */

const iconsList = ["fa fa-diamond", "fa fa-diamond",
"fa fa-paper-plane-o", "fa fa-paper-plane-o",
"fa fa-anchor", "fa fa-anchor",
"fa fa-bolt", "fa fa-bolt",
"fa fa-cube", "fa fa-cube",
"fa fa-leaf", "fa fa-leaf",
"fa fa-bicycle", "fa fa-bicycle",
"fa fa-bomb", "fa fa-bomb"];

// const iconsList = ["fa fa-diamond", "fa fa-diamond"]; // Uncomment for testing purposes

const cardsContainer = document.querySelector(".deck");

// Opened cards are saved in an array, and will later be compared
let openedCards = [];
let matchedCards = [];

// Card shuffle function from http://stackoverflow.com/a/2450976
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

// Creates cards by looping over the iconsList array. The counter helps to create cards based on how many icons we have
function init() {
  const icons = shuffle(iconsList);

  for(let i = 0; i < icons.length; i++) {
    const card = document.createElement("li");
    card.classList.add("card");
    card.innerHTML = `<i class="${icons[i]}"> </i>`; // Loops over the icons and picks one at a time
    cardsContainer.appendChild(card); // Parent/child append. Adding card as an argument
    click(card); // Adds click event to each card (function below)
  }
}

/*
* The click event
*/

let isFirstClick = true; // First click event

function click(card) {
    // When going through the loop, will apply event listener to each card
    card.addEventListener("click", function() {
      // First click sets the condition to true, then we call startTimer function
      // We then set the isFirstClick to false
      if(isFirstClick) {
        startTimer();
        isFirstClick = false;
      }
    const currentCard = this;
    const previousCard = openedCards[0];
    if(openedCards.length === 1) { // Only applies match class to two cards, it compares to the first child, so we need to reset the array
    card.classList.add("open", "show", "disable"); // Links to CSS classes
    openedCards.push(this); // Pushes open cards into an empty array; this is reffered to a card which has the event listener from the beginning

    compare(currentCard, previousCard); // Compare two opened cards
      } else {
          card.classList.add("open", "show", "disable");
          openedCards.push(this);
        }
    });
}

/*
* Compare the 2 cards
*/

function compare(currentCard, previousCard) {
  // Compares 2 opened cards
  // This is the 2nd last clicked element.openedCards[0] is the first element as we saved it before
  if(currentCard.innerHTML === previousCard.innerHTML) {

    currentCard.classList.add("match");
    previousCard.classList.add("match"); // CSS match class
    matchedCards.push(currentCard, previousCard);
    openedCards = [];
    isOver(); // Check if the game is over

    } else { // Wait 500ms before performing an action
        setTimeout(function() {
      // If cards don't match need to remove open and show class
        currentCard.classList.remove("open", "show", "disable");
        previousCard.classList.remove("open", "show", "disable");
      }, 500);
      openedCards = [];
    }
  addMove(); // Add moves
}

/*
* Check if the game is over
*/

function isOver() {
  if(matchedCards.length === iconsList.length) {
    stopTimer();
    gameOverMessage();
  }
}

/*
 * Add moves
 */

const movesContainer = document.querySelector(".moves");
let moves = 0;
movesContainer.innerHTML = 0;
function addMove() {
  moves ++;
  movesContainer.innerHTML = moves;
  rating(); // Set the rating
}

/*
 * Rating
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

timerContainer.innerHTML = minute + " min " + second + " secs"; // Sets default value to timer's container

// The function is called once the user clicks on the first card
function startTimer() {
  liveTimer = setInterval(function(){
  timerContainer.innerHTML = minute + " min " + second + " secs";
    second++; // Increases the totalSeconds by 1 + updates HTML contaioner with new time
    if (second === 60) {
      minute++;
      second = 0;
    }
  }, 1000);
}

 function stopTimer() { // When the game is over, the timer will be stopped as it's being called at the of isOver function
   clearInterval(liveTimer);
 }

/*
 * Restart button
 */

const restartBtn = document.querySelectorAll(".restart");

for (var i = 0; i < restartBtn.length; i++) {
  restartBtn[i].addEventListener("click", function(){
    console.log("This is code to remove the modal"); // Test
    gameOverModal.style.display = "none";
    cardsContainer.innerHTML = ""; // Deletes all cards
    init();   // Call "init" to create new cards
    reset(); // Reset the Game
  });
}

/*
* Reset all variables
*/

function reset() { // Reset any related variables
  matchedCards = [];
  moves = 0;
  movesContainer.innerHTML = moves;
  starsContainer.innerHTML = `
    <li> <i class="fa fa-star"></i></li>
    <li><i class="fa fa-star"></i></li>
    <li><i class="fa fa-star"></i></li>`

  stopTimer(); // Stop the timer first, reset "isFirstClick" to "true", update HTML container
  isFirstClick = true;
  second = 0;
  timerContainer.innerHTML = minute + " min " + second + " secs";
}

/*
* Start the game for the first time
*/

init();

/*
* How to Play the Game Modal
*/

const modal = document.getElementById('howToPlayModalId');

// Get the button that opens the modal
const btn = document.getElementById("howToPlayBtn");

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
    if (event.target == howToPlayModal) {
        modal.style.display = "none";
    }
}

/*
* Game Over Modal
*/

const gameOverModal = document.getElementById('gameOverModal');

// Get the <span> element that closes the modal
const span2 = document.getElementsByClassName("closeModal")[0];

// When the user clicks on <span> (x), close the modal
span2.onclick = function() {
    gameOverModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none"
    }
}

/*
* Game Over Message
*/

function gameOverMessage() {
  gameOverModal.style.display = "block";
  //cardsContainer.style.display = "none"; //make container deck dissapear from the screen
  const finalTimer = document.querySelector(".finalTimer");
  finalTimer.innerHTML = timerContainer.innerHTML;

  const finalStars = document.querySelector(".finalStars");
  finalStars.innerHTML = starsContainer.innerHTML;

}
