
/**
 * 屏蔽退格键
 */
function banBackSpace(e){
	try {
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
	} catch (e) {}
	return true;
}
document.onkeypress=banBackSpace;
document.onkeydown=banBackSpace;

/*var isIE = navigator.appVersion.indexOf("MSIE") > -1;
if (isIE) {
	var is40 = parseFloat(navigator.appVersion) >= 4;
	if (!is40) {
		alert("警告: 您的浏览器版本将导致页面无法正常使用\r\nIE浏览器版本太低!\r\n请更换浏览器至IE8或更高版本,或与客服联系.");
	}
} else {
	alert("警告: 您所使用的浏览器将导致页面无法正常使用\r\n不是Micosoft Internet Explorer(IE)浏览器!\r\n请更换浏览器至IE8或更高版本,或与客服联系.");
}*/

$(document).ready(function() {
	$(".table tr:even").css("background","#E7F0F5");
	$(".table tr:odd").css("background","#FFF");
});

// jaxin code
// 名称：呼叫中心弹出
// 使用模块：需要呼叫中心弹出页面
// 描述：禁用关闭按钮，禁用最大，最小按钮
// 参数：FB12,FB23,FB45,
// 返回: FB12
function callcenterwindow(contrl, title, wid, hei, istrue) {
	contrl.window({
		title : title,
		width : wid,
		top : 10,
		modal : true,
		shadow : false,
		resizable : false,
		closed : istrue,
		minimizable : false,
		maximizable : false,
		closable : false,
		height : hei
	});
}

//jaxin code
//名称： 获取url后面的参数
//使用模块：弹出打电话窗口
//描述：得到URL查询的键值,如 ?id=10&name=jaxin 中的ID的值
//参数：id
//返回: 10
function get_url_param(key)
{
  key = key .replace(/\[/g,"%5B");
  key = key .replace(/\]/g,"%5D");
  var query = location.search;
  var reg = "/^.*[\\?|\\&]" + key + "\\=([^\\&]*)/";  
  reg = eval(reg);  
  var ret = query.match(reg);
  if (ret != null) {  
    return decodeURIComponent(ret[1]);  
  } else {
    return "";  
  }   
}



// jaxin code
//
// 名称：初始化全选控件
// 使用模块：适用于所有的模块
// 描述：初始化全选框子.
// 返回: 无返回值
function InitSelectCtrol(CenterCtrol, ChidCtrol) {
	$("." + CenterCtrol + "").click(function() {
		if (this.checked) {
			$("." + ChidCtrol + "").each(function(i) {
				$(this).parent().parent().addClass("selectColor");
				$(this).attr('checked', true);
	
			});
		} else {
			$("." + ChidCtrol + "").each(function(i) {
				$(this).parent().parent().removeClass("selectColor");
				$(this).attr('checked', false);
			});
		}
	});
}
/**
 * 显示load等待框
 * 
 * @param show 不填展示, id为关闭, text为显示文字
 * @author hzw
 */
function showloading(text) {
	var type = typeof(text);
	if (type == 'object') {
		text.window("destroy");
		return;
	}
	var id = "loadding_" + Math.ceil(Math.random() * 100000);
	var msg = text || "正在执行...";
	var load = $('<div id="' + id + '" style="text-align:center;"><p style="vertical-align: middle;"><img src="/../res/themes/images/load.gif" style="vertical-align: middle;" /><span id="loaddialog_msg">' + msg + '</span></p></div>');
	load.appendTo("body");
	load.window({
		title : "请等待",
		width : 250,
		height : 65,
		modal : true,
		shadow : false,
		closed : false,
		draggable : false,
		resizable : false,
		minimizable : false,
		maximizable : false,
		collapsible : false,
		closable : false
	});
	return load;
}

/**
 * 加载错误提示
 */
function ajaxError() {
	$.messager.alert('系统提示', '加载数据失败!请与管理员联系', 'error');
}

/**
 * 解析错误提示
 * @param e
 */
function analyzeError(e) {
	$.messager.alert('系统提示','解析数据错误!请与管理员联系' + (e != undefined && e != null ? '<br />' + e : ''),'error');
}

