// Variable to store the list of guesses 
let guesses = [];

//Variable to store guesses left
let guessesLeft = 5;

// Variable to store the correct random number 
let correctNumber = getRandomNumber();
console.log(correctNumber);

window.onload = function() {
    document.getElementById("number-submit").addEventListener("click", playGame);
    document.getElementById("restart-game").addEventListener("click", initGame);
    getRandomNumber();
}

function triesCounter() {
  guessesLeft -= 1;
  console.log(guessesLeft)

  if(guessesLeft > 0){
  document.getElementById("tries").innerHTML = `You have ${guessesLeft} guesses left`;
  } else {
  document.getElementById("tries").innerHTML = `Too bad, please try`;

  setTimeout(() => {
    initGame()
    }, 2000);
  }
  
}

//Functionality for playing the whole game
 
function playGame(){
  let numberGuess = document.getElementById("number-guess").value;
  console.log(numberGuess);
  displayResult(numberGuess);
  saveGuessHistory(numberGuess);
  displayHistory()
  triesCounter()
}

//Show the result for if the guess it too high, too low, or correct

function displayResult (numberGuess) {
  if (numberGuess > correctNumber){
    showNumberAbove();
  }else if (numberGuess < correctNumber){
    showNumberBelow();
  }else{
    showYouWon();
  }   

}


//Initialize a new game by resetting all values and content on the page

function initGame(){
  //Reset the correctNumber
  correctNumber = getRandomNumber();

  //Reset the result display
  document.getElementById("result").innerHTML = "";

  //reset the guesses array
    guesses = [];

  //reset the guess history display
  displayHistory()

  //Reset Guesses Left variable
  guessesLeft = 5;

  document.getElementById("tries").innerHTML = `You have ${guessesLeft} guesses left`;
      
}



// Return a random number between 1 and 100

function getRandomNumber(){
  return Math.floor(Math.random() * 100);
}

// Save guess history 

function saveGuessHistory(guess) {
  guesses.push(guess);
}

//Display History descending order

function displayHistory() {
  let index = guesses.length -1; 
  let list = "<ul class='list-group'>";

    while(index >= 0){
      list += "<li class='list-group-item'>"  + "You guessed " + guesses[index] + "</li>";
      index -= 1; 
    }

  list += '</ul>'
  document.getElementById("history").innerHTML = list;
}

// Retrieve the dialog based on if the guess is wrong or correct 

function getDialog(dialogType, text){
  let dialog;
  switch(dialogType){
    case "warning":
      dialog = "<div class='alert alert-warning' role='alert'>"
      break;
    case "won":
      dialog = "<div class='alert alert-success' role='alert'>"
      break;
  }
  dialog += text;
  dialog += "</div>"
  return dialog;
}

function showYouWon(){
  const text = "Awesome job, you got it!"

  let dialog = getDialog('won', text);
  document.getElementById("result").innerHTML = dialog;

  setTimeout(() => {
    initGame()
  }, 4000);
}


function showNumberAbove(){
  const text = "Your guess is too high!"

  let dialog = getDialog('warning', text);
  document.getElementById("result").innerHTML = dialog;
}

function showNumberBelow(){
  const text = "Your guess is too low!"

  let dialog = getDialog('warning', text);
  document.getElementById("result").innerHTML = dialog;
}
