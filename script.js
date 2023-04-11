//=======================================//=======================================================================================//
//  *  Define initial game variables  *  //🔻==================================================================================🔻//
//=======================================//
let isHuman = true; // Flag to determine if the current player is human or computer
let gameOver = false; // Flag to determine if the game is over
const body = document.body; // The body element of the HTML document
const switchPlayerButton = document.getElementById("switchPlayerButton"); // Button to switch between human and computer players
const playerState = document.getElementById("playerState"); // Element that displays the current player
const squares = document.querySelectorAll(".square"); // All the individual squares on the game board
const message = document.getElementById("message"); // Element that displays messages to the user
const changeThemeButton = document.getElementById("change-theme"); // Button to toggle the theme
const restartButton = document.getElementById("restart")
const winningScore = 5; // Set winning score threshold
const player1ScoreElement = document.getElementById("player1-score"); // Get player 1 score element
const player2ScoreElement = document.getElementById("player2-score"); // Get player 2 score element
//🔺============================================================================================================================🔺//
//=================================================================================================================================//



//=============================//========================================================//
// *  Initialize gameboard  *  //🔻===================================================🔻//
//=============================//
let currentPlayer = "❌"; // Set initial player
let gameBoard = ["", "", "", "", "", "", "", "", ""]; // Initialize empty game board

const winPatterns = [ // Set possible win patterns
// Rows
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
// Columns
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
//Diagonals
  [0, 4, 8],
  [2, 4, 6]
];

// Initialize score variables 
let player1Score = 0; // Set initial score for player 1
let player2Score = 0; // Set initial score for player 2
//🔺=====================================================================================🔺//
//==========================================================================================//



//==================================//========================================================//
//  *  Function to update score  *  //🔻===================================================🔻//
//==================================//
function updateScore() {
  player1ScoreElement.textContent = player1Score; // Update player 1's score display
  player2ScoreElement.textContent = player2Score; // Update player 2's score display
}
//🔺=====================================================================================🔺//
//==========================================================================================//



//===========================================//===========================================================================================================================//
//m*  //🔻======================================================================================================================🔻//
//===========================================//
function checkWin() {
  for (let i = 0; i < winPatterns.length; i++) { // Loop through the win patterns array
    const [a, b, c] = winPatterns[i]; // Get the three indexes for the current win pattern
    if (gameBoard[a] !== "" && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) { // Check if the current win pattern matches the current game board state

    // Add a point to the current player's score
      if (currentPlayer === "❌") {
        player1Score++;m
      } else {
        player2Score++;
      }

    // Update the score display
      updateScore();


    // Check if the game has been won
      if (player1Score === winningScore) { // Check if player 1 has won
        gameOver = true;
        message.textContent = `❌ has won the game!`; // Set the message text
        return true;
      } else if (player2Score === winningScore) { // Check if player 2 has won
        gameOver = true;
        message.textContent = `⭕ has won the game!`; // Set the message text
        return true;
      }


      // Reset the game board and start a new game
        gameBoard = ["", "", "", "", "", "", "", "", ""]; // Reset the game board
        squares.forEach(square => square.textContent = ""); // Clear the board display
        currentPlayer = "❌"; // Set the current player to X
        message.textContent = `${currentPlayer}'s turn`; // Set the message text
        return false;
      }
    }

// Check if the game is a tie
  if (!gameBoard.includes("")) { // Check if the board is full
    gameOver = true; // Set the game over flag
    message.textContent = "It's a tie!"; // Set the message text


  // Reset the game board and start a new game
    gameBoard = ["", "", "", "", "", "", "", "", ""]; // Reset the game board
    squares.forEach(square => square.textContent = ""); // Clear the board display
    currentPlayer = "❌"; // Set the current player to X
    message.textContent = `${currentPlayer}'s turn`; // Set the message text
    return false;
  }
  return false;
}
//🔺===================================================================================================================================================================🔺//
//========================================================================================================================================================================//



