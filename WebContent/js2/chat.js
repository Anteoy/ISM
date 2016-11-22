//定义聊天人姓名
var ltxm ;
//定义最后访问时间
var lastTime;
//定义一个用来存放全部消息等待排序的数组
var paixsz = new Array;
//定义消息时间数组
var shijsz = new Array;
var SESSIONID = $$.GetUrlParam("sessionid");
var SRCSTR = $$.GetUrlParam("src");
var SRC = parseInt(SRCSTR);
var ZHBHSTR = $$.GetUrlParam("ZHBH");
var ZHBH = ZHBHSTR;//TODO
var GET_MSG_INTERVAL_ID;

var myDB = {//定义了一个myDB对象
	name:'chattingRecords',
	version:1,
	db:null
};

/* 打开数据库， 并且打开成功后，读取历史消息展示到面板，并启动循环请求服务器。 */
openDB('ISM', 1, function(e) {
	//首先从DB中拿出数据
	fetchStoreByCursorzaix(myDB.db,'liaotjl', function(paixsz) { // 首先获取全部
		// 把数据展示到面板
		xiaoxpx(paixsz);// 按发送时间进行消息排序
		var i =0;
		var last = paixsz.length - 1;
		for (var n = 0; n < paixsz.length; n++) {
			var d = paixsz[n];
			//根据yhbh标识剔除非当前医生消息
			console.info("....."+d.target+"...."+ZHBH);
			if (d.yhbh != ZHBH) continue;
			var id = d.id;
			var srca = d.src;
			var ysfsbh = d.ysfsbh;
			var target = d.target;
			var time = d.send_time;
				var msg = d.content;
			var yhbh = d.yhbh;
			console.info("....."+d.src+"...."+SRC);
			if (d.src == SRC && d.target == ZHBH) {// src从上个界面传过来的聊天人Id
				addmsgzxr(ltxm, time, msg);// 加载咨询人消息到聊天面板
				/* 未读消息，标记已读 */
				if (d.newmsg) {
					d.newmsg = 0;
					addData(myDB.db, 'liaotjl', d);
					parent.chat_interface_readmessage(d.id);//清楚文字闪烁
				}
			}else if (d.target == SRC && d.src == ZHBH) {
				addmsgyis("我", time, msg);// 加载医生消息到聊天面板
			}
		}
		//最后访问时间
		for (var n= paixsz.length-1; n >=0; n--) {
			if(d.target != ZHBH)continue;
			var d = paixsz[n];
			var srca = d.src;
			if (d.src == SRC && d.target == ZHBH) {
				lastTime = d.send_time;
				break;
			}
		}
		zidgdt();	// 如果放入for循环，计算不过来，不能实现 自动滚动条
		$("#zjfwsj").html(lastTime); // 展示详细咨询人具体信息
		GET_MSG_INTERVAL_ID = setInterval(getMsg, 3000);
	});
}); // 降低耦合度和后期维护可读性	一般都会传入onSuccess形参

//详细信息 页面TODO
function showXXXX(src) {
	$.ajax({
		url: chaxyhUrl,
		data: {"src": src},
		type: "POST",
		dataType: "JSON",
		success: function(response) {
			ltxm = response.xm;
			$(".zxrxm").html(ltxm);
			$("#xm").html(response.xm);
			$("#xb").html(response.xb == 0 ? "男" : "女");
			$("#nl").html(response.age);
			$("#sfzh").html(response.sfzh);
			$("#lxdh").html(response.sjh);
		},
		error: function() {
			// TODO 
		}
	});
}

