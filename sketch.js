var monkey , monkey_running,monkeystop;
var banana ,bananaImage, obstacle, obstacleImage,backgroundImage;
var FoodGroup, obstacleGroup;
var score, survialTime;
var ground,grass,grassimg,jumpsound,errorsound;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var grass1;
function preload(){
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")  
  
  bananaImage = loadImage("banana.png");
  
  obstacleImage = loadImage("obstacle.png");
 backgroundImage=loadImage("grass.PNG");
  grassimg=loadImage("mud1.PNG");
  monkeystop=loadImage("sprite_0.png");
  jumpsound=loadSound("Ba.mp3");
  errorsound=loadSound("error.mp3")
}

function setup() {

  createCanvas(500,400);
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
  TimeGroup = createGroup();
  
  

 // ground.depth=monkey.depth;
 // monkey.depth=monkey.depth + 1;
    ground = createSprite(70, 350, 800, 10);
    ground.velocityX = -5;
    ground.x=ground.width/2;
    ground.addImage(backgroundImage);
  ground.scale=5;
  grass=createSprite(100,375,800,50)
   grass.velocityX = -5;
    grass.x=grass .width/2;
  grass.addImage(grassimg);
  grass.scale=1.7;
  
  
  // i have moved this sprite
    monkey = createSprite(50, 250, 10, 10);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale = 0.1;
  
  grass1=createSprite(100,420,400,50)
  grass1.visible = false;
  // this part
  score = 0;
  survialTime = 0;
  
  
}

function draw() {
  
  background (180);
  drawSprites();
   
  
    fill("white");
      textSize(20);
  
  text("Survial Time:"+  survialTime, 10, 90);
  
  
 
    fill("yellow");
      textSize(20);
  text("Score:"+  score, 400, 90);
  
 //Monkey
  monkey.collide(grass1);
  //PLAY
  if(gameState === PLAY){
      monkey.changeAnimation("running", monkey_running);
    
    survialTime = Math.ceil(frameCount/frameRate());
     
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
if (grass.x < 0){
     grass.x = grass.width/2;
   }
    
    
    if(keyDown("space")) {
      jumpsound.play();
        monkey.velocityY = -12;
      
    }    
    
    if(FoodGroup.isTouching(monkey)) {
      FoodGroup.destroyEach();
      score = score+1;
    }
    monkey.velocityY = monkey.velocityY + 0.8
  
  monkey.velocityY = monkey.velocityY + 0.8;
  obstacleGroup.setLifetimeEach(-1);
  
  
  food();
  obstacles();
    
    
      
    
    
    if(obstacleGroup.isTouching(monkey)){
        errorsound.play();
        gameState = END;
      
    }
    var select_obstacal = Math.round(random(1,2));
  console.log(select_obstacal)
  
  if (World.frameCount % 80 == 0) {
    if (select_obstacal == 1) {
      food();
    } else if (select_obstacal == 2) {
      obstacles();
    }
  }
  }
  
   if (gameState === END) {
     obstacleGroup.destroyEach();
    FoodGroup.destroyEach();
     survialTime.visible = false;
     ground.velocityX=0;
     grass.velocityX=0;

     stroke("red");
    fill("red");
       textSize(30);
  text("Game Over", 120, 200);
     
      stroke("black");
    fill("black");
       textSize(30);
     text("The Monkey is hurt ", 100, 240);
   }
 
  

  
}


function food() {
  if (frameCount % 80 === 0) {
    banana = createSprite(400,350,40,10);
    banana.addImage(bananaImage);
    banana.y = Math.round(random(120,200));
    banana.scale = 0.1;
    
    banana.velocityX = -3;
    banana.lifetime = 200;
    
    FoodGroup.add(banana);
  }
}


function obstacles() {
  if (frameCount % 300 === 0){
    obstacle = createSprite(250,345,10,10);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -3;
    obstacle.lifetime = 200;
    obstacle.scale = 0.2 ;
     obstacleGroup.add(obstacle);
  }

}


 
 


