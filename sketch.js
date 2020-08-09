var trex 
var trexRunning 
var trexCollided
var ground 
var groundImage 
var invisibleGround
var score
var cloudImage
var obstacle1,obstacle2,obtacle3,obstacle4,obstacle5,obltacle6
var cloudsGroup
var obstaclesGroup
var PLAY = 1
var END = 0
var gameover
var gameoverImage
var restart
var restartImage
var gameState = PLAY
function preload() {  
 trexRunning =               loadAnimation("trex1.png","trex3.png","trex4.png")
trexCollided = loadImage("trex_collided.png")
groundImage =loadImage("ground2.png") 
  cloudImage =loadImage("cloud.png") 
  obstacle1 = loadImage("obstacle1.png")
  obstacle2 = loadImage("obstacle2.png")
  obstacle3 = loadImage("obstacle3.png")
  obstacle4 = loadImage("obstacle4.png")
  obstacle5 = loadImage("obstacle5.png")
  obstacle6 = loadImage("obstacle6.png")
  gameoverImage =  loadImage("gameOver.png")
  restartImage  =  loadImage("restart.png")
}

function setup() {
  createCanvas(600, 200);
  trex =createSprite(50,180,20,50)
  trex.addAnimation("running",trexRunning) 
  trex.addAnimation("collided",trexCollided)
  trex.scale=0.5
  ground =createSprite(300,180,600,20)
  ground.addImage("ground",groundImage)
  invisibleGround=createSprite(300,190,600,5)
  invisibleGround.visible = false
  score = 0 ;
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  gameover=createSprite(300,80)
  gameover.addImage("gameover",gameoverImage)
  gameover.scale=0.5
  gameover.visible = false
  restart=createSprite(300,130)
  restart.addImage("restart",restartImage )
  restart.scale = 0.5
  restart.visible = false
  
}

function draw() {
  background(200);
  if (gameState===PLAY) {
  score = score+Math.round(getFrameRate()/60) 
  if(keyDown("space")&& trex.y>=159) {
  trex.velocityY=-13
     playsound
  }
  trex.velocityY = trex.velocityY + 0.8; 

  ground.velocityX=-(6 + 3*score/100);
  if(ground.x<0){
  ground.x = ground.width/2
}
  trex.collide(invisibleGround)
  spawnClouds()   
  spawnObstacles()
    if(obstaclesGroup.isTouching(trex)){
      gameState = END
      
    }  
  }
  else if(gameState===END){
    restart.visible = true
    
    gameover.visible = true
    
    cloudsGroup.setVelocityXEach(0)
  
    obstaclesGroup.setVelocityXEach(0)
    
    ground.velocityX=0
    
    trex.velocityY=0
    
    obstaclesGroup.setLifetimeEach(-1)
    
    cloudsGroup.setLifetimeEach(-1)
    
    trex.changeAnimation("collided",trexCollided)
  }
  
  if(mousePressedOver(restart)){
   reset()
  }
  text("score:"+score,500,50)
  drawSprites() ;
}

function spawnClouds() {
if(frameCount % 60 === 0){
 var cloud = createSprite(600,150,10,20)  
 cloud.y = Math.round(random(80,120))
 cloud.addAnimation("cloud",cloudImage) 
  cloud.velocityX = -3
  cloud.scale =   0.5
  cloud.lifetime = 200
  cloud.depth=trex.depth ;
  trex.depth=trex.depth+1; 
  cloudsGroup.add (cloud)
 }
}

function spawnObstacles() {
  if (frameCount%60===0) {
var obstacle = createSprite(600,165)
var rand =  Math.round(random(1,6))
switch (rand) {
  case 1:obstacle.addImage("obstace1",obstacle1)
  break ;
  case 2:obstacle.addImage("obstacle2",obstacle2)
    break;
  case 3:obstacle.addImage("obstacle3",obstacle3)
    break;
    case 4:obstacle.addImage("obstacle4",obstacle4)
    break;
    case 5:obstacle.addImage("obstacle5",obstacle5)
     break;
     case 6:obstacle.addImage("obstacle6",obstacle6)
    break;
}
    obstacle.velocityX=-(6 + 3*score/100);
    obstacle.scale=0.5
    obstacle.lifetime=200
    obstaclesGroup.add(obstacle)
  }
}
function reset() {
   gameState = PLAY;
  
  gameover.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  trex.changeAnimation("running",trexRunning);
  
  score = 0;
}
