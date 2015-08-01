//跨浏览器的事件处理程序
var EventUtil={
  addHandler:function(element,type,handler){
    if(element.addEventListener){
      element.addEventListener(type,handler,false);
    }else if(element.attachEvent){
      element.attachEvent("on"+type,handler);
    }else{
      element["on"+click]=handler;
    }
  },
  removeHandler:function(element,type,handler){
    if(element.removeEventListener){
      element.removeEventListener(type,handler,false);
    }else if(element.detachEvent){
      element.detachEvent("on"+type,handler);
    }else{
      element["on"+click]=null;
    }
  }
};
