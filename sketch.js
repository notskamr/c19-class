//declaring global variables
var PLAY = 1;
var END = 0;
var gameState = PLAY;

var score = 0;
var highScore = 0;

//groups
  var cloudGroup;
  var obstacleGroup;
//loading images and animations
function preload(){
  trexRunning = loadAnimation('trex1.png', 'trex3.png', 'trex4.png');
  
  
  groundImage = loadImage('ground2.png'); 
  
  cloudImg = loadImage('cloud.png');
  
  obstacle1 = loadImage('obstacle1.png')
  obstacle2 = loadImage('obstacle2.png')
  obstacle3 = loadImage('obstacle3.png')
  obstacle4 = loadImage('obstacle4.png')
  obstacle5 = loadImage('obstacle5.png')
  obstacle6 = loadImage('obstacle6.png')
  
  resetTextPNG = loadImage('gameOver.png');
  resetButtonPNG = loadImage('restart.png')
  
  trexCollide = loadImage('trex_collided.png')
  
  jumpSound = loadSound('C19/jump.mp3')
  checkPointSound = loadSound('C19/checkPoint.mp3')
  dieSound = loadSound('C19/die.mp3')
}
function setup() {
  createCanvas(400, 400);
  
  
  
  
  //creating objects
  trex = createSprite(50, 370, 20, 50);
  

  trex.addAnimation('trex', trexRunning);
  
  trex.scale = 0.45;
  
  //invisible groud
 invisibleGround = createSprite(200, 400, 400, 10);
  invisibleGround.visible = false;
  
  //ground
  ground = createSprite(200, 395, 400, 10);
  ground.addImage('ground', groundImage);
  
 
  
  cloudGroup = new Group();
  obstacleGroup = new Group();
  
  
  reset = createSprite(200,250, 40, 40)
  reset.addImage('resetVar', resetTextPNG)
  reset.scale = 0.6;
  
  resetButton = createSprite(200,200,40,40)
  resetButton.addImage('resetButtonVar', resetButtonPNG)
  resetButton.scale = 0.7;
  
  
 
}

function draw() {
  background(255);
  
  
  
   text('High Score: '+ highScore, 20, 20);
    
  text('Score: '+ score, 320, 20);
  
  if(gameState == PLAY) {
    resetButton.visible=false;
  reset.visible =false;
  spawnClouds();
  spawnObstacles();
  ground.velocityX = -4;
  if(frameCount % 2 == 0) {
    score++;
  }
 
  if(ground.x < 0) ground.x = ground.width/2;
  
  if(keyDown('space') && trex.y >= 360) {
    
    trex.velocityY = random(-12,-14);
    jumpSound.play();
             
             }
 
  
   trex.velocityY = trex.velocityY + 0.8;
  
  trex.collide(invisibleGround);
  
  
  }
  
  
  if(obstacleGroup.isTouching(trex) ) {
    gameState = END;
     
     }
  
  if(gameState == END) {
   trex.setVelocity(0,0); 
     trex.addImage('trexCollideVar', trexCollide)
       ground.setVelocity(0,0);
       obstacleGroup.setVelocityEach(0,0);
    cloudGroup.setVelocityEach(0,0);
    
    resetButton.visible = true;
    reset.visible = true;
     
  
   
    
  }

   if(mousePressedOver(resetButton) && reset.visible == true && resetButton.visible ==true) {
      
      gameState = PLAY;
     reset.visible = false;
     resetButton.visible = false;
     obstacleGroup.destroyEach();
     score = 0;
     trex.x = 50;
     trex.y = 370;
      
    }
     
    //add gravity
 
   
  drawSprites();
    if(score>highScore) highScore = score;
}

function spawnClouds() {
  
  if(frameCount % 40 == 0) {
    var cloud = createSprite(420, random(20, 320), 20, 20);
   cloud.addImage('cloudAnim', cloudImg)
    cloud.scale = 0.7;
    cloud.velocityX = -4;
    cloud.depth = 0;
    cloudGroup.add(cloud);
    
  }
}

function spawnObstacles() {
  
   
  if(frameCount % 50 == 0) {
    var obstacle = createSprite(420, 376, 20, 40)
    obstacle.velocityX = -4;
    obstacleGroup.add(obstacle);
    var switchRand = 'obs' + Math.round(random(1,6))
  switch(switchRand) {
      case 'obs1': 
      obstacle.addImage(obstacle1);
      obstacle.scale = 0.5;
        break;
        
        case 'obs2': obstacle.addImage(obstacle2);
      obstacle.scale = 0.5
        break;
        
        case 'obs3': obstacle.addImage(obstacle3);
      obstacle.scale = 0.5
        break;
        
         case 'obs4': obstacle.addImage(obstacle4);
      obstacle.scale = 0.4
        break;
        
         case 'obs5': obstacle.addImage(obstacle5);
      obstacle.scale = 0.5
        break;
        
         case 'obs6': obstacle.addImage(obstacle6);
      obstacle.scale = 0.4
        break;
        
        default: break;
        
        
        
  }}}
