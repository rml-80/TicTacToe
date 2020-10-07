let X;
let O;
let turn;
let play;
let winner;
let scoreX;
let scoreO;
let ties;

function startGame() {
  for (var i = 1; i <= 9; i++) {
    clearGrid(i);
  }
  hideNameBoxes();
  playerX.value = "";
  playerO.value = "";
  turn = 1;
  play = "X";
  winner = null;
  X = "";
  O = "";
  scoreX = 0;
  scoreO = 0;
  ties = 0;
  document.getElementById("X").innerHTML = ""; //For removing text in input field
  document.getElementById("O").innerHTML = ""; //For removing text in input field
  document.getElementById("T").innerHTML = ""; //For removing text in input field
  setMsg(play + " gets to start");
}
//Reset the board without reseting score
function resetBoard() {
  for (var i = 1; i <= 9; i++) {
    clearGrid(i);
  }
  turn = 1;
  play = "X";
  winner = null;
  setMsg(play + " gets to start");
}
//Set names of players
function setName() {
  X = document.getElementById("playerX").value;
  O = document.getElementById("playerO").value;
  setMsg(X + " gets to start")
  hideNameBoxes();
}

//show input fields
function showNameBoxes() {
  document.getElementById("names").style.display = "contents";
  document.getElementById("scores").style.display = "none";
    resetBoard();
}
//hide input fields
function hideNameBoxes() {
  document.getElementById("names").style.display = "none";
  document.getElementById("scores").style.display = "contents";
}

function setMsg(msg) {
  document.getElementById("msg").innerHTML = msg;
}

function nextMove(square) {
  if (winner != null) {
    setMsg(winner + " already won!")
  } else if (square.innerHTML == "") {
    square.innerHTML = play;
    switchPlayer();
    turn++;
  } else if (turn < 9) {
    setMsg("Choose another square!")
  } else {
    setMsg("No more turns.")
  }
}

function setWinner(play) {
  if (play == "X") {
    winner = X;
    scoreX++;
  } else if (play == "O") {
    winner = O;
    scoreO++;
  }
  console.log(scoreX + " : " + ties + " : " + scoreO);
  showScores();
  return winner + " is the winner!";
}

function switchPlayer() {
  if (X != "") {
    if (checkWinner(play)) {
      setMsg(setWinner(play));
      if (play == "O") {
        winner == O;
      } else {
        winner == X;
      }
    } else if (turn >= 9) {
      ties++;
      setMsg("It's a tie!");
            console.log(scoreX + " : " + ties + " : " + scoreO);
            showScores();
    } else if (play == "X") {
      play = "O";
      setMsg("It's " + O + "'s turn");
    } else {
      play = "X";
      setMsg("It's " + X + "'s turn");
    }
  } else {
    if (checkWinner(play)) {
      if (play == "X") {
        scoreX++;
      } else {
        scoreO++;
      }
      setMsg(play + " is the winner!");
      console.log(scoreX + " : " + ties + " : " + scoreO);
      showScores();
      winner = play;
    } else if (turn >= 9) {
      ties++;
      setMsg("It's a tie!");
            console.log(scoreX + " : " + ties + " : " + scoreO);
            showScores();
    } else if (play == "X") {
      play = "O";
      setMsg("It's " + play + "'s turn");
    } else {
      play = "X";
      setMsg("It's " + play + "'s turn");
    }
  }
}

function checkWinner(player) {
  var result = false;
  if (
    checkRow(1, 2, 3, player) ||
    checkRow(4, 5, 6, player) ||
    checkRow(7, 8, 9, player) ||
    checkRow(1, 4, 7, player) ||
    checkRow(2, 5, 8, player) ||
    checkRow(3, 6, 9, player) ||
    checkRow(1, 5, 9, player) ||
    checkRow(3, 5, 7, player)) {
    result = true;
  }
  return result;
}

function checkRow(a, b, c, player) {
  var result = false;
  if (getSquare(a) == player && getSquare(b) == player && getSquare(c) == player) {
    result = true;
    colorWinnersRow(a, b, c);
  }
  return result;
}

function getSquare(squareNumber) {
  return document.getElementById("square" + squareNumber).innerHTML;
}
//Claer the grid and make font color black.
function clearGrid(number) {
  document.getElementById("square" + number).innerHTML = "";
  document.getElementById("square" + number).style.color = "black";
}
//Make winners row font go green
function colorWinnersRow(a, b, c) {
  document.getElementById("square" + a).style.color = "lightgreen";
  document.getElementById("square" + b).style.color = "lightgreen";
  document.getElementById("square" + c).style.color = "lightgreen";
}
function showScores() {
  document.getElementById("X").innerHTML = scoreX;
  document.getElementById("O").innerHTML = scoreO;
  document.getElementById("T").innerHTML = ties;
}
