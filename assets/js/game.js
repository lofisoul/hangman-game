//GLOBAL vars

//list of players to choose from
var players = [
  {
    'firstName' : 'Dion',
    'lastName' : 'Waiters'
  },
  {
    'firstName' : 'Lebron',
    'lastName' : 'James'
  },
  {
    'firstName' : 'Kevin',
    'lastName' : 'Durant'
  },
  {
    'firstName' : 'Giannis',
    'lastName' : 'Antetokounmpo'
  },
  {
    'firstName' : 'CJ',
    'lastName' : 'McCollum'
  },
  {
    'firstName' : 'Kyrie',
    'lastName' : 'Irving'
  },
  {
    'firstName' : 'John',
    'lastName' : 'Wall'
  },
  {
    'firstName' : 'Rudy',
    'lastName' : 'Gobert'
  }
];

var wins = 0; //wins start at 0
var losses = 0; //losses start at 0
var answer; //this is the player's first name and last name [not sure if this should be an array]
var isStarted = false; // the game is off to start
var guesses = 0 // this is a counter of the number of guesses that you make
var wrongGuesses = 6 // when this hits 0 then the game is over and you lose
var lettersGuessed = [];
var correctGuesses = [];

function startGame(e) {
  if(isStarted === true) {
    return;
  }
  else {
    removeStage();
    initGame();
  }
}

function removeStage() {
  $('.start-screen').addClass('game-on');
}

function initGame() {
  $('#guesses').html(wrongGuesses);
  $('#wins').html(wins);
  $('#losses').html(losses);
  generatePlayer();
  isStarted = true;
}

function generatePlayer() {
  var randomPlayer = players[Math.floor(Math.random()*players.length)];
  var playerLetters = randomPlayer.firstName + randomPlayer.lastName;
  var playerLetters = playerLetters.toLowerCase();
  //create divs on page for random player
  for (i=0; i<randomPlayer.firstName.length; i++) {
    $('.first-name').append('<div class="guess-box" data-letter="'+ randomPlayer.firstName.charAt(i).toLowerCase()+'"></div>');
  }
  for (i=0; i<randomPlayer.lastName.length; i++) {
    $('.last-name').append('<div class="guess-box" data-letter="'+ randomPlayer.lastName.charAt(i).toLowerCase()+'"></div>');
  }
  var nameArray = stringThatArr(playerLetters);
  answer = nameArray.filter(function(elem, index, self) {
      return index == self.indexOf(elem);
  });
  console.log(answer)
  return answer;
}

function destroyPlayer() {
  $('.first-name > div, .last-name > div').remove();
}

function stringThatArr(name) {
  var chars = name.split('');
  return chars;
}


function playGame(e) {
  if (isStarted === false) {
    return;
  }

  else {
    guessLetter(e);
  }
}

function guessLetter(e) {
  markLetterAsGuessed(e, lettersGuessed);
  if (isInArray(answer,e.key)) {
    markLetterAsGuessed(e, correctGuesses);
    console.log('This Letter is in the answer ' + correctGuesses);
    var guessDiv = $('.guess-box[data-letter="'+e.key+'"]');
    $(guessDiv).html('<span>' + e.key + '</span>');
    setTimeout(winGame,800);
    }
    else {
      //wrong guess
      console.log('This is a wrong Guess!');
      wrongGuesses--;
      $('#guesses').html(wrongGuesses);
      setTimeout(loseGame,800);
    }
  //this should take 2 conditions --> right guess and wrong guess
  //right guess adds letters to guess boxes
  //wrong guess subtracts guesses remaining
    // if (isInArray(answer,e.key)) {
    //   //console.log('This Letter is in the answer');
    //   var guessDiv = $('.guess-box[data-letter="'+e.key+'"]');
    //   $(guessDiv).html('<span>' + e.key + '</span>');
    //   lettersGuessedRight.push(e.key);
    // }
    // else {
    //   //wrong guess
    //   game.maxGuesses--;
    //   $('#guesses').html(game.maxGuesses);``
    //
    // }
}

function markLetterAsGuessed(e, arr) {
  if(isInArray(arr,e.key)){
    console.log('already guessed!');
    return;
  }
  else {
  console.log(e.key);
  arr.push(e.key);
  console.log(arr);
 }
}

function isInArray(arr, item) {
  return arr.indexOf(item.toLowerCase()) > -1;
}

function winGame() {
  if(answer.length === correctGuesses.length) {
  wins++;
  $('#wins').html(wins);
  playAgain('win');
  }
}

function loseGame() {
  if(wrongGuesses === 0) {
    losses++;
    $('#losses').html(losses);
    playAgain('lose');
  }
}

function playAgain(className) {
  isStarted = false;
  answer; //this is the player's first name and last name [not sure if this should be an array]
  guesses = 0 // this is a counter of the number of guesses that you make
  wrongGuesses = 6 // when this hits 0 then the game is over and you lose
  lettersGuessed = [];
  correctGuesses = [];
  // console.log('is started: ' + isStarted);
  // console.log('answer: ' + answer);
  // console.log('guesses: ' + guesses);
  // console.log('wrongGuesses: ' + wrongGuesses);
  // console.log('correctGuesses: ' + correctGuesses);
  destroyPlayer();
  $('.start-screen').removeClass('game-on').addClass(className);
  $('.outcome').text(className);
}

$(window).on('keyup', startGame);
$(window).on('keydown', playGame);
