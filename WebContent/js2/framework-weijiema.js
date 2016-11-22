var $$ = {};
$$.CODE = {};
$$.CODE.bingz = {};
$$.CODE.bingz["1"] = "儿童保健";
$$.CODE.bingz["2"] = "孕妇保健";
$$.CODE.bingz["3"] = "产妇保健";

$$.CODE.zhuangt = {};
$$.CODE.zhuangt["0"] = "停用";
$$.CODE.zhuangt["1"] = "启用";

$$.CODE.shijdw = {};
$$.CODE.shijdw["1"] = "天";
$$.CODE.shijdw["2"] = "周";
$$.CODE.shijdw["3"] = "月";

/*url跳转带参数*/
$$.GetUrlParam = function(key) {
	var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg);  //匹配目标参数
	if (r != null) return unescape(r[2]); return null; //返回参数值
};

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