$(function() {
	$("#chat-box-hander").width($(window).width() * 0.15);
	$("#chat-box-hander").css("left", $(window).width() - $("#chat-box-hander").width() - 2);

	$("#chat-box").width($(window).width() * 0.2);
	$("#chat-box").css("left", $(window).width() - $("#chat-box").width() - 2);
	$("#chat-box").height($(window).height() - 29);
	
	$(window).resize(function() {
		$("#chat-box-hander").css("left", $(window).width() - $("#chat-box-hander").width() - 2);
		$("#chat-box").css("left", $(window).width() - $("#chat-box").width() - 2);
		$("#chat-box").height($(window).height() - 29);
	})

	$("#chat-box-hander #status").attr("src", "css/led-offline.png");
	$("#chat-box-hander #notice").html("离线");

	$("#chat-box-hander").show();
	$("#chat-box").show();
});

/** 收到的消息内容 */
var chat_flash_array = new Array();

/** 闪烁消息线程 */
var chat_interval_flash_notice;

/**
 * 清除闪烁效果
 */
function chat_flash_notice_clear() {
	if (chat_interval_flash_notice) {
		clearInterval(chat_interval_flash_notice);
		chat_interval_flash_notice = null;

		var notice = $("#chat-box-hander #notice");
		notice.html("在线 - 无消息");
		if (notice.is(":hidden")) {
			notice.show();
		}
	}
}

/**
 * 提醒文字闪烁
 * @param text
 */
function chat_flash_notice(text) {

	chat_flash_notice_clear();

	$("#chat-box-hander #notice").html(text);
	chat_interval_flash_notice = setInterval(function() {
		var notice = $("#chat-box-hander #notice");
		if (notice.is(":hidden")) {
			notice.show();
		} else {
			notice.hide();
		}
	}, 300);

}

function chat_notify(title, text) {
	if (window.Notification && Notification.permission === 'granted'){
		var notification = new Notification(title, {body: text});
		setTimeout(notification.close.bind(notification), 5000);
	}
}

/**
 * 有新消息接口
 * @param chatid 聊天对象id
 * @param chatname 聊天对象名称
 * @param content 聊天内容
 */
function chat_interface_newmessage(chatid, chatname, content) {
	var found = null;
	for (var i=0; i < chat_flash_array.length; i++) {
		if (chat_flash_array[i].chatid == chatid) {
			found = chat_flash_array[i];
			break;
		}
	}
	if (found) {
		found.content = content;
	} else {
		chat_flash_array.push({chatid: chatid, chatname: chatname, content: content});
	}
	chat_flash_notice("新消息 - " + chatname + ":" + content.substr(0, 10) + "...");
	chat_notify("用户【" + chatname + "】发来新的消息", content);
}

/**
 * 正在读取某个人的某条消息
 * @param chatid 聊天对象id
 */
function chat_interface_readmessage(chatid) {
	var temp = new Array();
	for (var i = 0; i < chat_flash_array.length; i++) {
		if (chat_flash_array[i].chatid != chatid) {
			temp.push(chat_flash_array[i]);
		}
	}
	chat_flash_array = temp;
	if (chat_flash_array.length > 0) {
		var chatname = chat_flash_array[chat_flash_array.length - 1].chatname;
		var content = chat_flash_array[chat_flash_array.length - 1].content;
		chat_flash_notice("新消息 - " + chatname + ":" + content.substr(0, 10) + "...");
	} else if (chat_flash_array.length == 0) {
		chat_flash_notice_clear();
	}
}

/**
 * 登陆中
 */
function chat_interface_login() {
	if ($("#chat-box-hander #status").attr("src") == "css/led-offline.png") {
		$("#chat-box-hander #status").attr("src", "css/led-offline.png");
		$("#chat-box-hander #notice").html("离线 - 登陆中...");
	}
}

/**
 * 登陆成功
 */
function chat_interface_login_success() {
	if (window.Notification) Notification.requestPermission(); // 请求用户确认允许通知
	if ($("#chat-box-hander #status").attr("src") == "css/led-offline.png") {
		$("#chat-box-hander #status").attr("src", "css/led-online.png");
		$("#chat-box-hander #notice").html("在线 - 无消息");
		/* 点击效果, 展示或隐藏面板 */
		$("#chat-box-hander").click(function() {
			var chat_box = $("#chat-box");
			if (chat_box.is(":hidden")) {
				chat_box.show();
			} else {
				chat_box.hide();
			}
		});
	}
}

/**
 * 登陆失败
 */
function chat_interface_login_failed() {
	if ($("#chat-box-hander #status").attr("src") == "css/led-offline.png") {
		$("#chat-box-hander #status").attr("src", "css/led-offline.png");
		$("#chat-box-hander #notice").html("离线 - 登陆失败.");
	}
}
