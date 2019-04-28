// Color Guessing Game 
// Deon Odendaal 
// 2019-04-23

var numSquares = 6; //keep track of mode
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square"); //fetch all sqaures elemets
var colorDisplay = document.getElementById("colorDisplay"); // fetch color display span element in heading
var messageDisplay = document.querySelector("#message"); // fetch the message span element
var h1 = document.querySelector("h1"); //fetch the h1 element
var resetButton = document.getElementById("reset"); // fetch the buttons
var modeButtons = document.querySelectorAll(".mode");

init();

function init() {
    setupModeButtons();
    setupSquares();
    reset();
}

function setupModeButtons() {
    //loop through mode buttons
    for (var i = 0; i < modeButtons.length; i++) {
        // set up mode buttons events listeners
        modeButtons[i].addEventListener("click", function () {
            // remove selected class from all buttons
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            // apply selected class to clicked button
            this.classList.add("selected");
            // set number of squares based on selected mode
            this.textContent === "EASY" ? numSquares = 3 : numSquares = 6;
            //reset the screen
            reset();
        });
    }
}

function setupSquares() {
    // loop through all squares
    for (var i = 0; i < squares.length; i++) {
        // set up squares event listeners
        squares[i].addEventListener("click", function () {
            //grab color of clicked sqaure
            var clickedColor = this.style.backgroundColor;
            //compare color to picked color
            if (pickedColor === clickedColor) { // if guessed correctly
                messageDisplay.textContent = "Correct!"; //display message in header
                resetButton.textContent = "PLAY AGAIN"; //Change the text of the reset button on correct guess
                changeColors(clickedColor); // change all squares to the clicked color
                h1.style.background = clickedColor;
            } else {
                this.style.backgroundColor = "#232323"; //set square color same as body
                messageDisplay.textContent = "Try Again"; //display message in header
            }
        });
    }
}

function reset() {
    //generate 6 new random colors
    colors = generateRandomColors(numSquares);
    //pick a new random color from array
    pickedColor = pickColor();
    //change color display header to match picked color
    colorDisplay.textContent = pickedColor;
    //change text of the reset button
    resetButton.textContent = "NEW COLORS";
    //reset the message
    messageDisplay.textContent = "";
    // loop through all the squares and update their color
    for (var i = 0; i < squares.length; i++) {
        if (colors[i]) { // if the color exists in the array
            squares[i].style.display = "block"; // make it visible
            squares[i].style.backgroundColor = colors[i]; // set the color
        } else {
            squares[i].style.display = "none"; // else make it not visible
        }
    }
    //reset the h1 background
    h1.style.backgroundColor = "steelblue";
}

resetButton.addEventListener("click", function () {
    reset();
})

// generate random colors for color grid
function generateRandomColors(num) {
    //make an array
    var arr = [];
    //repeat num times
    for (var i = 0; i < num; i++) {
        //get random color and push into array
        arr.push(randomColor());
    }
    //return the array
    return arr;
}

function randomColor() {
    //pick 'red' from 0 - 255
    var red = Math.floor(Math.random() * 256);
    //pick 'green' from 0 - 255
    var green = Math.floor(Math.random() * 256);
    //pick blue from  0 - 255
    var blue = Math.floor(Math.random() * 256);
    //return string with random rgb color
    return "rgb(" + red + ", " + green + ", " + blue + ")";
}

//change all colors to match input color
function changeColors(color) {
    //loop through all squares    
    for (let i = 0; i < colors.length; i++) {
        //chnage each color to match given color
        squares[i].style.backgroundColor = color;
        h1.style.backgroundColor = color;
    }
}

//pick random color from colors array
function pickColor() {
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}