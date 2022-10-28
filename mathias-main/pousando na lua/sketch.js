var backgroundIMG
var nave,naveIMG
var g = 0.05
var vx = 0
var vy = 0
var ground
var trust
var left
var right
var fuel = 100
var crash
var land

function preload(){
backgroundIMG = loadImage("bg.png")
naveIMG = loadImage("normal.png")
trust = loadAnimation("b_thrust_1.png","b_thrust_2.png","b_thrust_3.png")
crash = loadAnimation("crash1.png","crash2.png","crash3.png")
land = loadAnimation("landing1.png","landing2.png","landing_3.png")
left = loadAnimation("left_thruster_1.png","left_thruster_2.png")
right = loadAnimation("right_thruster_1.png","right_thruster_2.png")
normal = loadAnimation("normal.png")

trust.playing = true
trust.looping = false
left.looping = false
right.looping = false
}

function setup() {
  createCanvas(1000,700);
  frameRate(80);

  timer = 1500
  trust.frameDelay = 5
  right.frameDelay = 5
  left.frameDelay = 5


  nave = createSprite(100,70,30,30)
  nave.addImage(naveIMG)
  nave.scale = 0.15
  nave.debug = false
  nave.setCollider("rectangle",0,5,500,650)

  nave.addAnimation("trusting",trust)
  nave.addAnimation("left",left)
  nave.addAnimation("right",right)
  nave.addAnimation("normal",normal)

  ground = createSprite(500,700,1000,20)

  rectMode(CENTER);
  textSize(15);
}

function draw() {
  background(51);
  image(backgroundIMG,0,0)

  push()
  textSize(20)
  fill("white")
  stroke("green")
  text("velocidade vertical " + round(vy),750,65)
  text("combustivel " + fuel,775,45)
  text("velocidade horizontal " + round(vx,2),730,85)
  pop()

  vy += g
  nave.position.y += vy
  nave.position.x += vx


  nave.collide(ground)
  drawSprites();
}

function keyPressed() {
  if (keyCode == UP_ARROW && fuel>0) {
    impulsao()
    nave.changeAnimation("trusting")
    trust.nextFrame()
  }

  if (keyCode == RIGHT_ARROW && fuel>0){
    nave.changeAnimation("left")
    rightTrust()
  }

  if (keyCode == LEFT_ARROW && fuel>0){
    nave.changeAnimation("right")
    leftTrust()
  }
}

function impulsao() {
  vy = -1

  fuel -= 1
}

function rightTrust(){
  vx += 0.2

  fuel -= 1
}

function leftTrust(){
  vx -= 0.2

  fuel -= 1
}