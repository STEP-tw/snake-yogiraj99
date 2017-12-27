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
  if (isGameOver(snake.getHead())) {
    actionsAfterGameOver();
  }
}

const isGameOver = function (snake_head) {
  let snake_head_x_coord=snake_head.getCoord()[0]
  let snake_head_y_coord=snake_head.getCoord()[1]
  return isHittingBorder(snake_head_x_coord,snake_head_y_coord);
}

const isHittingBorder = function (x_coord,y_coord) {
  return isCollidingHorizontally(x_coord)||isCollidingVertically(y_coord);
}

const isCollidingHorizontally = function (x_coord) {
  return x_coord>numberOfCols||x_coord<0;
}

const isCollidingVertically = function (y_coord) {
  return y_coord>numberOfRows||y_coord<0;
}

const actionsAfterGameOver = function () {
  let grid=document.getElementById("keys");
  grid.onkeyup=null;
  snake=undefined;
  food=undefined;
  clearInterval(animator);
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
  animator=setInterval(animateSnake,140);
}

window.onload=startGame;
