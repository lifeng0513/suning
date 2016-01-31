   
   //1 ie不兼容classname的问题
   function getClass(classname,father){
   	  var obj=father||document;//对象的范围是父容器还是整个文档
   	  if(obj.getElementsByClassName){//如果识别类名，为ff中
          return obj.getElementsByClassName(classname);//直接返回即可
   	  }else{//ie中
   	  	var newarr=[];//定义一个空的arr
   	  	var alls=obj.getElementsByTagName("*");//obj中所有的标签
   	  	for(var i=0;i<alls.length;i++){//遍历obj中所有的便签
   	  		if(checkClass(alls[i].className,classname)){//找到的类名与要找的相同时
   	  			newarr.push(alls[i]);//将相同的放入到新的arr中
   	  		}
   	  	}
   	  	return newarr;
   	  }
   }
    //解决
   function checkClass(str,classname){
      var arr=str.split(" ");
      for(var j=0;j<arr.length;j++){
          if(arr[j]==classname) {
          	return true;
          }
      } 
      return false;
   }



// ******************************************
//2  获取与设置对象的纯文本的兼容函数

///obj:对象，从哪个对象中获取设置纯文本
//val：表示要设置的文本
//obj.textContent  ff
//obj.innerText    ie
   function getText(obj,val){
      if(val!=undefined){//设置  文本不为undefined
      	  if(obj.textContent || obj.textContent==""){    //ff中  
      	     return obj.textContent=val;    // 赋值给val
           }else{
             return obj.innerText=val;    //ie中
           }
      }else{     //获取
      	if(obj.textContent){   //ff
      		return obj.textContent;
      	}else{
      		return obj.innerText;   //ie
      	}
      }
  }  

  // var box=getClass("box")[0];
  // var btn=document.getElementById("btn");
  // var box2=getClass("box2")[0];
  //btn.onclick=function(){
  	//document.write(box);
  	//getText(box,"碑额");   //设置box的内容为
  	//getText(box2,2324);  //设置box2的内容为数值
  	//getText(box2,getText(box));    //把box中的内容复制到box2
  //}



// ******************************************
//3  获取通用样式的兼容函数

//obj:对象
//attr:属性

    function getStyle(obj,attr){
    	if(window.getComputedStyle){//如果可以识别，为ff中
    		return window.getComputedStyle(obj,null)[attr];//返回ff识别的函数对象的属性值
    	}else{
    		return currentStyle[attr];//否则为在ie中，使用ie识别的函数
    	}
    }
   //document.write(getStyle(box,"height"))


// ******************************************
// $(".类名");
// $("#id名");
// $("标签名");   div  span a  h1
   function $(selector,father){
     var obj=father||document;
     if(typeof selector=="string"){//判断是字符串
     	selector=selector.replace(/^\s*|\s*$/g,"");//找出字符串前后的空格替换成为"",对所形成的新的字符串进行判断
        if(selector.charAt(0)=="."){//类名
        	return getClass(selector.slice(1),obj);//从第二个开始（除了.之外的字符串）
        }else if(selector.charAt(0)=="#"){//id名
        	return obj.getElementById(selector.slice(1));//从第二个开始（除了#之外的字符串）
        }  else if(/^[a-z|1-10]{1,10}$/g.test(selector)){    //标签名   正则  查找字母a-z和数字1-10的范围为1-10位数
              return obj.getElementsByTagName(selector);//直接返回
        }
     } else if(typeof selector=="function"){//函数
     	window.onload=function(){//将外面的写到函数内，取消外面的
     		selector();//执行函数
     	}
     }
     
   }

   // $(function(){
	  //     var box=$(" .box    ")[0];
   //        //var first=$(" #first    ");
   //        // var divs=$("  div  ")[1];
   //        document.write(getStyle(box,"width"));
   // })


