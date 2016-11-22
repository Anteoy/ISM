var $$ = {};
$$.CODE = {};
//$$.CODE.bingz = {};
//$$.CODE.bingz["1"] = "儿童保健";
//$$.CODE.bingz["2"] = "孕妇保健";
//$$.CODE.bingz["3"] = "产妇保健";
//
//$$.CODE.zhuangt = {};
//$$.CODE.zhuangt["0"] = "停用";
//$$.CODE.zhuangt["1"] = "启用";
//
//$$.CODE.shijdw = {};
//$$.CODE.shijdw["1"] = "天";
//$$.CODE.shijdw["2"] = "周";
//$$.CODE.shijdw["3"] = "月";

/**
 * 从链接上获取参数
 * @param key
 * @return value
 */
$$.GetUrlParam = function(key) {
	var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
	var href = decodeURIComponent(window.location.search);
	var r = href.substr(1).match(reg);  //匹配目标参数
	if (r != null) return unescape(r[2]); return null; //返回参数值
};

/**
 * 从form中获取参数对象数组
 * @param formDom
 * @return list
 */
$$.GetFormParam = function(container) {
	var param = []; 
	var index = 0;
	$(container).find("select,input,textarea").each(function(i, e) {
		e = $(e);
		if ( (e.attr("type") == "checked" || e.attr("type") == "radio")) {
			if (e.is(":checked")) {
				var name = e.attr("name");
				var val = e.val();
			}
		} else {
			var name = e.attr("name");
			var val = e.val();
		}
		param[index] = {name: name, value: val};
		index++;
	});
	return param;
}

$$.loading = function() {
	if ($("#__loading__mask__").length == 0) {
		$("<div id='__loading__mask__' class=\"datagrid-mask\"></div>").css({display:"block",width:"100%",height:$(window).height()}).appendTo("body");
		$("<div id='__loading__msg__' class=\"datagrid-mask-msg\"></div>").html("正在处理，请稍候。。。").appendTo("body").css({display:"block",left:($(document.body).outerWidth(true) - 190) / 2,top:($(window).height() - 45) / 2});
	}
}

$$.closeloading = function() {
	$("#__loading__mask__").remove();
	$("#__loading__msg__").remove();            
}
