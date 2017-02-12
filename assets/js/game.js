// Press any key to get started!
//
// Wins: (# of times user guessed the word correctly).
//
// If the word is madonna, display it like this when the game starts: _ _ _ _ _ _ _.
//
// As the user guesses the correct letters, reveal them: m a d o _ _ a.
//
// Number of Guesses Remaining: (# of guesses remaining for the user).
//
// Letters Already Guessed: (Letters the user has guessed, displayed like L Z Y H).
//
// After the user wins/loses the game should automatically choose another word and make the user play it.
//
// Hangman Game Bonuses
//
// Play a sound or song when the user guesses their word correctly, like in our demo.
// Write some stylish CSS rules to make a design that fits your game's theme.
// HARD MODE: Organize your game code as an object, except for the key events to get the letter guessed. This will be a challenge if you haven't coded with JavaScript before, but we encourage anyone already familiar with the language to try this out.
// Save your whole game and its properties in an object.
// Save any of your game's functions as methods, and call them underneath your object declaration using event listeners.
// Don't forget to place your global variables and functions above your object.
// Remember: global variables, then objects, then calls.

/*
LOGIC:

press any key to start the game (start with an interstitial and fade out when clicked) initGame = true
grab a players name from JSON object player.FirstName + player.LastName arr[randomnum] // ajax request
save that to var -> playerGuess

function guess(e.key) {
  if press letter from var {
  success add that to the screen and add a class that opacities the letter (visual)
}

else {
opacity the letter
mark an incorrect guess --> 6 incorrect guesses (head, torso, left arm, right arm, left leg, right leg)
}

disableKey = true // this should say that if you press this key again ... nothing will happen

}

win -> you win pop up
lose -> you lose pop up

score (wins and losses) -> displayed on a scoreboard or a div like a scoreboard [http://www.dafont.com/score-board.font]


*/

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
  }
];

var lettersToGuess;
var alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
var answer;
var lettersGuessedRight = [];
var lettersGuessedWrong = [];
var game = {
  wins: 0,
  losses: 0,
  guesses: 0,
  maxGuesses: 6,
  isStarted: false,
  initGame: function(e) {
      //set vars for game start
      this.wins = 0;
      this.losses = 0;
      this.guesses = 0;
      this.maxGuesses = 6;
      game.isStarted = true;
      $('#wins').html(game.wins);
      $('#losses').html(game.losses);
      $('#guesses').html(game.maxGuesses);
      var randomPlayer = players[Math.floor(Math.random()*players.length)];
      var playerLetters = randomPlayer.firstName + randomPlayer.lastName;
      lettersToGuess = playerLetters.toLowerCase();
      console.log(randomPlayer.firstName + ' ' + randomPlayer.lastName);
      for (i=0; i<randomPlayer.firstName.length; i++) {
        $('.first-name').append('<div class="guess-box" data-letter="'+ randomPlayer.firstName.charAt(i).toLowerCase()+'"></div>');
      }
      for (i=0; i<randomPlayer.lastName.length; i++) {
        $('.last-name').append('<div class="guess-box" data-letter="'+ randomPlayer.lastName.charAt(i).toLowerCase()+'"></div>');
      }
      var playerArr = stringThatArr(lettersToGuess);
      answer = playerArr.filter(function(elem, index, self) {
          return index == self.indexOf(elem);
      });
      var badLetters = alphabet.filter( function( el ) {
        return playerArr.indexOf( el ) < 0;
      } );
  },
  removeStage: function() {
    $('.start-screen').addClass('game-on');
  },
  //pressLetter = []; --> push e.key if in here then ignore!
  //pressAnyKey = []; push. first key press --> stop the array
  guessLetter: function(e) {
    console.log('This is a guess')
  },
  playGame: function(e) {
    if(game.isStarted === false) {
      game.initGame();
      game.removeStage();
    }
    else {
      game.guess(e);
    }
  },
  guess: function(e) {
    if (isInArray(answer,e.key)) {
      //console.log('This Letter is in the answer');
      var guessDiv = $('.guess-box[data-letter="'+e.key+'"]');
      $(guessDiv).html('<span>' + e.key + '</span>');
      lettersGuessedRight.push(e.key);
      }
      else {
        //wrong guess
        game.maxGuesses--;
        $('#guesses').html(game.maxGuesses);``
        if(game.maxGuesses === 0) {
          alert('You Lose!')
        }
      }
    },
    winGame: function() {
      if(lettersGuessedRight.length === answer.length) {
        console.log('You Win');
        $('.start-screen').removeClass('game-on');
        game.initGame();
      }
    }
}

function stringThatArr(name) {
  var chars = name.split('');
  return chars;
}

function isInArray(arr, item) {
  return arr.indexOf(item.toLowerCase()) > -1;
}

window.addEventListener('keydown', game.playGame);
