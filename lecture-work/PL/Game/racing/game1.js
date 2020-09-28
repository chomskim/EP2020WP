const ZERO_POS = { x: 0, y: 0 };
const FPS = 60;

let canvas;
let canvasContext;

function randint(st, end) {
  return Math.floor(Math.random() * (end - st + 1) + st);
}
function Car() {
  this.position = { x: 250, y: 700 };
  this.sprite = sprites["racecar"];
  this.center = { x: this.sprite.width / 2, y: this.sprite.height / 2 };

  this.draw = function () {
    drawImage(this.sprite, this.position, 0, ZERO_POS);
  };
  this.colliderect = function (target) {
    var targetX = target.position.x + target.center.x;
    var targetY = target.position.y + target.center.y;
    var distX = Math.abs(targetX - (this.position.x + this.center.x));
    var distY = Math.abs(targetY - (this.position.y + this.center.y));
    return distX < this.center.x && distY < this.center.y;
  };
}
function Track(pos) {
  this.position = { x: pos, y: 0 };
  this.sprite = sprites["barrier"];
  this.center = { x: this.sprite.width / 2, y: this.sprite.height / 2 };

  this.draw = function () {
    drawImage(this.sprite, this.position, 0, ZERO_POS);
  };
}

let spritesStillLoading = 0;
var sprites = {};

const SPEED = 4;
var gameStatus = 0;

var car;

const TRACK_WIDTH = 120;
var trackPosition = 250;
var trackCount = 0;
var trackDirection = false;
var trackLeft = [];
var trackRight = [];

var keyDown = -1;

window.requestAnimationFrame =
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  function (callback) {
    window.setTimeout(callback, 1000 / FPS);
  };

function clearCanvas() {
  canvasContext.clearRect(0, 0, canvas.width, canvas.height);
}
function drawImage(sprite, position, rotation, center) {
  canvasContext.save();
  canvasContext.translate(position.x, position.y);
  canvasContext.rotate(rotation);
  canvasContext.drawImage(sprite, 0, 0, sprite.width, sprite.height, -center.x, -center.y, sprite.width, sprite.height);
  canvasContext.restore();
}
function update() {
  if (gameStatus === 0) {
    if (keyDown === Keys.left) {
      car.position.x -= 2;
    } else if (keyDown === Keys.right) {
      car.position.x += 2;
    }
    updateTrack();
  }
  if (trackCount > 200) {
    gameStatus = 2; // Chequered flag state
  }
}
function makeTrack() {
  // Function to make a new section of track
  trackLeft.push(new Track(trackPosition - TRACK_WIDTH));
  trackRight.push(new Track(trackPosition + TRACK_WIDTH));
  trackCount += 1;
}
function updateTrack() {
  // Function to update where the track blocks appear
  for (var i = 0; i < trackLeft.length; ++i) {
    if (car.colliderect(trackLeft[i]) || car.colliderect(trackRight[i])) {
      gameStatus = 1; // Red flag state
    }
    trackLeft[i].position.y += SPEED;
    trackRight[i].position.y += SPEED;
  }
  if (trackLeft[trackLeft.length - 1].position.y > 32) {
    if (trackDirection) trackPosition -= 16;
    else trackPosition += 16;

    if (randint(0, 4) === 1) trackDirection = !trackDirection;
    if (trackPosition > 700 - TRACK_WIDTH) trackDirection = true;
    if (trackPosition < TRACK_WIDTH) trackDirection = false;
    makeTrack();
  }
}
function draw() {
  car.draw();
  for (var i = 0; i < trackLeft.length; ++i) {
    trackLeft[i].draw();
    trackRight[i].draw();
  }
  if (gameStatus === 1) {
    drawImage(sprites["rflag"], { x: 318, y: 268 }, 0, ZERO_POS);
  }
  if (gameStatus === 2) {
    drawImage(sprites["cflag"], { x: 318, y: 268 }, 0, ZERO_POS);
  }
}

function loadSprite(imageName) {
  var image = new Image();
  image.src = imageName;
  spritesStillLoading += 1;
  image.onload = function () {
    spritesStillLoading -= 1;
  };
  return image;
}
function loadAssets() {
  sprites["racecar"] = loadSprite("img/" + "racecar.png");
  sprites["barrier"] = loadSprite("img/" + "barrier.png");
  sprites["rflag"] = loadSprite("img/" + "rflag.png");
  sprites["cflag"] = loadSprite("img/" + "cflag.png");
}
function assetLoadingLoop() {
  if (spritesStillLoading > 0) window.requestAnimationFrame(assetLoadingLoop);
  else {
    initialize();
    mainLoop();
  }
}
function handleKeyDown(evt) {
  keyDown = evt.keyCode;
}

function handleKeyUp(evt) {
  keyDown = -1;
}

function handleInput() {}

function initialize() {
  car = new Car();
  makeTrack();
  // Keyboard initialize
  document.onkeydown = handleKeyDown;
  document.onkeyup = handleKeyUp;
}
function mainLoop() {
  handleInput();
  update();

  clearCanvas();
  draw();

  window.requestAnimationFrame(mainLoop);
}
function start() {
  canvas = document.getElementById("racingpan");
  canvasContext = canvas.getContext("2d");
  loadAssets();
  assetLoadingLoop();
}
document.addEventListener("DOMContentLoaded", start);
