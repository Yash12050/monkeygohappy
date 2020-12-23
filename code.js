var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":["a6870703-0124-47f7-acff-dbe905f5014c","68f7c36e-2fd5-451e-987f-b677126d3128","5ce44e39-12ac-4a66-88cf-a87a0ed6a180","33841f90-7a53-4346-b956-e51d1961959b"],"propsByKey":{"a6870703-0124-47f7-acff-dbe905f5014c":{"name":"monkey","sourceUrl":null,"frameSize":{"x":560,"y":614},"frameCount":10,"looping":true,"frameDelay":3,"version":"0j.bGUhOqT._NWbNvJ7Yn2QT.lcKqf.6","loadedFromSource":true,"saved":true,"sourceSize":{"x":1680,"y":1842},"rootRelativePath":"assets/a6870703-0124-47f7-acff-dbe905f5014c.png"},"68f7c36e-2fd5-451e-987f-b677126d3128":{"name":"monkey_copy_1","sourceUrl":null,"frameSize":{"x":560,"y":614},"frameCount":1,"looping":true,"frameDelay":12,"version":"me_Tke9Z.qHbhT_Za.iJzkxVWkxtpUVc","loadedFromSource":true,"saved":true,"sourceSize":{"x":560,"y":614},"rootRelativePath":"assets/68f7c36e-2fd5-451e-987f-b677126d3128.png"},"5ce44e39-12ac-4a66-88cf-a87a0ed6a180":{"name":"Banana","sourceUrl":"assets/v3/animations/0Pmc2UypwJxUUUBBxMOOYmiSvh97BJLRo_BQZbjyEto/5ce44e39-12ac-4a66-88cf-a87a0ed6a180.png","frameSize":{"x":1080,"y":1080},"frameCount":1,"looping":true,"frameDelay":4,"version":"88I7TNIS_S5S.3GM0mevp3NTPNjLt4vT","loadedFromSource":true,"saved":true,"sourceSize":{"x":1080,"y":1080},"rootRelativePath":"assets/v3/animations/0Pmc2UypwJxUUUBBxMOOYmiSvh97BJLRo_BQZbjyEto/5ce44e39-12ac-4a66-88cf-a87a0ed6a180.png"},"33841f90-7a53-4346-b956-e51d1961959b":{"name":"Stone","sourceUrl":"assets/v3/animations/0Pmc2UypwJxUUUBBxMOOYmiSvh97BJLRo_BQZbjyEto/33841f90-7a53-4346-b956-e51d1961959b.png","frameSize":{"x":512,"y":512},"frameCount":1,"looping":true,"frameDelay":4,"version":"4bHShGj_kt1zSRc5SMzB_H.FBURbjN8M","loadedFromSource":true,"saved":true,"sourceSize":{"x":512,"y":512},"rootRelativePath":"assets/v3/animations/0Pmc2UypwJxUUUBBxMOOYmiSvh97BJLRo_BQZbjyEto/33841f90-7a53-4346-b956-e51d1961959b.png"}}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

var monkey = createSprite(50,370);
monkey.setAnimation("monkey");
monkey.scale = 0.1;

var obstaclegroup = createGroup();
var gamestate = "play";
var bananagroup = createGroup();
var score = 0;
var time = 0;

function draw() {
  background(185);
  createEdgeSprites();
  if (gamestate === "play"){
    time = (Math.round(World.frameCount/60));
    if (monkey.isTouching(bananagroup)){
      score = score+10;
      bananagroup.destroyEach();
    }
    textSize(15);
    text("time:"+time,200,200);
    textSize(15);
    text("score:"+score,200,150);
    monkey.velocityY = monkey.velocityY + 2;
    if (keyDown("space") && monkey.y > 369){
      monkey.velocityY = -20;
    }
    
    if (monkey.isTouching(obstaclegroup)){
      gamestate = "end";
    }
    
    spawnBananas();
    spawnObstacles();
  }
  else
  if (gamestate === "end"){
    monkey.setAnimation("monkey_copy_1");
    obstaclegroup.setLifetimeEach();
    obstaclegroup.setVelocityXEach(0);
    monkey.velocityY = 0;
    score = score;
    bananagroup.setVelocityXEach(0);
    bananagroup.setLifetimeEach();
    time = time;
    textSize(15);
    text("Time:"+time,200,200);
    textSize(15);
    text("Score:"+score,200,150);
  }
  monkey.collide(bottomEdge);
  drawSprites();
}

function spawnObstacles(){
  if (World.frameCount % 100 === 0){
    var obstacle = createSprite(400,382);
    obstacle.setAnimation("Stone");
    obstacle.velocityX = -10;
    obstacle.scale = 0.1;
    obstaclegroup.add(obstacle);
    obstaclegroup.setLifetimeEach(80);
  }
}


function spawnBananas(){
  if (World.frameCount % 100 === 0){
    var banana = createSprite(400,302);
    banana.setAnimation("Banana");
    banana.velocityX = -10;
    banana.scale = 0.04;
    bananagroup.add(banana);
    bananagroup.setLifetimeEach(80);
  }
}
  

// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