//======================================================================================//=================================//
//  *  Define the handleClick function that handles the click event for the squares  *  //🔻============================🔻//
//======================================================================================//
function handleClick(index) {
  if (!gameOver && gameBoard[index] === "") { // Check if game is not over and the current square is empty
    gameBoard[index] = currentPlayer; // Set the current player's symbol in the gameBoard array
    squares[index].textContent = currentPlayer; // Update the square's text content with the current player's symbol
    if (checkWin()) { // Check if the current player has won
      return; // If they have, exit the function
    }
    currentPlayer = currentPlayer === "❌" ? "⭕" : "❌"; // Switch to the other player's turn
    message.textContent = `${currentPlayer}'s turn`; // Update the message to show whose turn it is
    if (!isHuman && currentPlayer === "⭕") { // If the current player is the computer and it's their turn
      // Find all the available moves (empty squares) left on the game board
      const availableMoves = gameBoard.reduce((acc, curr, index) => {
        if (curr === "") {
          acc.push(index);
        }
        return acc;
      }, []);
      // Generate a random index to choose a random move
      const randomIndex = Math.floor(Math.random() * availableMoves.length);
      // Call handleClick() with a random available square
      handleClick(availableMoves[randomIndex]);
    }
  }
}

// Add event listeners to the game board squares
squares.forEach((square, index) => {
  square.addEventListener("click", () => handleClick(index));
});
//🔺=====================================================================================================================🔺//
//==========================================================================================================================//



//================================//=================================================================//
//  *  CHANGE OPPONENT BUTTON  *  //🔻============================================================🔻//
//================================//
switchPlayerButton.addEventListener('click', () => {
  isHuman = !isHuman; // Switches the value of isHuman to change the current player
  playerState.innerHTML = isHuman ? '<strong>Human</strong>' : '<strong>Computer</strong>';
});

//🔺===============================================================================================🔺//
//====================================================================================================//



//======================//===============================================//
//  *  THEME BUTTON  *  //🔻==========================================🔻//
//======================//
let isDarkMode = false; // Flag to determine the current theme

changeThemeButton.addEventListener('click', () => {

// Get a random audio file index
const randomIndex = Math.floor(Math.random() * audioFiles.length);
  
// Create a new audio element
  const audio = new Audio(audioFiles[randomIndex]);
  
// Play the audio
  audio.play();

  // If the current theme is dark, switch to light
  if (isDarkMode) {
    body.classList.remove('dark');
    
    changeThemeButton.textContent = "Dark Mode";
  }

  // If the current theme is light, switch to dark
  else {

    body.classList.add('dark');
    changeThemeButton.textContent = "Light Mode";
  }
  isDarkMode = !isDarkMode; // Flip the isDarkMode flag
});

//🔺====================================================================🔺//
//=========================================================================//



//========================//==============================//
//  *  RESTART BUTTON  *  //🔻=========================🔻//
//========================//
// Function to reset the game and scores
function resetGame() {
  currentPlayer = "❌";
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  squares.forEach(square => square.textContent = "");
  message.textContent = `${currentPlayer}'s turn`;
  gameOver = false;
  player1Score = 0; // reset player 1 score
  player2Score = 0; // reset player 2 score
  updateScore(); // update score display
}

// Add event listener to restart button
restartButton.addEventListener("click", resetGame);


//🔺===================================================🔺//
//========================================================//



//===============//========================================================//
//  *  Audio  *  //🔻===================================================🔻//
//===============//
const audioFiles = [ // Create an array of audio files
  'btton-1.mp3',
  'btton-2.mp3',
  'btton-3.mp3',
  'btton-4.mp3',
  'btton-5.mp3',
  'btton-6.mp3',
];

// Get the button element
  const button = document.getElementById('switchPlayerButton');

// Add an event listener to the button
  button.addEventListener('click', () => {

// Get a random audio file index
  const randomIndex = Math.floor(Math.random() * audioFiles.length);
  
// Create a new audio element
  const audio = new Audio(audioFiles[randomIndex]);
  
// Play the audio
  audio.play();
});
//🔺=====================================================================🔺//
//==========================================================================//