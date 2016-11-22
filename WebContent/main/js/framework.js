/*
 * 基础前台封装
 * 胡正卫
 */

var $$ = {};
$$.temp = {};

$$.post = function(_url, _param, _callback, _async) {
	if (typeof(_callback) == "boolean") {
		_async = _callback;
	}
	if (typeof(_param) == "function") {
		_callback = _param;
	}
	var loadname = $$.randomId(10);
	$.ajax({
		type: "post",
		dataType: "json",
		url: _url,
		data: _param,
		timeout: 30000,
		async: (_async != undefined && _async != null) ? _async : true,
		error: function (e) {
			if (e.responseText && (e.responseText.indexOf("登陆") > -1 || e.responseText.indexOf("登录") > -1 || e.responseText.indexOf("login") > -1)) {
				top.loginwin = top.openWindow(verifyUrl + "/minilogin", "您的登陆已失效, 请重新登陆.", 460, 360);
			} else {
				alert("提交数据时发生错误!");
			}
			showloading($$.temp[loadname]);
		},
		beforeSend: function () {
			$$.temp[loadname] = showloading("正在提交数据,请稍后...");
		},
		success: function(data) {
			_callback(data);
			showloading($$.temp[loadname]);
		}
	});
};

$$.get = function(_url, _param, _callback, _async) {
	if (typeof(_callback) == "boolean") {
		_async = _callback;
	}
	if (typeof(_param) == "function") {
		_callback = _param;
	}
	var loadname = $$.randomId(10);
	$.ajax({
		type: "post",
		dataType: "json",
		url: _url,
		data: _param,
		timeout: 550000,
		async: (_async != undefined && _async != null) ? _async : true,
		error: function (e) {
			if (e.responseText && (e.responseText.indexOf("登陆") > -1 || e.responseText.indexOf("登录") > -1 || e.responseText.indexOf("login") > -1)) {
				top.loginwin = top.openWindow(verifyUrl + "/minilogin", "您的登陆已失效, 请重新登陆.", 460, 360);
			} else {
				alert("请求数据时发生错误!");
			}
			showloading($$.temp[loadname]);
		},
		beforeSend: function () {
			$$.temp[loadname] = showloading("正在请求数据,请稍后...");
		},
		success: function(data) {
			_callback(data);
			showloading($$.temp[loadname]);
		}
	});
};

$$.randomId = function(length) {
	var id = "";
	for ( var i = 0; i < length; i++) {
		var uperorlower = Math.round(Math.random());
		if (uperorlower == 1) {
			id += String.fromCharCode(Math.floor(Math.random()*10000%26+65));
		} else {
			id += String.fromCharCode(Math.floor(Math.random()*10000%26+97));
		}
	}
	return id;
};


$$.showLoading = function(text, tag) {
	tag = tag || $("body");
	text = text || '载入中...';
	var loadMask = $("<div class=\"datagrid-mask\" style=\"display:block;\"></div>");
	var loadMsg = $("<div class=\"datagrid-mask-msg\" style=\"display:block;\">" + text + "</div>");
	loadMask.appendTo(tag);
	loadMsg.appendTo(tag);
	loadMsg.css({top : tag.position().top + tag.height()/2 - loadMsg.height() });
	loadMsg.css({left : tag.position().left + tag.width()/2 - loadMsg.width() });

	var _t;
	
	var _top = 0;
	_t = parseInt(tag.css("padding-top").replace("px",""));
	if (!isNaN(_t)) { _top += _t; }
	_t = parseInt(tag.css("margin-top").replace("px",""));
	if (!isNaN(_t)) { _top += _t; }
	
	var _left = 0;
	_t = parseInt(tag.css("margin-left").replace("px",""));
	if (!isNaN(_t)) { _left += _t; }
	_t = parseInt(tag.css("margin-left").replace("px",""));
	if (!isNaN(_t)) { _left += _t; }

	loadMask.height(tag.height());
	loadMask.width(tag.width());
	loadMask.css({top : tag.position().top + _top });
	loadMask.css({left : tag.position().left + _left });
	
	return [loadMask, loadMsg];
};

$$.closeLoading = function(loading) {
	try {
		loading[0].remove();
		loading[1].remove();
	} catch (e) {};
};


$$.cookie = function(name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        var path = options.path ? '; path=' + options.path : '';
        var domain = options.domain ? '; domain=' + options.domain : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else { // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};

$$.getCheckedVal = function(name) {
	var result = "";
	$("input[name=" + name + "]:checked").each(function() {
		result += "," + $(this).val();
	});
	result = result.substring(1);
	return result;
}