function sendmsg() {
	var msg = $("#sendbox").val();
	
	if(msg.length == 0)
	{
		console.info("message empty");
		return;
	}
	
	var id = parseInt(Math.random()*9000000+1000000);
	var fasjson	=	{
			"id": id,
			"newmsg": 0,//自己的消息为已发送消息
			"src" : ZHBH,//用户发送源
			"yhbh": ZHBH,//用户标识
			"send": "send",//消息为发送标识
			"srcType": 1,//消息来源是医生 还是用户
			"type":  1,
			"target": SRC,//发给谁
			"targetType": 2,//消息发送到的是医生还是用户，1是医生，2是用户
			"content": msg
			}

	$.ajax({
		type: "post",
		url: sendMsgUrl,
		/*data消息需按照规格重新封装*/
		data: fasjson,
		success: function(response) {
			if (response.success != 1) {
				console.info("error：消息发送失败！");
				return;
			}
			var	time	=	new Date().Format("yyyy-MM-dd hh:mm:ss");
			fasjson.send_time = time;
			var username="我";//TODO 登录医生姓名 
			addData(myDB.db, 'liaotjl', fasjson);
			addmsgyis(username, time, msg);//
			zidgdt();

		},
		error: function(){
			console.info("error:AJAX传输错误");
		}
	});
	$("#sendbox").val("");
	$("#sendbox").focus();
	
	
}

function getMsg() {
	var fasjson	=	{
		"type":  "1",
		"sessionid": SESSIONID,
		"target": SRC,
		"zhbh": ZHBH,//通过这个获取新消息，不是SRC
		"targetType": "2",
		"content": "jieshoumsg"
	}
	
	//最终计划
	$.ajax({
		type: "post",
		url: getMsgUrl,//TODO
		data: fasjson,//TODO
		success: function(response) {
			if (response.success == 0) {
				console.info("error：消息请求失败！");
				return;
			} else if (response.success == -1) {
				parent.chat_interface_login_failed();
				clearInterval(GET_MSG_INTERVAL_ID);
				return;
			}
			var data = response.data;
			for (var i = 0; i < data.length; i++) {
				var d = data[i];
				var id = d.id;
				var hqsrc = d.src;//遍历获取到消息的src
				var time = d.send_time;
				var msg = d.content;
				var hqtarget = d.target;
				console.log(d);//控制台打印
				
				/* 只拿出对应src用户编号的消息进行展示 */
				if (hqsrc == SRC && hqtarget == ZHBH) {//TODO
					d.newmsg = 0;
					d.yhbh = ZHBH;//用户编号标识 此标志为全部此用户消息 包括自己发送和接收到的
					addmsgzxr("ltxm", time, msg);//TODO 加载消息到聊天面板
					zidgdt();
					
					tisy();//新消息提示音
				} else {
					d.newmsg = 1; // 不是当前聊天消息， 没有办法读取， 标识未读。
					d.yhbh = ZHBH;
					//从数据库查询消息人姓名并提示消息
					$.ajax({
						url: chaxyhUrl,
						type: "post",
						data: {"src": hqsrc},
						dataType: "json",
						async: false,
						success: function(response) {
							var name = response.xm; 
							parent.chat_interface_newmessage(SRC, name, msg);
							tisy();//新消息提示音
						},
						error: function() {}
					});
					
					
				}
				
				addData(myDB.db, 'liaotjl', d);
				
				//每收到一条消息进行回执传回消息id
				$.post(messageReportUrl, { "id": id });
			}
			
		},
		error: function(){
			console.info("error:服务器返回消息错误");
		}
	});
}

/*
 * 滚动条自动滚动
 * 
 */
function zidgdt() {
	console.log($("#message").height());
	$("#message").scrollTop($("#message").height() * 10);
};

/*回车键敲击发送*/
$(function() {

	//浏览器中Backspace不可用 
	$(document).keydown(function(e){
		var keyEvent;
		if(e.keyCode==8){
			var d=e.srcElement||e.target;
			if(d.tagName.toUpperCase()=='INPUT'||d.tagName.toUpperCase()=='TEXTAREA'){
				keyEvent=d.readOnly||d.disabled;   
			}else{
				keyEvent=true;
			}
		}else{
			keyEvent=false;
		}
		if(keyEvent){
			e.preventDefault();
		}
	});

	/*  */
	$("#content").css({"opacity":"0.7"}).fadeIn('normal');/*opacity不透明度0.7	fadeIn jq淡入淡出效果*/
	$("#sendbox").focus();/*把键盘焦点给予一个窗口*/
	$("#sendbox").keyup(function(e){
		if(e.keyCode == 13) {
			sendmsg();
			//e.preventDefault;
		}
	});
	$("#sendbtn").click(function(e){
		sendmsg();
		//e.preventDefault;
	});
	
	/*  */
	showXXXX(SRC);
	
	/*  */
	zidgdt();
});

