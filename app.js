// Game functions
// - Player must guess a number between a min & max
// - Player gets a certain amount of guesses
// - Notify player of guesses remaining
// - Notify player of the correct answer if loses
// - Let player choose to play again

// Game values
let min = 1;
let max = 10;
let winningNumber = getRandomNumber(min, max);
let guessesLeft = 3;
// UI elements
const game = document.querySelector('.box.game');
const minNumber = document.querySelector('.min-num');
const maxNumber = document.querySelector('.max-num');
const guessButton = document.getElementById('guessButton');
const guessInput = document.getElementById('guessInput');
const notification = document.querySelector('.notification');
// Assign UI min & max
minNumber.textContent = min;
maxNumber.textContent = max;

// Play again event listener
game.addEventListener('mousedown', function(e) {
  if (e.target.id === 'playAgainButton') {
    location.reload();
  }
});

// Listen for guess
guessButton.addEventListener('click', function() {
  let guessNumber = parseInt(guessInput.value);
  // Validate guess number
  if (isNaN(guessNumber) || guessNumber < min || guessNumber > max) {
    // Change border color
    guessInput.classList.add('is-danger');
    // Set message
    setMessage(`Please enter a number between ${min} & ${max}`, 'is-danger');
    // Clear border color
    setTimeout(function() {
      guessInput.classList.remove('is-danger');
    }, 2000);
    // Clear message
    clearMessage('is-danger');
  } else {
    // Check if won
    if (guessNumber === winningNumber) {
      // Game over - won
      gameOver(true, `${winningNumber} is correct, YOU WIN!!`);
    } else {
      // Wrong number
      guessesLeft -= 1;
      // Check if guesses left
      if (guessesLeft === 0) {
        // Game over - lost
        gameOver(false, `Game Over, you lost. The correct number was ${winningNumber}`);
        // Clear input
        guessInput.value = '';
      } else {
        // Game continues - answer wrong
        // Change border color
        guessInput.classList.add('is-warning');
        // Set message
        setMessage(`${guessNumber} is not correct, ${guessesLeft} guesses left`, 'is-warning');
        setTimeout(function() {
          guessInput.classList.remove('is-warning');
          notification.classList.remove('is-warning');
        }, 2000);
      }
    }
  }
});

// Game over
function gameOver(won, message) {
  let type = (won === true) ? 'is-success' : 'is-danger';
  // Disable input
  guessInput.disabled = true;
  // Change border color
  guessInput.classList.add(type);
  // Set message
  setMessage(message, type);
  // Play again?
  guessButton.textContent = 'Play Again?';
  guessButton.id = 'playAgainButton';
}

// Get random number
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Set message
function setMessage(message, type) {
  notification.textContent = message;
  notification.classList.add(type);
  notification.classList.remove('is-hidden');
}

// Clear message
function clearMessage(type) {
  setTimeout(function() {
    notification.classList.remove(type);
    notification.classList.add('is-hidden');
  }, 2000);
}