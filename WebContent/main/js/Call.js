var i=0; 
var j=0; 
var k=0; 
var time=0;
var tipId;  
var sTime;

function setTimer() 
{ 
	i++; 
	if(i>=60) 
	{ 
	j++; 
	i=0; 
	} 
	if(j>=60) 
	{ 
	k++; 
	j=0; 
 } 
    $("#callstate").html("通话中:" +px(k)+":"+px(j)+":"+px(i));
} 

function px(strx) 
{
 if (strx.toString().length == 1) 
    strx = '0' + "" + strx;
 return strx;
}

function CallLoopState(){ 
	  sTime = 9999999999999999999;   
	  tipId = window.setInterval("tellstate()",1000);  
}

function tellstate()
{ 
//parent.GetCallSate()
	  switch(parent.getCallSate()){
		  case -1:$("#callstate").empty();$("#callstate").html("呼叫系统初始化出错！");break ; 
		  case 0:$("#callstate").empty();$("#callstate").html("呼叫系统登陆失败！");break ;
		  case 1:$("#callstate").empty();$("#callstate").html("等待连接...");break ;  
		  case 2:$("#callstate").empty();$("#callstate").html("连接中,请等待...");break ;  
		  case 3:$("#callstate").empty();$("#callstate").html("对方正在振铃...");break ;	            	    
		  case 4:time=time+1;$("#callstate").empty();  
		   setTimer();   
		  break ;  	  
		  case 6:$("#callstate").empty();$("#callstate").html("已挂机！");	  
		  break ;
	  }
}