
var paused=false;
canvas = document.getElementById('canvastag');
ctx = canvas.getContext('2d');
var state = {enemyposition: [[30,0],[250,0]],x: 30,y: 130}

function drawplayer(){
  if (state.y>130) {
    state.y=130;
  }
  else if (state.y<0){
    state.y=0;
  }
  if (state.x>280) {
    state.x=280;
  }
  if (state.x<0) {
    state.x=0;
  }
  ctx.fillStyle = "green";
  ctx.fillRect(state.x,state.y,20,20);
  ctx.fill();
}
function right(){
  state.x +=10;
  ctx.clearRect((state.x-10),state.y,20,20);
}
function left(){
  state.x -=10;
  ctx.clearRect((state.x+10),state.y,20,20);
}
function up(){
  state.y -=10;
  ctx.clearRect(state.x,(state.y+10),20,20);
}
function down(){
  state.y +=10;
  ctx.clearRect(state.x,(state.y-10),20,20);
}
function drawenemy(){
  ctx.fillStyle = "yellow";
  ctx.fillRect(state.enemyposition[0][0],state.enemyposition[0][1], 20, 20);
  ctx.fill();
  
  ctx.fillStyle = "yellow";
  ctx.fillRect(state.enemyposition[1][0],state.enemyposition[1][1], 20, 20);
  ctx.fill();
}
function drawroad(){
  ctx.beginPath();
  ctx.strokeStyle = "black";
  ctx.moveTo(150,0);
  ctx.lineTo(150, 150);
  ctx.stroke();
}
 function gameloop() {
   
   ctx.clearRect(state.enemyposition[0][0],state.enemyposition[0][1],20,20);
   ctx.clearRect(state.enemyposition[1][0],state.enemyposition[1][1],20,20);
   state.enemyposition[0][1]+=1;
   state.enemyposition[1][1]+=1;
   if (state.enemyposition[0][1]==135 && state.enemyposition[1][1]==135) {
     state.enemyposition[0][1]
   =0;
     state.enemyposition[1][1]=0;
     
   }
   
   drawenemy();
   drawplayer();
   if (paused) {
     paused();
   }else{
     play();
   }
   
}
gameloop();
setInterval(road,50);
function road(){
   drawroad();
}

function trybtn(){
 ctx.clearRect(0,0,300,300);
 restart();
 document.getElementById('btn').classList.remove('display');
 document.getElementById('mybtn').classList.add('button');
 document.getElementById('pause').classList.add('display');
 document.getElementById('play').classList.add('display')
 gameloop();

}
function restart(){
   state = {enemyposition: [[30,0],[250,0]],x: 30,y: 130}
}
function play(){
  paused=false;
  if ((state.x < state.enemyposition[0][0] + 20 &&
      state.x + 20 > state.enemyposition[0][0] &&
      state.y < state.enemyposition[0][1] + 20 &&
      state.y + 20 > state.enemyposition[0][1]) || (state.x < state.enemyposition[1][0] + 20 &&
      state.x + 20 > state.enemyposition[1][0] &&
      state.y < state.enemyposition[1][1] + 20 &&
      state.y + 20 > state.enemyposition[1][1])) {
    document.getElementById('btn').classList.add('display');
    cancelAnimationFrame(gameloop);
    document.getElementById('mybtn').classList.remove('button');
    document.getElementById('pause').classList.add('display');
    document.getElementById('play').classList.add('display')
  } else
  {
    document.getElementById('btn').classList.remove('display');
    document.getElementById('pause').classList.remove('display');
    document.getElementById('play').classList.remove('display')
    requestAnimationFrame(gameloop);
  }
}
function pause() {
  paused=true;
  cancelAnimationFrame(gameloop);
  document.getElementById('btn').classList.add('display');
}
