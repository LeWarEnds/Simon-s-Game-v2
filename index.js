//jshint esversion: 6

// Declare all the variables
let order = [];
let playerOrder = [];
let flash;
let turn;
let good;
let compTurn;
let intervalId;
let strict = false;
let noise = true;
let on = false;
let win;

// Declare all the html selectors and place them in the constant as they wont be changed.
const turnCounter = document.querySelector("#turn");
const topLeft = document.querySelector("#topleft");
const topRight = document.querySelector("#topright");
const bottomLeft = document.querySelector("#bottomleft");
const bottomRight = document.querySelector("#bottomright");
const strictButton = document.querySelector("#strict");
const onButton = document.querySelector("#on");
const startButton = document.querySelector("#start");

// Going step by step, the first thing is to write code for strict button. It will start the game again if user press the wrong pattern.

// 1) Strict Button
strictButton.addEventListener("click", (event) => {
  if(strictButton.checked == true){
    console.log(event);
    strict = true;
  } else{
    strict = false;
  }
});

// 2) Then there is the power button. Its declared onButton in the code.
onButton.addEventListener("click", (event) => {
  if(onButton.checked == true){ // Checked checks that if the checkbox is checked or not.
    on = true;
    turnCounter.innerHTML = "-";
  } else{
    on = false;
    turnCounter.innerHTML = "";
    clearColor();
    clearInterval(intervalId);
  }
});

// 3) Next is the Start Button which will activate the game.
startButton.addEventListener("click", (event) => {
  if(on || win){
    play(); // Calling the function which will have the code to start and play the game.
  }
});

// ****** The Main Code starts here ******

// Declares the play() function and the values be false, 0 ,1 in the beginning.
function play(){
  order = [];
  win = false;
  playerOrder = 0;
  flash = 0;
  intervalId = 0;
  turn = 1;
  turnCounte.innerHTML = 1;
  good = true;

  // As the game contains four quadrants, we will have to multiply it by 4 and add 1 to have range of 1 to 4.
  for(var i = 0; i < 20; i++){
    // Pushing the random numbers generated is pushed in the array named order initialized before.
    order.push(Math.floor(Math.random() * 4) + 1);
  }
  compTurn = true; // Declaring that the turn is of computer.
  intervalId = setInterval(gameTurn, 800); // Sets the interval in which function gameTurn runs i.e 800ms.
}

// Setting the gameTurn function.
function gameTurn(){
  if(flash == turn){ // flash refers to the light effect which is made when button is clicked and here it is the number of flashes and turn.
    clearInterval(intervalId);
    compTurn = false;
    clearColor(); // Clearing the color effects on button once it is clicked.
    on = true;
  }
  // Checking the computer's turn
  if(compTurn){
    clearColor();
    setTimeout(() => {
      if(order[flash] == 1) { // The flash is undefined currently and is incremented below.
        // Accessing and playing the audio and setting "noise to true" as the button is pressed.
        let one = function() {
          if(noise){
            let audio = document.getElementById("clip1");
            audio.play();
          }
          noise = true;
          // Changing the style of the button when it is clicked.
          topLeft.style.backgroundColor = "lightgreen";
        };
      }
      if(order[flash] == 2) {
        let two = function(){
          if(noise){
            let audio = document.getElementById("clip2");
            audio.play();
          }
          noise = true;
          topRight.style.backgroundColor = "tomato";
        };
      }
      if(order[flash] == 3) {
        let three= function(){
          if(noise){
            let audio = document.getElementById("clip3");
            audio.play();
          }
          noise = true;
          bottomLeft.style.backgroundColor = "yellow";
        };
      }
      if(order[flash] == 4) {
        let four = function(){
          if(noise){
            let audio = document.getElementById("clip4");
            audio.play();
          }
          noise = true;
          bottomRight.style.backgroundColor = "lightskyblue";
        };
      }
      flash++; // Incrementing it by 1 each time its clicked.
    }, 200); // The time is 200ms.
  }
}