/**
 * 打开一个窗口(模态窗口)
 * @param url
 * @param iconcls
 * @param w
 * @param h
 */
function openWindow(url, _title, _width, _height, _iconCls, onload) {
	var id = "w_" + Math.ceil(Math.random() * 100000);
	var win = $("<div id='" + id + "'><iframe id='roundIframe' frameborder='0' scrolling='yes' width='100%' height='100%'></iframe></div>");
	$("body").append(win);
	win.window({
		modal : true,
		minimizable: false,
		maximizable: false,
		collapsible: false,
		resizable: false,
		width: _width,
		height: _height,
		iconCls : _iconCls,
		title : _title,
		onClose: function() {
			closeWindow(this);
		}
	});
	url = url + ((url.indexOf('?') >= 0) ? "&" : "?") + "t="+Math.round(Math.random() * 100000);
	win.find("iframe").attr("src", url);
	return win;
}

/**
 * 打开一个窗口(非模态窗口)
 * 不会重新加载页面
 * @param url
 * @param iconcls
 * @param w
 * @param h
 */
function openWindow_fmt(url, _title, _width, _height, _iconCls, onload, _modal) {
	var id = "w_" + Math.ceil(Math.random() * 100000);
	var win = $("<div id='" + id + "'><iframe id='roundIframe' frameborder='0' scrolling='yes' width='100%' height='100%'></iframe></div>");
	$("body").append(win);
	win.window({
		modal : _modal || false,
		minimizable: false,
		maximizable: false,
		collapsible: false,
		closable:true,
		resizable: true,
		width: _width,
		height: _height,
		iconCls : _iconCls,
		title : _title,
		onClose: function() {
			win.window("minimize");
		}
	});
	url = url + ((url.indexOf('?') >= 0) ? "&" : "?") + "t="+Math.round(Math.random() * 100000);
	win.find("iframe").attr("src", url);
	return win;
}


/**
 * 关闭某个窗口
 * @param win
 */
function closeWindow(win) {
	$(win).window("destroy");
}


function GetDate(val){
	if (typeof(val) != 'undefined' && val != null) {
		if (val.length >= 10) {
			val = val.substring(0, 10);
		}
	} else {
		val = "";
	}
	return val;
}


function equal(json)
{ 
     var temp =[]    
      for(i = 0; i < json.length; i++) { 
        if(equalObject(json[i],json[i+1])) { 
            continue; 
      	} 
       temp.push(json[i]); 
      } 
      return temp;
}

function equalObject(o1, o2){ 
	if(typeof o1 != typeof o2)return false; 
	if(o1 == null || o2 == null)return o1 == o2; 
	if(typeof o1 == 'object'){ 
	for(var o in o1){ 
		if(typeof o2[o] == 'undefined')return false; 
		if(!equalObject(o1[o],o2[o]))return false; 
	} 
		return true;  
	}
	else{ 
		return o1 == o2; 
	} 
}

/**
 * 定位树
 * @param treeid 树ID
 * @param node 需定位节点
 * @param divid 需滚动DIV的ID
 * @return
 */
function treelocate(treeID, node, divID) {
	var roots = $('#' + treeID).tree('getRoots');
	for(var i = 0; i < roots.length; i++) {
		if(node.id == roots[i].id) {
			$('#' + divID).scrollTop(i * 18);
		}
	}
}

