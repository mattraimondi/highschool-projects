//Variables for the canvas
var canvas;
var canvasContext;

//Variables for ball movement
var ballX = 400;
var ballY = 300;
var ballSpeedX = 5;
var ballSpeedY = 5;
var framesPerSecond = 30;
  
//Variables for paddle movement
var paddle1Y = 210;
var paddle2Y = 210;
const PADDLE_HEIGHT = 150;
const PADDLE_THICKNESS = 10;
var paddleSpeed = 4.6;

//Variables for score
var player1Score = 0;
var player2Score = 0;
const WINNING_SCORE = 5;
var showingWinScreen = false;
    
//6. Part 1 of Mouse detection
function calculateMousePos(evt) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var mouseY = evt.clientY - rect.top - root.scrollTop;
    return {
        x:mouseX,
        y:mouseY
    };
}
    
//Starts the game when the window loads
window.onload = function () { 
canvas = document.getElementById('gameCanvas');
canvasContext = canvas.getContext ('2d');
    
//Creates motion
setInterval (function() {
     drawEverything();
     moveEverything();
     drawWinScreen();
     }, 1000/framesPerSecond );

//Mouse Click part 1
canvas.addEventListener('mousedown', handleMouseClick);
    
//Part 2 of Mouse detection
canvas.addEventListener('mousemove', 
                        function(evt) {
            var mousePos = calculateMousePos(evt);
            paddle1Y = mousePos.y - (PADDLE_HEIGHT/2);
        });
}

//7. Mouse Click part 2
function handleMouseClick(evt) {
    if (showingWinScreen) {
        player1Score = 0
        player2Score = 0
        showingWinScreen = false;
    }
}
    
//12. Resets the ball
function ballReset(){
    if (player1Score >= WINNING_SCORE ||
        player2Score >= WINNING_SCORE) {
        showingWinScreen = true;
        drawWinScreen();
    }else {
        ballX = 400;
        ballY = 300;
        ballSpeedX = 5; // 13. Resets the speed of the ball
        ballSpeedY = 5;
        paddleSpeed = 4.6;
    }
}

//15. Computer Movement (paddle2)
function computerMovement() {
    var paddle2YCenter = paddle2Y + (PADDLE_HEIGHT/2);
    if (paddle2YCenter < ballY - 35) {
        paddle2Y = paddle2Y + (paddleSpeed);
    }
    else if (paddle2YCenter > ballY + 35) {
        paddle2Y = paddle2Y - (paddleSpeed);
    }
}
    
//Moves Ball
function moveEverything(){
if (showingWinScreen) {
    return;
}   

//14. Calls the AI Computer Movement function
computerMovement();
    
ballX = ballX + ballSpeedX;
ballY = ballY + ballSpeedY;
  
if (ballX > canvas.width){
    if (ballY > paddle2Y &&
        ballY < paddle2Y+PADDLE_HEIGHT){
        ballSpeedX = -ballSpeedX - 1; //16. Switches the dirction to right and increases speed
        -(paddle2Y+PADDLE_HEIGHT);
        } else {
    
            player1Score++;
            ballReset();
        }
    }
    
if (ballX < 0){
    if (ballY > paddle1Y &&
        ballY < paddle1Y+PADDLE_HEIGHT){
        ballSpeedX = -ballSpeedX + 1; //17. Switches the direction to left and increases speed
        -(paddle1Y+PADDLE_HEIGHT);
        } else {
    
            player2Score++;
            ballReset();
    }
}
    
if (ballY > canvas.height){
    ballSpeedY = -ballSpeedY; //18. The ball switches directions down
}
    
if (ballY < 0){
ballSpeedY = ballSpeedY/-1; //19. The ball switches direction up 
}
}

//8. Win Screen
function drawWinScreen(){
    if (showingWinScreen) {
        canvasContext.font = '20pt Verdana';
        canvasContext.fillStyle = 'Black';
        if (player1Score >= WINNING_SCORE) {
            canvasContext.fillText('You Win!', canvas.width/3, canvas.height/2);
        }else if (player2Score >= WINNING_SCORE) {
            canvasContext.fillText('You Lose', canvas.width/3, canvas.height/2);
            
        }
    }
}

//9. Draws a Rectangle
function colorRect(leftX,topY,width,height,drawColor) {
    canvasContext.fillStyle = drawColor;
    canvasContext.fillRect(leftX,topY,width,height);
}
    
//10. Draws a Circle
function colorCircle(centerX,centerY,radius,drawColor){
    canvasContext.fillStyle = drawColor;
    canvasContext.beginPath();
    canvasContext.arc(centerX,centerY,radius,10,0,Math.PI*2, true);
    canvasContext.fill();
}
    
//11. Function to draw net
function drawNet() {
    for(var i=0;i<canvas.height;i+=40){
        colorRect(canvas.width/2-1,i,5,20,'white');
    }
}

//Makes the canvas
function drawEverything() {
    
//20. Draws background
colorRect(0,0,canvas.width,canvas.height,'#FF7D33') //Orange Color

//Draws Paddle 1
colorRect(0,paddle1Y,PADDLE_THICKNESS,PADDLE_HEIGHT,'white');

//Draws Paddle 2
colorRect(canvas.width - 10,paddle2Y,PADDLE_THICKNESS,PADDLE_HEIGHT,'white');
    
//21. Draws Ball
colorCircle(ballX,ballY,10,'white')

//Draws Net
drawNet();
    
//Puts the MR in the lower left corner
canvasContext.font = '12pt Verdana';
canvasContext.fillStyle = 'White';
canvasContext.fillText('Matthew Raimondi', canvas.width - 170, canvas.height - 15);

//Writes scores on the screen
canvasContext.font = 'bold 9pt Verdana';
canvasContext.fillStyle = 'White';
canvasContext.fillText(player1Score, 50, 100);
    
canvasContext.font = 'bold 9pt Verdana';
canvasContext.fillStyle = 'White';
canvasContext.fillText(player2Score, 750, 100);
}
