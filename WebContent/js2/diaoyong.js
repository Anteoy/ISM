var GLOBAL_MSGTIP = "resources/images/msgtip.png"; // 新消息提醒图片

/**
 * 需要调用的js方法chat.js
 */
//日期格式化
Date.prototype.Format = function (fmt) { //author: meizz 
	var o = {
		"M+": this.getMonth() + 1, //月份 
		"d+": this.getDate(), //日 
		"h+": this.getHours(), //小时 
		"m+": this.getMinutes(), //分 
		"s+": this.getSeconds(), //秒 
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度 
		"S": this.getMilliseconds() //毫秒 
	};
	if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
	if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}

/**
 * 利用时间对消息进行排序的函数 Dates为传入的所有发送时间数组
 * @param dataArray 目标排序数据
 * @param asc 升序， 默认为true
 */
function xiaoxpx(dataArray, asc) {
	asc = (asc == undefined ? true : asc);
	dataArray.sort(function(A,B) {
		var AlongTime = (new Date(A.send_time)).getTime() + (A.newmsg * 1000 * 3600 * 24 * 365);
		var BlongTime = (new Date(B.send_time)).getTime() + (B.newmsg * 1000 * 3600 * 24 * 365);
		return asc ? (AlongTime - BlongTime) : (BlongTime- AlongTime);
	});

}

function addmsgzxr(chatName, time, msg){//在ID为message的div中添加html 咨询人消息
	var html ='<div class="zxrxmsj"><span class="zxrxm">'+chatName+'</span>&nbsp;&nbsp;<span class="zxrfssj">'+time+'</span></div><div class="msg_receive"><div class="arrow"></div><div class="span">'+msg+'</div></div>';
	$("#message").append(html);
}

function addmsgyis(xm, time, msg){//在ID为message的div中添加html	医生消息
	var html ='<div class="ysxmsj"><span class="ysfssj">'+time+'</span>&nbsp;<span class="ysxm">'+xm+'</span></div></br><div class="msg_send"><div class="arrow"></div><div class="span">'+msg+'</div></div>'
	$("#message").append(html);
}

/**
 * 需要调用的js方法zaix.js
 */
//url带参跳转
function chuanctz(src){//src
	/* +pn *///location.href实现客户端页面的跳转 
	window.location.href="chat.html?src="+src+"&ZHBH="+ZHBH;
	//进入读取状态则取消消息提醒闪烁
	parent.chat_interface_readmessage(src);

}

/**
 * 查找用户展示组件元素
 */
function findItem(id) {
	var found = false;
	var arrli = $(".zaixItem");
	for (var q = 0; q < arrli.length; q++) {
		var liid = $(arrli[q]).attr("id")
		if (id == liid) {
			found = arrli[q];
			break;
		}
	}
	return found;
}

/**
 * 插入面板列表
 * suffix true：添加到末尾，  false：添加到开头
 */
function char(msg, suffix) {
	
	suffix = (suffix == undefined ? true : false);
	// 根据ID识别是否是相同的人发来的消息，进而进行不同的处理
	if (msg == null) return;
	var found = findItem(msg.src);

	if (found) { // 找到，修改
		if (!suffix) { // 参数要求元素添加在开头
			found = $(found).remove(); // 删除原来的元素
			$("#zaixList").prepend(found); // 在开头增加新的元素
		}
		$(found).find(".zaix_content").html(msg.content);
		$(found).find(".zaix_time").html(msg.send_time);
		if (msg.newmsg) { // 当newmsg不等于数字0和null时
			$(found).find(".img_newmsg").attr("src", GLOBAL_MSGTIP);
			var xm = $(found).find(".xm").html();
			parent.chat_interface_newmessage(msg.src, xm, msg.content);
			tisy();
		}
	} else { // 未找到，添加

		var xx = [{
			"name": null, 
			"content": msg.content, 
			"src": msg.src, 
			"time": msg.send_time, 
			"newmsg": (msg.newmsg ? GLOBAL_MSGTIP : ""),
			"touxurl": null
		}]; //消息
		if (suffix) { // 加在末尾
			$("#zaixList").append($("#zaixTemplate").tmpl( xx ));
		} else { // 加在开头
			$("#zaixList").prepend($("#zaixTemplate").tmpl( xx ));
		}
		
		if (msg.newmsg) {
			parent.chat_interface_newmessage(msg.src, "用户", msg.content);
			tisy();//新消息声音提醒
		}
		
		$.ajax({
			url: chaxyhUrl,
			type: "post",
			data: {"src": msg.src},
			dataType: "json",
			success: function(response) {
				var touxbh = response.touxbh;
				var touxurl = touxUrl + touxbh;
				var xm = response.xm;
				var found = findItem(response.bh);
				$(found).find(".xm").html(xm);
				$(found).find(".img_head").attr("src", touxurl);
			},
			error: function() {}
		});

	}
}

/**
 * 所有用户插入面板列表
 * suffix true：添加到末尾，  false：添加到开头
 */
function charUserList(bh, suffix,xm,touxbh) {
	
	var touxurl = touxUrl + touxbh;
	suffix = (suffix == undefined ? true : false);
	// 根据ID识别是否是相同的人发来的消息，进而进行不同的处理
	if (bh == null) return;
	var found = findItem(bh);

	if (found) { // 找到，修改
		return;
	} else { // 未找到，添加

		var xx = [{
			"name": xm, 
			"content": null, 
			"src": bh, // TODO
			"time": null, 
			"newmsg": null,
			/*"newmsg": (msg.newmsg ? GLOBAL_MSGTIP : ""),*/
			"touxurl": touxurl
		}]; //消息
		if (suffix) { // 加在末尾
			$("#zaixList").append($("#zaixTemplate").tmpl( xx ));
		} else { // 加在开头
			$("#zaixList").prepend($("#zaixTemplate").tmpl( xx ));
		}
	}
}




//退出函数
function tuic(){
	
}

//载入声音文件 
$(function() {
	$('<audio id="chatAudio"><source src="tiShiYin/6133.wav" type="audio/mpeg"></audio>').appendTo('body');
});

//提示音函数	
function tisy(){
	
	$('#chatAudio')[0].play(); //播放声音
	
}

