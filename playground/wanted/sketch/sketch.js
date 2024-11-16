let wallFont,collectSFX,buttonSFX,winSFX,lostSFX,bgm;let particles=[],targetScore,targetAnimal;let animals=["🐶","🐈","🐄","🦖","🦒","🐖","🐙","🐷","🦙"];let gameStarted=!1,gameEnded=!1,gameLost=!1;let startScreen,endScreen,gameScreen;function preload(){wallFont=loadFont('assets/Wallpoet-Regular.ttf');collectSFX=loadSound('assets/Collect.wav');buttonSFX=loadSound('assets/Button.mp3');winSFX=loadSound('assets/Win.mp3');lostSFX=loadSound('assets/Lost.mp3');bgm=loadSound('assets/Pixelland.mp3')}
function setup(){createCanvas(windowWidth,windowHeight);textureLayer=createGraphics(windowWidth,windowHeight);initTexture();if(!bgm.isPlaying())bgm.loop();initTarget();initScreens()}
function initTexture(){textureLayer.background(0,0);for(let i=0;i<8000;i++){let x=random(width);let y=random(height);let n=noise(x*0.01,y*0.01)*width*0.2;textureLayer.stroke("rgba(234,227,210,0.1)");textureLayer.line(x+n/2,y,x+n/2,y+n);textureLayer.line(x,y+n/2,x+n,y+n/2)}}
function draw(){if(!gameStarted){gameEnded?endScreen.display():startScreen.display();return}
if(gameScreen.score>=targetScore){gameLost=!1;endGame()}else if(gameScreen.speed>=gameScreen.speedLimit){gameLost=!0;endGame()}
gameScreen.display()}
function initTarget(){targetScore=random([5,10,15]);targetAnimal=random(animals);document.getElementById("target-animal").innerText=targetAnimal;document.getElementById("target-score").innerText=`Need: ${targetScore}`}
function startGame(){gameStarted=!0;document.getElementById("start-screen").classList.add("hidden");document.getElementById("game-screen").classList.remove("hidden");buttonSFX.play()}
function endGame(){gameStarted=!1;gameEnded=!0;document.getElementById("game-screen").classList.add("hidden");document.getElementById("end-screen").classList.remove("hidden");(gameLost?lostSFX:winSFX).play()}
function initScreens(){startScreen=new StartScreen();gameScreen=new GameScreen();endScreen=new EndScreen()}
function resetGame(){initTarget();initScreens();gameStarted=!1;gameEnded=!1;gameLost=!1;document.getElementById("end-screen").classList.add("hidden");document.getElementById("start-screen").classList.remove("hidden");buttonSFX.play()}
function windowResized(){resizeCanvas(windowWidth,windowHeight);textureLayer=createGraphics(windowWidth,windowHeight);initTexture();if(startScreen)startScreen.resize();if(gameScreen)gameScreen.resize();if(endScreen)endScreen.resize();}
function toggleFullscreen(){let fs=fullscreen();fullscreen(!fs)}
document.addEventListener("keydown",function(event){if(event.key===' '){toggleFullscreen()}})