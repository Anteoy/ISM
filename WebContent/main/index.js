var indexcollapse = false;
var win;

/**
 * 屏蔽退格键
 */
function banBackSpace(e){
    var ev = e || window.event;
    var obj = ev.target || ev.srcElement;
    var t = obj.type || obj.getAttribute('type');
    var vReadOnly = obj.readOnly;
    var vDisabled = obj.disabled;
    vReadOnly = (vReadOnly == undefined) ? false : vReadOnly;
    vDisabled = (vDisabled == undefined) ? true : vDisabled;
    var flag1= ev.keyCode == 8 && (t=="password" || t=="text" || t=="textarea")&& (vReadOnly==true || vDisabled==true);
    var flag2= ev.keyCode == 8 && t != "password" && t != "text" && t != "textarea" ;
    if(flag2 || flag1)return false;
}
document.onkeypress=banBackSpace;
document.onkeydown=banBackSpace;

function message() {
	$.ajax({
		url: "message",
		cache:false,
		dataType: "json",
		success: function(data) {
			if (data && data.message) {
				var has = false;
				var title = '系统消息 - ' + data.message.time;
				var msgWins = $(".window .panel-title");
				for ( var i = 0; i < msgWins.length; i++) {
					if ($(msgWins[i]).html() == title) has = true;
				}
				if (!has) {
					var text = data.message.content;
					var ts = text.split(/<br\s*\/*>/);
					var h = (ts.length * 15) + 100;
					$.messager.show({
						title: title,
						msg: text,
						height: h,
						timeout: 0,
						showType: 'slide'
					});
				}
			}
		}
	});
}


function closeNoticeWindow() {
	if($("#notice_check")[0].checked) {
		setCookie("noticeHistory",$("#notice_id").val(),null);
	}
	$("#notice_div").window("close");
}

//添加cookie
function setCookie(c_name,value,expiredays) {
	var exdate=new Date();
	exdate.setDate(exdate.getDate()+expiredays);
	cookieVal=c_name+ "=" +escape(value)+((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
	document.cookie=cookieVal;
}

//获取cookie
function getCookie(c_name) {
	if (document.cookie.length > 0) {
		c_start=document.cookie.indexOf(c_name + "=");
		if (c_start!=-1) { 
			c_start=c_start + c_name.length+1; 
			c_end=document.cookie.indexOf(";",c_start);
			if (c_end==-1) c_end=document.cookie.length;
//document.write(document.cookie.substring(c_start,c_end)+"<br>");
			return unescape(document.cookie.substring(c_start,c_end));
		}
	}
	return "";
}

//修改密码
function editpassword () {
	win = openWindow(basePath + "/system/User/updatepassword", "修改密码", 300,210);
}
/*
 * 获取外部新闻
 */
$(function(){
	$.ajax({
		data: null,
		type: 'post',
		url: '../huqwbxw.do',
		success:(function(response){
			if(response.success == -1){
				console.info("未获取登陆权限  ");
				quanxtz();
				return;
			}
			if(response.success != 1){
				console.info("后台处理出错，获取外部新闻返回值不为1");
				return;
			}
			var xinw = response.data;
			for (var i = 0; i < xinw.length; i++) {
				$("#xinwen").append($("#neibxwl_templ").tmpl( xinw[i] ));
			}
			
		}),
		error:(function(){
			
		})
	});
	
	// 获取内部新闻
	$.ajax({
		data: null,
		type: 'post',
		url: '../huqnbxw.do',
		success:(function(response){
			if(response.success == -1){
				console.info("未获取登陆权限  ");
				quanxtz();
				return;
			}
			if(response.success != 1){
				console.info("后台处理出错，获取外部新闻返回值不为1");
				return;
			}
			var xinw = response.data;
			for (var i = 0; i < xinw.length; i++) {
				$("#xinwen").append($("#neibxwl_templ").tmpl( xinw[i] ));
			}
			
		}),
		error:(function(){
			
		})
	});
});

function chuanctz(url,bh){
	if(url=='' || url== null){
		window.open("../xinw_zs.html?bh="+bh);
	}else{
		window.open("http://"+url);
	}
	 
}
//客户信息跳转
function khxx_tz(){
	window.open("../kehxx/kehxx.html?ZHBH="+ZHBH);
}

//群聊跳转

function qunliaotiaozhuan(){
	var url = "../chat.jsp?DLXM="+DLXM+"&ZHBH="+ZHBH+"&touxbh="+touxbh;
	window.open(url);
}

//设备管理

function shebgl(){
	var target = "shebgl";
	var url = "../verification.jsp?DLXM="+DLXM+"&ZHBH="+ZHBH+"&touxbh="+touxbh+"&target="+target;
	window.open(url);
}

//超级管理员编辑企业简介

function gsjj(){
	var target = "qyjj";
	var url = "../verification.jsp?DLXM="+DLXM+"&ZHBH="+ZHBH+"&touxbh="+touxbh+"&target="+target;
	window.open(url);
}

//内部人员管理跳转

function guanltz(){
	var target = "renygl";
	var url = "../verification.jsp?DLXM="+DLXM+"&ZHBH="+ZHBH+"&touxbh="+touxbh+"&target="+target;
	window.open(url);
}
//公司请假条跳转

function qingjsq(){
	var url = "../qingjia-module/qingjt.html?DLXM="+DLXM+"&ZHBH="+ZHBH+"&touxbh="+touxbh;
	window.open(url);
}

//公司请假条审批

function qingjspi(){
	var target = "qingjsp";
	var url = "../verification.jsp?DLXM="+DLXM+"&ZHBH="+ZHBH+"&touxbh="+touxbh+"&target="+target;
	window.open(url);
}

//外部新闻服务

function wbxw_sc(){
	var url = "../xinw/waibxw_sc.html";
	window.open(url);
}

//内部新闻服务
function nbxw_sc(){
	var url = "../xinw/neibxw_sc.html";
	window.open(url);
}
/*
 * 获取系统公告
 */
$(function(){
	$.ajax({
		data: null,
		type: 'post',
		url: '../huqgg.do',
		success:(function(response){
			if(response.success == -1){
				console.info("未获取登陆权限  ");
				quanxtz();
				return;
			}
			if(response.success != 1){
				console.info("后台处理出错，获取系统公告返回值不为1");
				return;
			}
			var ggxx = response.data;
			$("#ggnr").html();
			$("#ggnr").append(ggxx.ggnr);
			$("#gonggsj").append(ggxx.ggsj);
			
		}),
		error:(function(){
			
		})
	});
});

/*
 * 获取登录人详细信息
 */
$(function(){
	$("#dlyh").html();
	$("#dlyh").append(DLXM);
	$("#yhjs").html();
	$("#yhjs").append(zc);
	$("#zhzxsj").html();
	$("#zhzxsj").append(zuihzxsj);
	if((ZHBH == null) || ZHBH =='' || ZHBH == undefined) 
		{quanxtz();}

});

/*
 * 获取公司简介
 */
$(function(){
	
	$.ajax({
		data: null,
		type: 'post',
		url: '../huqgsjj.do',
		success:(function(response){
			if(response.success == -1){
				console.info("未获取登陆权限  ");
				quanxtz();
				return;
			}
			if(response.success != 1){
				console.info("后台处理出错，获取公司简介返回值不为1");
				return;
			}
			var gsjj = response.data;
			$("#zhut").html();
			$("#gsjj").html();
			$("#zhut").html(gsjj.zhut);
			$("#gsjj").html(gsjj.zhengw);
			
		}),
		error:(function(){
			
		})
	});
	
	
	
});


/**
获取并展示管理层信息
*/
$(function(){
	// huodglxx.do 存在于EmployeeController中
	$.ajax({
		url: "../huodglxx.do",
		type: "post",
		data: {},
		dataType: "json",
		success: function(response) {
			if(response.success == null){
				console.info("服务器返回管理展示层的信息为空 ");
			}
			if(response.success == -1){
				console.info("未获取登陆权限  ");
				quanxtz();
				return;
			}
			var xx = response.data;
			for (var i = 0; i < xx.length; i++) {
			var touxurl = "http://localhost:8091/ImageWeb/touxiang.do?touxbh=" + xx[i].touxbh;
			var ld = [{
				"xm": xx[i].xm, 
				"content": null, 
				"src": xx[i].sfzh, // TODO
				"time": null, 
				"zc" : xx[i].zc,
				"sjh" : xx[i].sjh,
				"newmsg": null,
				"touxurl": touxurl,
				"jj": xx[i].jj
			}]; 
			$("#renygx").append($("#lingdaoTemplate").tmpl( ld ));
			}
		},
		error: function() {
			console.info("ajax请求失败 ");
		}
	});
});

/**
 * 未登陆则无权限处理，跳转到登陆界面
 */
function quanxtz(){
	window.location.href="weidltz.html";
}


//注销函数
function zhux(){
	$.ajax({
		url: "../zhux.do",
		type: "post",
		success: function(response) {
			if(response.success == 1){
				console.info("注销成功");
				alert("注销成功");
				quanxtz();
			}
		},
		error: function() {console.info("注销失败");alert("注销失败");}
	});
	
	window.location.href = "../mainxg/maintest.html";
}

/*
 * 滚动条自动滚动
 * 
 */
function zidgdtfk() {
	console.log($("#yijfk").height());
	$("#yijfk").scrollTop($("#yijfk").height() * 10);
};