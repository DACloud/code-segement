// 游戏主逻辑
var board =new Array();
var score=0;
$(document).ready(function(){
  newgame();
});

function newgame(){
  // 初始化棋盘格
  init();
  // 在随机两个格子生成数字
  generateOneNumber();
  generateOneNumber();
}
// 初始化函数
function init(){
  // 设置格子
  for(var i=0;i<4;i++){
    for(var j=0;j<4;j++){
      var gridCell=$("#grid-cell-"+i+"-"+j);
      gridCell.css("top",getPosTop(i,j));
      gridCell.css("left",getPosLeft(i,j));
    }
  }
  // 设置空的数字格子
  for(var i=0;i<4;i++){
    board[i]=new Array();
    for(var j=0;j<4;j++){
      board[i][j]=0;
    }
  }
  // 调用视觉更新函数
  updateBoardView();
}
// 让前端刷新显示，相当于controler
function updateBoardView(){
  // 删除之前存在的number-cell
  $(".number-cell").remove();
  // 在HTML中添加数字格子的DOM元素
  for(var i=0;i<4;i++){
    for(var j=0;j<4;j++){
      // 问题：这里单双引号的使用不是很了解
      $("#grid-container").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
      var theNumberCell=$("#number-cell-"+i+"-"+j);
      if(board[i][j]==0){
        theNumberCell.css("width","0");
        theNumberCell.css("height","0");
        theNumberCell.css("top",getPosTop(i,j)+50);
        theNumberCell.css("left",getPosLeft(i,j)+50);
      }else {
        theNumberCell.css("width",'100px');
        theNumberCell.css("height","100px");
        theNumberCell.css("top",getPosTop(i,j));
        theNumberCell.css("left",getPosLeft(i,j));
        theNumberCell.css("background-color",getNumberBackgroundColor(board[i][j]));
        theNumberCell.css("color",getNumberColor(board[i][j]));
        theNumberCell.text(board[i][j]);

      }
    }
  }
}
// 生成一个数字函数
function generateOneNumber(){
  // 判断是否有位置
  if(nospace(board)){
    return false;
  }
  else{
    // 随机位置
    var randomx=parseInt(Math.floor(Math.random()*4));
    var randomy=parseInt(Math.floor(Math.random()*4));
    // 问题：while语句这里不是很理解，循环是怎么运作的？
    while(true){
      if(board[randomx][randomy]==0){
        break;
      }else {
        var randomx=parseInt(Math.floor(Math.random()*4));
        var randomy=parseInt(Math.floor(Math.random()*4));
      }
    }
    // 随机数字,随即生成2或4
    var randNumber=Math.random()<0.5?2:4;
    // 在随即位置显示随机数字
    board[randomx][randomy]==randNumber;
    showNumberAnimation(randomx,randomy,randNumber);

    return true;
  }
}

// 按键时间
$(document).keydown(function(event){
  switch(event.keyCode){
    case 37://左
    // if的作用是，判断是否可以向左移动
    if(moveLeft()){
      // 向左移动后产生一个新的数字
      generateOneNumber();
      // 判断游戏是否结束
      isgameover();
    }
    console.log("left");
     break;
    case 38:
    if(moveUp()){
      generateOneNumber();
      isgameover();
    }
    console.log("up");
    break;
    case 39: break;
    case 40: break;
    default: break;
  }
})

function isgameover(){};

function moveLeft(){
  if(canMoveLeft(board)){
    for (var i = 0; i < 4; i++) {
      for (var j = 1; j < 4; j++) {
        if(board[i][j]!=0){
          for(var k=0;k<j;k++){
              if (board[i][k]==0 && noBlockHorizontal(i,k,j,board)) {
                // move
                showMoveAnimation(i,j,i,k);
                board[i][k]=board[i][j];
                board[i][j]==0;
                continue;
              }
              else if(board[i][k]==board[i][j] && noBlockHorizontal(i,j,board)){
                //move
                showMoveAnimation(i,j,i,k);
                //fold
                board[i][k]+=board[i][j];
                board[i][j]=0;

                continue;
              }
            }
          }
        }
      }

      updateBoardView();
      return true;
  }else {
    return false;
  }
};
function moveUp(){
  if(canMoveUp(board)){
    for(var i=0;i<4;i++){
      for(var j=0;j<4;j++){
        if(board[i][j]!=0){
          for(var k=0;k<i;k++){
            if(board[k][j]==0 && noBlockVertical(j,k,i,board)){
              showMoveAnimation(i,j,i,k);
              board[k][i]=board[i][j];
              board[i][j]=0;
              continue;
            }else if (board[k][j]==board[i][j] && noBlockVertical(j,k,i)) {
              showMoveAnimation(i,j,i,k);
              board[k][j]*=2;
              board[i][j]=0;
              continue;
            }
          }
        }
      }
    }
  }
}