/*获取时间*/
function getDate(format){
    //获得当前系统的时间
    var myDate = new Date(); 
    var year = myDate.getYear()+"";                                 //获取当前年份 
    var fullyear = myDate.getFullYear().toString();                            //获取完整的年份(4位,1970)  
    var Month = myDate.getMonth()+1;                                //获取当前月份(0-11,0代表1月) 
    var NowDate = myDate.getDate();                                 //获取当前日(1-31) 
    var hours = myDate.getHours();                                  //获取当前小时数(0-23) 
    var minutes = myDate.getMinutes();                              //获取当前分钟数(0-59) 
    var seconds = myDate.getSeconds();                              //获得当前的分秒数
    var getMilisecond = myDate.getMilliseconds();                   //获得当前的毫秒数(0-999)
    if(Month<10){  Month = "0"+Month;  }
    if(NowDate<10){    NowDate = "0"+NowDate;  }
    if(hours<10){  hours = "0"+hours;  }
    if(minutes<10){ minutes = "0"+minutes;   }
    if(seconds<10){    seconds = "0"+seconds;  }
    //获取日期与时间
    if (format == "YY"){
        if(fullyear&&fullyear.length==4){
            return fullyear.substring(2);
        }else{
            return "11";
        }
    }
    if (format == "YYYY"){
        if(fullyear&&fullyear.length==4){
            return fullyear;
        }else{
            return "2011";
        }
    }
    if (format == "YYYY-MM-DD"){       return fullyear+"-"+Month+"-"+NowDate;   }
    if (format == "HH:MI:SS"){   return hours+":"+minutes+":"+seconds ; }
    if (format == "YYYY-MM-DD HH:MI:SS"){   
        return fullyear+"-"+Month+"-"+NowDate +" "+ hours+":"+minutes+":"+seconds  
    }
	if (format == "YYYYMMDDHHMISS"){   
        return fullyear+""+Month+""+NowDate +""+ hours+""+minutes+""+seconds  
    }
}

function months_between(_StartDay, _EndDay) {

	_StartDay = new Date(_StartDay);
	var startYear = _StartDay.getFullYear();
	var startMonth = _StartDay.getMonth() + 1;
	var startDay = _StartDay.getDate(); 
	
	_EndDay = new Date(_EndDay);
	var endYear = _EndDay.getFullYear();
	var endMonth = _EndDay.getMonth() + 1;
	var endDay = _EndDay.getDate();

	var allmonths = (endYear * 12 + endMonth) - (startYear * 12 + startMonth) - 1 + ((endDay + (31 - startDay)) / 31);

	return allmonths;
}

/**
 * 计算年龄 
 * @param 出生日期
 * @param 目标计算日期
 * @returns
 */
function getAge(_BirthDay, _TagDay){
    var returnAge;

    _BirthDay = new Date(_BirthDay);
    var birthYear = _BirthDay.getFullYear();
    var birthMonth = _BirthDay.getMonth() + 1;
    var birthDay = _BirthDay.getDate(); 
    
    _TagDay = new Date(_TagDay);
    var tagYear = _TagDay.getFullYear();
    var tagMonth = _TagDay.getMonth() + 1;
    var tagDay = _TagDay.getDate();
    
    var allmonths = (tagYear * 12 + tagMonth) - (birthYear * 12 + birthMonth) + (tagDay / (31 - birthDay));
    

    if(tagYear == birthYear){
        return Age = 0;
    } else {
        var ageDiff = tagear - birthYear ;
        if (ageDiff > 0){
            if(tagMonth == birthMonth){
                var dayDiff = tagDay - birthDay;
                if(dayDiff < 0){
                    return Age = ageDiff - 1;
                } else {
                    return Age = ageDiff; 
                }
            } else {
                var monthDiff = tagMonth - birthMonth;
                if(monthDiff < 0){
                    return Age = ageDiff - 1;
                } else {
                    return Age = ageDiff ;
                }
            }
        } else {
            return Age = -1;
        }
    }
    return Age;
}

/**
 * 页面上截取字符串长度
 * @param val 要截取的字符串
 * @param len 要截取的长度
 */
function subLen(val, len) {
	if (typeof(val) != 'undefined' && val != null) {
		if (val.length > len) {
			val = val.substring(0, len) + "...";
		}
	} else {
		val = "";
	}
	return val;
}

/**
 * 将秒数转换成时间格式
 * @param val
 */
function timeFormat(val) {
	var hour = null;
	var minute = null;
	var seconds = null;
	if (typeof(val) != 'undefined' && val != null) {
		if (val >= 3600) {
			hour = parseInt(val/3600);
			minute = parseInt(val - 3600) / 60;
			seconds = (val - 3600) % 60;
			val = (hour > 9 ? hour : "0" + hour) + ":" + (minute > 9 ? minute : "0" + minute) + ":" + (seconds > 9 ? seconds : "0" + seconds);
		}
		if (val >= 60) {
			hour = "00:";
			minute = parseInt(val / 60);
			seconds = val % 60;
			val = hour + (minute > 9 ? minute : "0" + minute) + ":" + (seconds > 9 ? seconds : "0" + seconds);
		}
		if (val < 60){
			val = "00:00:" + (val > 9 ? val : "0" + val);
		}
	} else {
		val = "";
	} 
	return val;
}