// ******************************************   
   //5  获取对象的子节点
   //type:a:获得元素节点，b：元素节点+文本节点
   function getChilds(father,type){
      var type=type||"a";//type未赋值时，默认为"a"即输出元素节点
      var childs=father.childNodes;
      var newarr=[];//声明一个空白容器
      for(var i=0;i<childs.length;i++){
        if(type=="a"){   //a:获得元素节点
          if(childs[i].nodeType==1){
           newarr.push(childs[i]);
          }
        }else if(type=="b"){  //b：元素节点+文本节点
          //节点类型为1，表示元素节点, ||元素节点包括属性和文本，去掉文本里的空白处,&&去掉注释内容
           if(childs[i].nodeType==1|| childs[i].nodeValue.replace(/^\s*|\s*$/g,"")!="" && childs[i].nodeType!=8){
              newarr.push(childs[i]);
           };
        }
        
      }
      return newarr;
   }


   
// ******************************************
   //6 获取对象的第一个子节点
      function getFirst(father){
         return getChilds(father)[0];
      }



// ******************************************
   //7 获取对象的最后一个子节点
      function getLast(father){
         return getChilds(father)[getChilds(father).length-1];
      }



// ******************************************
   //8 获取指定的子节点
       function getNum(father,num){
         return getChilds(father)[num];
      }


// ******************************************
   //9 获得下一个兄弟节点的引用
       function getDown(obj){
          var down=obj.nextSibling;
          while(down.nodeType==3 || down.nodeType==8){  //当找到的是注释和文本时，接着往上找
              down=down.nextSibling;
              if(down==null){ //如果找不到时，返回
                 return false;
              }
          }
          return down;
       }



// ******************************************
   //10 获得上一个兄弟节点的引用
       function getUp(obj){
          var up=obj.previousSibling;
          if(up==null){
            return false;
          }
          while(up.nodeType==3 || up.nodeType==8){  //当找到的是注释和文本时，接着往上找
              up=up.previousSibling;
              if(up==null){   //如果找不到时，返回
                 return false;
              }
          }
          return up;
       }

  // $(function(){
      // var one=$(".one")[0];
      // var innerone=$(".inner")[0];
      // var innertwo=$(".inner")[1];

      // document.write(getChilds(one).length);
      // document.write(getChilds(one,"a").length);
      // document.write(getChilds(one,"b").length);

      // getFirst(one).style.width="300px";
      // getLast(one).style.background="#999";
      // getNum(one,1).style.background="#706090";

      // getDown(innerone).style.background="red";
      // getUp(innertwo).style.background="pink";
  // })   


   //****************************************************
   //11.要插入到某个对象以后
   
   //newobj：要追加的对象
   //obj：在那个对象之前
    //对象共有的方法一般是加在原型上的，而原型只能给构造函数添加
    //所以共有的方法是添加到对象的构造函数的原型上的
    //this：指的是最终调用这个方法的对象，而这个对象是通过构造函数new出来的对象

   Object.prototype.insertAfter=function(newobj,obj){//对象.原型.方法(要实现的效果)=function(){}构造函数
       var down=getDown(obj);//获取obj的下一个兄弟节点
       if(down){//存在时，就把newobj插入到这个兄弟节点的前面（也就是obj对象的后面）
         this.insertBefore(newobj,down);//obj的后面的前面就是obj的后面
       }else{//如果不存在，表示obj就是最后一个节点了
         this.appendChild(newobj);//直接追加到父对象的后面
       }
   }


   // $(function(){
   //    //创建属性节点
   //      var a=document.createElement("a");
   //      document.body.appendChild(a);
   //      var hr=document.createAttribute("href");  //创建属性节点
   //      hr.nodeValue="http://www.baidu.com";  //给属性赋值
   //      a.setAttributeNode(hr);  //给属性节点设置属性

   //   //添加a元素到one的后面
   //      var one=$(".boxs")[0];
   //      document.body.insertAfter(a,one);
   // })
    



// *********************************************************
//同一个事件绑定多个事件处理程序
function addEvent(obj,event,fun){
  if(obj.addEventListener){
         return obj.addEventListener(event,fun,false); 
  }else{
    return obj.attachEvent("on"+event,fun);
  }
}
//同一个事件绑定多个事件处理程序
function removeEvent(obj,event,fun){
  if(obj.removeEventListener){
         return obj.removeEventListener(event,fun,false); 
  }else{
    return obj.detachEvent("on"+event,fun);
  }
}





