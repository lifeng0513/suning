$(function(){



//******************************************************************************
var title1=$(".title1");
// alert(title1.length)
var navLa=$(".nav-la");
menulist(title1,navLa,"a")

function menulist(yiji,erji,tag){
	for (var i = 0; i < yiji.length; i++) {    //  遍历一级菜单
			yiji[i].index=i;               // 将每个元素都储存在index属性中。
			hover(yiji[i],function(){
				var sons=$(tag,erji[this.index]);  //  二级里面的标签  保存在二级的儿子里。
				// // alert(sons.length)
				var h=sons[0].offsetHeight;    //  将 二级中所有儿子的高度获取到  给了h 变量。
				// // alert(h);
				// erji[this.index].style.height=0;    //  二级 当前的高度就是0；
				erji[this.index].style.height='auto';
				},function(){
					animate(erji[this.index],{height:0},200,Tween.Linear);
					// erji[this.index].style.height=0;
				})
		}
}

//******************************************************************************
	//  搜索框 input

	// 获取input焦点
	var text=$("#input");
	text.onfocus=function(){
		if(text.value=="服饰鞋包秋季新品五折起"){
           text.value="";
		}
	}
	text.onblur=function(){
		if(text.value==''){
			text.value="服饰鞋包秋季新品五折起";
		}
	}



//******************************************************************************
	//  选项卡

	function xxk(title,con,style){
			for (var i = 0; i < title.length; i++) {
				title[i].index=i;
				title[i].onmouseover=function(){
					for (var j = 0; j < con.length; j++) {
						con[j].style.display="none";
						title[j].className='';
					}
					con[this.index].style.display="block";
					title[this.index].className=style;
				}
			
			}
	}

	var f1m=$(".f1-fz");
	var f1tab=$(".fuz")[0];
	var f1title=$("a",f1tab);
	xxk(f1title,f1m,"on");

	var f2m=$(".f1-sjtx");
	var f2tab=$(".sjtx")[0];
	var f2title=$("a",f2tab);
	xxk(f2title,f2m,"on2");

	var f3m=$(".f1-shyp");
	var f3tab=$(".shyp")[0];
	var f3title=$("a",f3tab);
	xxk(f3title,f3m,"on3");

	var f4m=$(".f1-spjs");
	var f4tab=$(".spjs")[0];
	var f4title=$("a",f4tab);
	xxk(f4title,f4m,"on4");

	var f5m=$(".f1-mywj");
	var f5tab=$(".mywj")[0];
	var f5title=$("a",f5tab);
	xxk(f5title,f5m,"on5");
		
	var f6m=$(".f1-mzgh");
	var f6tab=$(".mzgh")[0];
	var f6title=$("a",f6tab);
	xxk(f6title,f6m,"on6");
		
	var f7m=$(".f1-dnsm");
	var f7tab=$(".dnsm")[0];
	var f7title=$("a",f7tab);
	xxk(f7title,f7m,"on7");

	var f8m=$(".f1-jydq");
	var f8tab=$(".jydq")[0];
	var f8title=$("a",f8tab);
	xxk(f8title,f8m,"on8");

	var f9m=$(".f1-shdq");
	var f9tab=$(".shdq")[0];
	var f9title=$("a",f9tab);
	xxk(f9title,f9m,"on8");

	var f10m=$(".f1-jzjc");
	var f10tab=$(".jzjc")[0];
	var f10title=$("a",f10tab);
	xxk(f10title,f10m,"on9");

	var f11m=$(".f1-tsyy");
	var f11tab=$(".tsyy")[0];
	var f11title=$("a",f11tab);
	xxk(f11title,f11m,"on0");
	
//******************************************************************************
//  下面 轮播
var xianshi=$(".xianshi")[0];
var imgbox=$(".imgbox")[0];
var imgs1=$(".sq-cos2",imgbox);
var leftbtna=$(".leftbtn")[0];
var rightbtn=$(".rightbtn")[0];
var xiao=$("li",$(".xia")[0]);

wufeng(imgs1,xiao,leftbtna,rightbtn,1000,"xia1");
	
	hover(xianshi,function(){
			leftbtna.style.display="block";
			rightbtn.style.display="block";
		},function(){
			leftbtna.style.display="none";
			rightbtn.style.display="none";
		})
	function wufeng(imgs,lis,left,right,imgW,classname){
		for (var i = 0; i < imgs.length; i++) {
			if (i!=0) {
				imgs[i].style.left=imgW+"px";
			}
		}
		// 自动轮播
		var now=0;  // 当前的下标
		var next=0;  // 下一张图片的下标
		var flag=true;     // 控制动画的    让它执行完之后再操作
		// var t=setInterval(move,2000);  //  时间函数
		function move(){    //  时间函数中的回调函数
			if (now==this.index||!flag) {
					return;
				}
			flag=false;
			next++;                 // 下一个下标要自加；
			if (next==imgs.length) {        // 小标长度等于了图片的长度时 ，让它从0 开始继续执行
				next=0;
			};
			imgs[next].style.left=imgW+"px";   // 即将要显示的图片，放到右边  因为它是从右边出来
			animate(imgs[now],{left:-imgW},800,Tween.Linear);
			animate(imgs[next],{left:0},800,Tween.Linear,function(){    //  当前在显示框中的图片要向左走
				flag=true;
			});  // 那么下一张图片就得到显示框中，所以left=0；
			lis[now].className='';        //  当前的小图标 清空样式
			lis[next].className=classname;  // 即将显示的 呈现host中存的样式
			now=next;         //  因为下标是随着轮动变化的。也就是说是往前走的  所以就是下一张图片的下标作为显示框图片的下标
			// alert(now);
		}
		// 点击小图片图标
		for (var i = 0; i <lis.length ; i++) {
			lis[i].index=i;
			lis[i].onclick=function(){    //  给每个小图标添加一个单击事件
				if (now==this.index||!flag) {    // 如果单击的跟现在显示的是同一个是，让它不执行
												 //或者是，开关为 关 着的时候也让它不执行。
					return;
				}
				flag=false;           // 完了之后  关上开关
				var f=1;             //   表示正负号
				if (now<this.index) {  //  如果当前显示的下标  小于 要单击的下标时，
					f=-1;            //  让它变成负的值。
				}
				animate(imgs[now],{left:f*imgW},800,Tween.Linear);//  如果当前显示的下标(小于)要单击的下标时，就让下一张图片从右往左走
													 //  (负的)
													   //  如果当前显示的下标(大于)要单击的下标时，就让下一张图片从左往右走
													   //  (正的)
				imgs[this.index].style.left=-f*imgW+"px";   //  下一个就是随着负号的变化而变
				animate(imgs[this.index],{left:0},800,Tween.Linear,function(){
					flag=true;                         //  动画执行完之后   将开关 开了。
				});
				lis[now].className='';
				this.className=classname;				
				next=now=this.index;   //  将点击的小标给了 下一个即将显示的下标				
			}
		}

		// 单击右面让它移动
		right.onclick=function(){
       		move();
    	}
    	// 右边为正方向
    	left.onclick=function(){
	       if(now==this.index||!flag){//如果当前的now等于鼠标经过的数或者开关关闭，让他不动，跳出函数
	          return;
	        }
	      flag=false;
	       next--;//上一张图下标  向右走了
	      if(next==-1){//如果到了最后一张的时候
	        next=imgs.length-1;//到了最后一张,下一张图是第一张图
	      }
	      imgs[next].style.left=-imgW+'px';//将下一张图放到左边
	      animate(imgs[now],{left:imgW},800,Tween.Linear,function(){
	              flag=true;
	            });//当前的图往右移
	      animate(imgs[next],{left:0},800,Tween.Linear);//将下一张图移到显示区
	      lis[now].className="";//把上一张对应的小按钮回复样式
	      lis[next].className=classname;//下一张图对应的小按钮变样式
	      now=next;//当前显示的就是下一张的
	    }
	}
//******************************************************************************

var lunLeft=$(".lun-left")[0];
var lis=$("li",lunLeft);
// alert(lis.length)
var hidden=$(".lun-left-a");
// alert(hidden.length)
for (var i = 0; i < lis.length; i++) {
	lis[i].index=i;
	lis[i].onmouseover=function(){
		for (var i = 0; i < hidden.length; i++) {
			hidden[i].style.display="none";
		}
		hidden[this.index].style.display="block";
	}
	lis[i].onmouseout=function(){
		hidden[this.index].style.display="none";
	}
	
};

//******************************************************************************
//  右边 定位
var tab=$(".tab-icon");
// alert(tab.length)
var over=$(".tab-over");
// alert(over.length)
var teshu=$(".teshu");
// alert(teshu.length)
var up=$(".tab-up");
var erweima=$(".erweima")[0];
var right8=$(".ding-right8")[0];
var dingwei=$(".ding-right")[0];
licai(over,tab,47,200);
licai(up,teshu,73,200);

var ch=document.documentElement.clientHeight;
dingwei.style.height=ch+"px";

function licai(over,tab,num,time){
	for (var i = 0; i < over.length; i++) {
		over[i].index=i;
		hover(over[i],function(){
			tab[this.index].style.display="block";
			// tab[this.index].style.left=0;
			animate(tab[this.index],{left:-num},time,Tween.Linear);
		},function(){
			tab[this.index].style.display="none";
			// tab[this.index].style.left="35px";
			animate(tab[this.index],{left:0},time,Tween.Linear);
			// tab[this,index].style.right="0px";
		})
	}
}
	hover(right8,function(){
		erweima.style.display="block";
		animate(erweima,{left:-131},100,Tween.Linear);
	},function(){
		erweima.style.display="none";
		animate(erweima,{left:0},100,Tween.Linear);
	})



//  楼层控制
var floor=$(".f1box");
var leftbtn=$(".fixed-left")[0];
var xiaobtn=$(".fixed-floor");
var leftxians=$(".leftfont");
var ch=document.documentElement.clientWidth;
window.onresize=function(){
	ch=document.documentElement.clientWidth;
	leftbtn.style.left=(ch-1349)/2+"px";
}
window.onscroll=function(){
        var obj=document.documentElement.scrollTop?document.documentElement:document.body;
            var scrollT=obj.scrollTop;
            //  楼层跳转

            if (scrollT>=1000&&scrollT<=7000) {
                leftbtn.style.display="block";
            }else{
                leftbtn.style.display="none";
            }

            for (var i = 0; i < floor.length; i++) {
                floor[i].cun=floor[i].offsetTop;
                if(scrollT>=(floor[i].cun-300)){
                    for (var j = 0; j < xiaobtn.length; j++) {
                        xiaobtn[j].style.background="";
                        leftxians[j].style.display="none";
                    }
                    xiaobtn[i].style.background="#fff";
                    leftxians[i].style.display="block";
                }
            };
            
    // 单击按钮   对应上楼层

            for (var i = 0; i < xiaobtn.length; i++) {
                xiaobtn[i].index=i;
                xiaobtn[i].onclick=function(){
                obj=document.documentElement.scrollTop?document.documentElement:document.body;   
                animate(obj,{scrollTop:floor[this.index].cun},200,Tween.Linear);
                }
                xiaobtn[i].onmouseover=function(){
				   leftxians[this.index].style.display="block";
				}
				xiaobtn[i].onmouseout=function(){
					leftxians[this.index].style.display="none";
				}
			}    
            

		
    //  图片按需加载
    	obj=document.documentElement.scrollTop?document.documentElement:document.body;
        var ch = document.documentElement.clientHeight;
                for (var i = 0; i < floor.length; i++) {
					if (floor[i].offsetTop<obj.scrollTop+ch) {
						var imgs=$("img",floor[i]);
						for (var j = 0; j < imgs.length; j++) {
							imgs[j].src=imgs[j].getAttribute("tupian");
						};
					};
				}



			//  返回顶部
                var top=$(".ding-right9")[0];
                top.onclick=function(){
                    obj=document.documentElement.scrollTop?document.documentElement:document.body;
                    animate(obj,{scrollTop:0},400,Tween.Linear);
                }

        }

    
    var banner=$(".lunbo")[0];
    var bgarr=["#FD3444","#FF9906","#FF524E","#AE48D8","#1C001B","#FA0D15","#3995E0","#ED163F","#022A4D","#A40106","#F0053D"];
    var bannercenter = $(".lun-middle")[0];
  	var img=$("img",bannercenter);
  	var left=$(".btn-left")[0];
  	var right=$(".btn-right")[0];
    // 轮播
    // for (var i = 0; i < inners.length; i++) {
    // 	inners[i].index=i;
    // 	inners[i].onmouseover=function(){
    // 		clearInterval(t1);
    // 		for (var j = 0; j < imgs.length; j++) {
    // 			imgs[j].style.zIndex=2;
    // 			inners[j].style.background="#000";
    // 			inners[j].style.color="#fff";
    //             banner.style.background=bgarr[j];

    // 		}
    //         for (var k = 0; k < rightimg.length; k++) {
    //             rightimg[k].style.zIndex=2;
    //             rightimg[k].style.display="none";
    //         };
    //         rightimg[this.index].style.zIndex=3;
    //         rightimg[this.index].style.display="block";

    // 		imgs[this.index].style.zIndex=3;
    // 		inners[this.index].style.background="#ccc";
    // 		inners[this.index].style.color="#000";
    //         banner.style.background=bgarr[this.index];
    // 	}
    // 	// 手控制之后 继续轮播
    // 	inners[i].onmouseout=function(){
    // 		t1=setInterval(move,2000);
    // 		num=this.index+1;
    // 	}
    // }
    // 自动轮播
    var t1=setInterval(move,2000);
    var num=1;
    function move(){
    	if (num==11) {
    		num=0;
    	};
    	for (var i = 0; i < img.length; i++) {
    		img[i].style.zIndex=2;
    	}
    	img[num].style.zIndex=3;
        banner.style.background=bgarr[num];
    	num++;
    }
    left.onclick=right.onclick=function(){
    	move();
    }



})