/**
 * 通用播放录音
 * @param video
 */
function CallPlay(video) {
	$("#videoIframe").attr("src","call/Call/Play?guid="+video+"");
	$("#PlayWindow").window({
		title : '正在播放录音...',
		top : 10,
		modal : true,
		shadow : false,
		resizable : false,
		closed : false,
		minimizable : false,
		maximizable : false,
		closable : true,
		onClose:function()
		{
			$("#videoIframe").attr("src","");
		}
	})
}

function ShowNeirong(title,neirong) {
	$("#neirong").html(neirong);
	$("#neirongWindow").window({
		title : title,
		top : 10,
		modal : false,
		shadow : false,
		resizable : false,
		closed : false,
		minimizable : true,
		maximizable : true,
		closable : true,
		onClose:function() {
			$("#neirong").html("");
		}
	});	
		
}

function showFullWindow(url, title) {
	var fullwindow = $("#fullwindow");
	if (fullwindow.length == 0) {
		fullwindow = "<div id='fullwindow' style='width:100px; height:100px;'><iframe border='0' frameborder='0' height='100%' width='100%'></iframe></div>";
		$(fullwindow).appendTo("body");
	}
	$("#fullwindow").window({
		title: (title || '&nbsp;'),
		left: 0,
		top: 0,
		width: $(window).width(),
		height: $(window).height(),
		close: false,
		modal:false,
		resizable: false,
		draggable: false,
		maximizable: false,
		minimizable: false,
		collapsible: false,
		onClose: function() {
			closeFullWindow();
		}
	});
	url = url + ((url.indexOf('?') >= 0) ? "&" : "?") + "t="+Math.round(Math.random() * 100000);
	$("#fullwindow iframe").attr("src", url);
}

/**
 * 关闭全屏框
 */
function closeFullWindow() {
	if ($("#fullwindow").length > 0) {
		$("#fullwindow iframe").attr("src", "");
		$("#fullwindow").window("destroy");
	}
}

/**
 * 单选checkbox
 * */
function selectOne(obj,name){ 
	var objCheckBox = $("input[name='"+name+"']");
	for(var i=0;i<objCheckBox.length;i++){ 
		//判断复选框集合中的i元素是否为obj，若为否则便是未被选中 
		if (objCheckBox[i] != obj) { 
			objCheckBox[i].checked = false; 
		} else { 
		     //若是，原先为被勾选的变成勾选，反之则变成未勾选 
		     objCheckBox[i].checked = obj.checked; 
		     //或者使用下句，亦可达到同样效果 
		     //objCheckBox[i].checked = true; 
		} 
	} 
} 

/**
 * 拨打电话
 * @param jcxxbh
 * @param dianh
 * @param appid
 * @param leix
 * @param zhuanabh
 */
function Gongwfw_CallOut(jcxxbh,dianh,appid,leix,zhuanabh) {
	if (jcxxbh == null) {
		alert('当前您没有选择人员!');
		return;
	}
	if (dianh == null || dianh == "" || dianh == undefined) {
		alert('电话号码不能为空!');
		return;
	}
	if (dianh.length<8 || dianh.length>12) {
		alert('电话号码不正确!');
		return;
	}
	$.messager.confirm('拨打电话', "确认拨打电话"+dianh+"吗?", function(r){
		if (r){
			parent.$("#winiframe").attr('src', basePath +"/../fwgl/dianhqd/Dianhqd/index?jcxxbh="+jcxxbh+"&dianh="+dianh+"&appid="+appid+"&leix="+leix+"&zhuanabh=" + zhuanabh);
			parent.$("#w").window({
				title : "正在拨打电话......",
				top:100,
				width : 700,
				height : 400,
				modal : false,
				shadow : false,
				resizable : false,
				closed : false,
				minimizable : false,
				maximizable : false,
				closable : true,
				collapsible : false,
				onClose: function() {
					var iwin = $(this).find("iframe")[0];
					try { iwin.contentWindow.phoneClose(); } catch (e) {}
					iwin.src = "";
				}
			});
		};
	});
}


