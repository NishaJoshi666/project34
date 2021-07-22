//Create variables here
var dog;
var happyDog;
var database;
var foodS, foodStock;
var dogImg;

function preload()
{
	//load images here
  dogImg = loadImage('images/dogImg.png');
  happyDog = loadImage('images/dogImg1.png');
}

function setup() {
	createCanvas(500, 500);
  
  dog = createSprite(200, 300, 100, 200);
  dog.addImage(dogImg);
  dog.scale = 0.2;

  database = firebase.database();

  foodStock = database.ref("Food");
  foodStock.on("value", readStock);
  
}


function draw() {  
  backgroung(rgb(46, 139, 87));

  fill("withe");
  textSize(20);
  text("Food Remaining:"+foodcount,400,100);
  text("PRESS UP ARROW TO FEED DOG",400,50);

  drawSprites();
  //add styles here
  if(KeyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog);
  }
  

}

// Function to read values from DB
function readStock(data){
  foodS = data.val();
}

// Function to write values in DB
function writeStock(x){
  if(x<=0){
    x = 0;
  }
  else{
    x = x-1;
  }

  database.ref('/').update({
    Food:x
  })
}