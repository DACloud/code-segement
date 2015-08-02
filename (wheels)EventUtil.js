var EventUtil={
  // 添加事件处理程序
  addHandler:function(element,type,handler){
    if(element.addEventListener){
      element.addEventListener(type,handler,false);
    }else if(element.attachEvent){
      element.attachEvent("on"+type,handler);
    }else{
      element["on"+click]=handler;
    }
  },
  // 获取事件对象event
  getEvent:function(event){
    return event?event:window.event;
  },
  //获取target
  getTarget:function(event){
    return event.target || event.srcElement;
  },
  // 取消事件的默认行为
  preventDefault:function(event){
    if(event.preventDefault){
      event.preventDefault();
    }else{
      event.returnValue=false;
    }
  },
  // 移除事件处理程序
  removeHandler:function(element,type,handler){
    if(element.removeEventListener){
      element.removeEventListener(type,handler,false);
    }else if(element.detachEvent){
      element.detachEvent("on"+type,handler);
    }else{
      element["on"+click]=null;
    }
  },
  // 停止时间冒泡和事件捕获
  stopPropagation:function(event){
    if(event.stopPropagation){
      event.stopPropagation();
    }else{
      event.cancelBubble=true;
    }
  },
  // 获取鼠标滑轮滑动值
  getWheelDeta:function(){
    // 检测浏览器是否为firefox
    if(event.wheelDelta){
      // 检测浏览器是否为opera 9.5之前的版本
      return (client.engine.opera && client.engine.opera < 9.5 ?
              -event.wheelDelta : event.wheelDelta)
    }else{
      return -event.detail * 40
    }
  }
};
// mousewheel跨浏览器判断（判断是否为firefox）
var mousewheel=function(){
  if(window.DOMMousescroll){
    return "DOMMousescroll";
  }else{
    return "mousewheel";
  };
}
