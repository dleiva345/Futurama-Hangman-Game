
// Variables 

let gameWords = ['amy', 'bender', 'farnsworth', 'hermes','fry', 'Zoidberg'];
let imgIds = ['#amy', '#bender', '#farnsworth', '#hermes','#fry', '#Zoidberg'];
let randomWord;
let dashWord;
let badGuesses;

// Code included inside $( document ).ready() will only run once the page Document Object Model (DOM) is ready for JavaScript code to execute
$(document).ready(function() {
  $('#play-button').on('click', startGame);
  $('#alphabet').on('click', 'button', alphaButtons);
});

//Functions  

function startGame() {
  chosenLetters = []; // chosen letter by user
  badGuesses = []; // bad guesses 
  randomWord = gameWords[Math.floor(Math.random() * gameWords.length)];// create a random word from gameWord array

  dashWord = initDashWord(); // initialize dashword 
  //With jQuery, you can remove attributes,hide or show HTML elements with the removeAttr(), hide() and show() methods:
  $('#alphabet button').removeAttr('disabled');
  $('#alphabet').show();
  $('#lives').show();
  imgIds.forEach(function(id) {
    $(id).hide();
  });
  render();
}


//Create dashes for random word
function initDashWord() {
  let result = ''; // start with empty string 
  for (var i = 0; i < randomWord.length; i++) { //loop through the letters of random word
    result += (randomWord[i] === ' ') ? ' ' : '_'; //result displays dashes per letter 
  }
  return result;
}
//The substring() method returns the part of the string between the start and end indexes, or to the end of the string.
function updateChar(str, idx, letter) {
  return str.substring(0, idx) + letter + str.substring(idx +1);
}

function replaceUnderscoresWithLetter(letter) {
  let replacedWord = randomWord;
  while (replacedWord.indexOf(letter) > -1) {
    let idx = replacedWord.indexOf(letter);
    dashWord = updateChar(dashWord, idx, letter);
    replacedWord = updateChar(replacedWord, idx, ' ');
  }
  render();
}


function render() {  
  if (badGuesses.length === 6) {
    $('#winLose-message').hide();
    $('#lives').text("Better Luck Next time");
    $('#alphabet').hide();
    $('#guessed-letters').text(randomWord);
    $(imgIds[gameWords.indexOf(randomWord)]).delay(1000).fadeIn();
  } else { 
    $('#winLose-message').show();
    $('#guessed-letters').text(dashWord);
    $('#lives').text(`${6 - badGuesses.length} CHANCES LEFT`);
  }
}

function alphaButtons(evt) {
  let letter = evt.target.id.toLowerCase();
  evt.target.disabled = true;
  if (randomWord.includes(letter)) {
    replaceUnderscoresWithLetter(letter);
  } else {
    badGuesses.push(letter);
  }
  checkForWin();
  render();
}

function checkForWin() {
  if (dashWord === randomWord) {
    $('#winLose-message').text("You Got this!");
    $('#lives').hide();
    $('#alphabet').hide();
    $(imgIds[gameWords.indexOf(randomWord)]).delay(400).fadeIn();
  }
}

startGame();



