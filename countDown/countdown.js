var endDate=new Date(2015,7,12,0,0,0);
function countDown(endDate){
  //获取倒计时剩余时间
  var nowDate=new Date();
  var rMsec=(endDate.getTime()-nowDate.getTime())/1000;
  var rDays=Math.floor(rMsec/86400);
  rMsec=rMsec%86400;
  var rHours=Math.floor(rMsec/3600);
  rMsec=rMsec%3600;
  var rMin=Math.floor(rMsec/60);
  rMsec=rMsec%60;
  var rSec=Math.floor(rMsec);


  //改变DOM
  $("#countDown .hour").html(rHours+"小时");
  $("#countDown .min").html(rMin+"分钟");
  $("#countDown .sec").html(rSec+"秒");

}
// setInterval
setInterval("countDown(endDate)",100);