//************************************************************************************************
//解决鼠标滚轮事件的兼容函数
    function mouseWheel(obj,upfun,downfun){
      if(obj.attachhEvent){
            obj.attachEvent("onmousewheel",scrollFn); //IE、 opera
        }else if(obj.addEventListener){
          obj.addEventListener("mousewheel",scrollFn,false); //chrome,safari -webkit-  
        obj.addEventListener("DOMMouseScroll",scrollFn,false); //firefox -moz- 
    }

        function scrollFn(e){
            var ev=e||window.event;
            if(ev.detail==-3||ev.wheelDelta==120){
                if(upfun){
                   upfun();
                }
            }
            if(ev.detail==3||ev.wheelDelta==-120){
                if(downfun){
                    downfun();
                }
            }    

            //事件对象阻止浏览器默认行为
            if (ev.preventDefault ){ 
                ev.preventDefault(); //阻止默认浏览器动作(W3C) 
            }else{
                ev.returnValue = false;//IE中阻止函数器默认动作的方式
            }
        }     

    }



// *********************************************************
    // function getObj(obj){
    //   return document.documentElement.scrollTop?document.documentElement:document.body;
    // }









    // hover
//判断某个元素是否包含有另外一个元素
 function contains (parent,child) {
  if(parent.contains){
     return parent.contains(child) && parent!=child;
  }else{
    return (parent.compareDocumentPosition(child)===20);
  }
 }

//判断鼠标是否真正的从外部移入，或者是真正的移出到外部；
  function checkHover (e,target) {
   if(getEvent(e).type=="mouseover"){
      return !contains(target,getEvent(e).relatedTarget || getEvent(e).fromElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).fromElement)===target)
   }else{
    return !contains(target,getEvent(e).relatedTarget || getEvent(e).toElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).toElement)===target)
    }
  }
//鼠标移入移出事件
/*
  obj   要操作的对象
  overfun   鼠标移入需要处理的函数
  outfun     鼠标移除需要处理的函数
*/
function hover (obj,overfun,outfun) {
    if(overfun){
      obj.onmouseover=function  (e) {
        if(checkHover(e,obj)){
           overfun.call(obj,[e]);
        }
      }
    }
    if(outfun){
      obj.onmouseout=function  (e) {
        if(checkHover(e,obj)){
           outfun.call(obj,[e]);
        }
      }
    }
}
 function getEvent (e) {
      return e||window.event;
 }
/********************************/


// 节点轮播



function nodeLunbo(imgbox,leftbtn,rightbtn,num){
                    // var t=setInterval(moveleft,2000);
                    function moveleft(){
                        //对象，属性，时间，运动方式，回调函数
                        //每次走前提是给一个left  -600    
                        animate(imgbox,{left:-num},400, Tween.Linear,function(){
                                var one=getFirst(imgbox);
                                imgbox.appendChild(one);
                                imgbox.style.left="0px";
                        });
                    }

                    function moveright(){
                        imgbox.style.left=-num+"px";
                        var last=getLast(imgbox);
                        imgbox.insertBefore(last,getFirst(imgbox));
                        animate(imgbox,{left:0},400,Tween.Linear);
                    }


                    /*leftbtn.onmouseover=rightbtn.onmouseover=function(){
                        clearInterval(t);
                    }
                    leftbtn.onmouseout=rightbtn.onmouseout=function(){
                        t=setInterval(moveleft,2000);
                    }*/

                    leftbtn.onclick=function(){
                        moveleft();
                    }
                    rightbtn.onclick=function(){
                        moveright();
                    }
                }





//  选项卡
/*function xxk(title,f1m){
    for (var i = 0; i < title.length; i++) {
    title[i].index=i;
    title[i].onmouseover=function(){
      for (var j = 0; j < f1m.length; j++) {
        f1m[j].style.display="none";
        title[j].style.cssText="border:0px";
      }
      f1m[this.index].style.display="block";
      title[this.index].style.cssText="width: 120px; height: 35px;float: left;overflow: hidden; background: #fff;border:2px solid #FF6B80; "
    }
    
    }
  }*/
