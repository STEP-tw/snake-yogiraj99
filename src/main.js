let snake=undefined;
let food=undefined;
let numberOfRows=60;
let numberOfCols=120;

let animator=undefined;

const animateSnake=function() {
  let oldHead=snake.getHead();
  let oldTail=snake.move();
  let head=snake.getHead();
  paintBody(oldHead);
  unpaintSnake(oldTail);
  paintHead(head);
  if(head.isSameCoordAs(food)) {
    snake.grow();
    createFood(numberOfRows,numberOfCols);
    drawFood(food);
  }
  if (isGameOver(snake)) {
    actionsAfterGameOver();
  }
}

const isGameOver = function (snake) {
  let snake_head=snake.getHead();
  let head_x_coord=snake_head.getCoord()[0]
  let head_y_coord=snake_head.getCoord()[1]
  return isHitBorder(head_x_coord,head_y_coord)||isEatingEatself(snake);
}

const isEatingEatself = function (snake) {
  let snake_body=snake.getBody();
  let snake_head=snake.getHead()
  return snake_body.some((body_cell)=>{
    return body_cell.isSameCoordAs(snake_head)
  });
}

const isHitBorder = function (x_coord,y_coord) {
  return isCollidedHorizontally(x_coord)||isCollidedVertically(y_coord);
}

const isCollidedHorizontally = function (x_coord) {
  return x_coord>numberOfCols||x_coord<0;
}

const isCollidedVertically = function (y_coord) {
  return y_coord>numberOfRows||y_coord<0;
}

const actionsAfterGameOver = function () {
  let grid=document.getElementById("keys");
  grid.onkeyup=null;
  eraseGrids();
  clearInterval(animator);
  displayGameOver();
  giveChanceToRestart();
}

const eraseGrids = function () {
  let grid=document.getElementById("grid");
  grid.innerHTML=null;
}

const displayGameOver = function () {
  let message_box=document.getElementById("message_box");
  message_box.innerText="Game Over";
};

const displayGameIsGoingOn = function () {
  let message_box=document.getElementById("message_box");
  message_box.innerText="Game is Going on";
}

const giveChanceToRestart = function () {
  let restart=document.getElementById("restart_game");
  restart.onclick=startGame;
  restart.style.visibility="visible";
}

const changeSnakeDirection=function(event) {
  switch (event.code) {
    case "KeyA":
      snake.turnLeft();
      break;
    case "KeyD":
      snake.turnRight();
      break;
    case "KeyC":
      snake.grow();
      break;
    default:
  }
}

const hideRestartButton = function () {
  let restart=document.getElementById("restart_game");
  restart.onclick=null;
  restart.style.visibility="hidden";
}

const addKeyListener=function() {
  let grid=document.getElementById("keys");
  grid.onkeyup=changeSnakeDirection;
  grid.focus();
}

const createSnake=function() {
  let tail=new Position(12,10,"east");
  let body=[];
  body.push(tail);
  body.push(tail.next());
  let head=tail.next().next();

  snake=new Snake(head,body);
}

const createFood=function(numberOfRows,numberOfCols) {
  food=generateRandomPosition(numberOfCols,numberOfRows);
}

const startGame=function() {
  createSnake();
  drawGrids(numberOfRows,numberOfCols);
  drawSnake(snake);
  createFood(numberOfRows,numberOfCols);
  drawFood(food);
  addKeyListener();
  displayGameIsGoingOn();
  hideRestartButton();
  animator=setInterval(animateSnake,140);
}

window.onload=startGame;
