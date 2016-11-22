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

function getUrlParam(href) {
	var param = []; 
	var intLen = href.length; //获取url的长度  
	var offset = href.indexOf("?"); //设置参数字符串开始的位置  
	var strKeyValue = href.substr(offset, intLen); //取出参数字符串 这里会获得类似“id=1”这样的字符串  
	var arrParam = strKeyValue.split("&"); //对获得的参数字符串按照“=”进行分割  
	for (var i = 0; i < arrParam.length; i++) {
		param[i] = decodeURIComponent(arrParam[i].split("=")[1]).split("#")[0];
	}
	return param;
}


function trim(txt) { 
	 var newtxt = "";
	 for(bbbbb=0;bbbbb<txt.length;bbbbb++)
	 {
	  s = txt.substring(bbbbb,bbbbb+1);
	  if(s != " ")
	  {
	   newtxt = newtxt + s;
	  }
	 }
	 return newtxt;

	} 