//将传进来的值转换为单个的方法
function setCheckbox(name,value) {
	$("input[name='"+ name +"']").each(function() {
		this.checked = false;
		if (value != null && value != '') {
			var tebzs = value.split(",");
			for ( var i = 0; i < tebzs.length; i++) {
				if (this.value == tebzs[i].trim()) {
					$(this).click();
					break;
				}
			}
		}
	});
}


/**
 * 格式化时间
 * @param format
 * @returns
 */
function formatDate(date, format){
	format = format || "YYYY-MM-DD";
	var year = date.getYear(); // 获取当前年份
	var fullyear = date.getFullYear(); // 获取完整的年份(4位,1970)
	var Month = date.getMonth() + 1; // 获取当前月份(0-11,0代表1月)
	var NowDate = date.getDate(); // 获取当前日(1-31)
	var hours = date.getHours(); // 获取当前小时数(0-23)
	var minutes = date.getMinutes(); // 获取当前分钟数(0-59)
	var seconds = date.getSeconds(); // 获得当前的分秒数
	var getMilisecond = date.getMilliseconds(); // 获得当前的毫秒数(0-999)

	if (Month < 10) {
		Month = "0" + Month;
	}
	if (NowDate < 10) {
		NowDate = "0" + NowDate;
	}
	if (hours < 10) {
		hours = "0" + hours;
	}
	if (minutes < 10) {
		minutes = "0" + minutes;
	}
	if (seconds < 10) {
		seconds = "0" + seconds;
	}

	// 获取日期与时间
	if (format == "YY") {
		fullyear = String(fullyear);
		return fullyear.substring(fullyear.length - 2);
	} else if (format == "YYYY") {
		return fullyear;
	} else if (format == "YYYY-MM-DD") {
		return fullyear + "-" + Month + "-" + NowDate;
	} else if (format == "HH:MI:SS") {
		return hours + ":" + minutes + ":" + seconds;
	} else if (format == "YYYY-MM-DD HH:MI:SS") {
		return fullyear + "-" + Month + "-" + NowDate + " " + hours + ":" + minutes + ":" + seconds
	} else if (format == "YYYYMMDDHHMISS") {
		return fullyear + "" + Month + "" + NowDate + "" + hours + "" + minutes + "" + seconds
	}

}


/**
 * 将字符串格式转换成日期格式
 */
function parseDate(string) {
	var year = string.substring(0, 4);
	var month = string.substring(5, 7) - 1;
	var day = string.substring(8, 10);
	var hour = 0;
	var min = 0;
	var sec = 0;
	if (string.length > 10) {
		hour = string.substring(11, 13);
		min = string.substring(14, 16);
		sec = string.substring(17, 19);
	}
	var date = new Date();
	date.setFullYear(year, month, day);
	date.setHours(hour, min, sec, 0);
	return date;
}


/**
 * 将字符串转换成日期格式的数值
 */
function parseStringDate(obj) {
	var dt = obj.replace(/-/g,"/");
	var date = new Date(dt);
	//计算该日期从1970-01-01距当前日期的秒数
	var seconds = date.getTime();
	return seconds;
}

/**
 * 对数据进行比较大小，找到最小的数据
 */
function comparedate(obj) {
	var k = 0;
	var j = obj[k];
	for(var i = 1; i < obj.length; i++) {
		if (obj[i] < j) {
			j = obj[i];
			k = i;
		}
	}
	return k;
}




/**
 * 比较日期的大小
 */
function compareDate(date1,date2) {
	var nowtime = date1;
	var endTime = date2;
	var nowtimes = nowtime.substring(0, 10).split('-');
	var endTimes = endTime.substring(0, 10).split('-');
	nowtime = nowtimes[1] + '-' + nowtimes[2] + '-' + nowtimes[0];
	endTime = endTimes[1] + '-' + endTimes[2] + '-' + endTimes[0];
	var a = (Date.parse(endTime) - Date.parse(nowtime)) / 60 / 1000;
	return a;
}

