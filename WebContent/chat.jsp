<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
<title>Chat</title>
<!--设置渲染引擎360浏览器 网站site-->
<meta name="renderer" content="webkit">
<meta http-equiv="Cache-Control" content="no-siteapp" />
<link rel="alternate icon" href="assets/i/favicon.png">
<link rel="stylesheet" href="assets/css/amazeui.min.css">
<link rel="stylesheet" href="assets/css/app.css">
<link href="umeditor1_2_2/themes/default/css/umeditor.css" rel="stylesheet">
<script type="text/javascript" src="jquery/jquery.min.js"></script>
<script type="text/javascript" src="js2/framework.js"></script>
<script>
	var DLXM = $$.GetUrlParam("DLXM");
	var ZHBH= $$.GetUrlParam("ZHBH");
	var touxbh = $$.GetUrlParam("touxbh");
</script>
<style>
	.title {
		text-align: center;
	}
	.chat-content-container {
		height: 29rem;
		overflow-y: scroll;
		border: 1px solid silver;
	}
</style>
</head>
<body>
	<div class="title">
		<div class="am-g am-g-fixed">
			<div class="am-u-sm-12">
			<h1 class="am-text-primary">测试聊天室</h1>
			</div>
		</div>
	</div>
	<div class="chat-content">
		<div class="am-g am-g-fixed chat-content-container">
			<div class="am-u-sm-12">
				<ul id="message-list" class="am-comments-list am-comments-list-flip"></ul>
			</div>
		</div>
	</div>
	<!-- chat content start -->
	<!-- message input start -->
	<div class="message-input am-margin-top">
		<div class="am-g am-g-fixed">
			<div class="am-u-sm-12">
				<form class="am-form">
					<div class="am-form-group">
					<script type="text/plain" id="myEditor" style="width: 100%;height: 8rem;"></script>
					</div>
				</form>
			</div>
		</div>
		<div class="am-g am-g-fixed am-margin-top">
			<div class="am-u-sm-6">
				<div id="message-input-nickname" class="am-input-group am-input-group-primary">
					<span class="am-input-group-label"><i class="am-icon-user"></i></span>
					<input id="nickname" type="text" class="am-form-field" placeholder="Please enter nickname"/>
				</div>
			</div>
			<div class="am-u-sm-6">
				<button id="send" type="button" class="am-btn am-btn-primary">
				<i class="am-icon-send"></i> 发送
				</button>
			</div>
		</div>
	</div>
  <!-- message input end -->
  <!--[if (gte IE 9)|!(IE)]><!-->
  <script src="assets/js/jquery.min.js"></script>
  <!--<![endif]-->
  <!--[if lte IE 8 ]>
  <script src="http://libs.baidu.com/jquery/1.11.1/jquery.min.js"></script>
  <![endif]-->
  <!-- umeditor1_2_2 js -->
  <script charset="utf-8" src="umeditor1_2_2/umeditor.config.js"></script>
  <script charset="utf-8" src="umeditor1_2_2/umeditor.min.js"></script>
  <script src="umeditor1_2_2/lang/zh-cn/zh-cn.js"></script>
  <script>
    $(function() {
      // 初始化消息输入框
      var um = UM.getEditor('myEditor');
      // 使昵称框获取焦点
      $('#nickname')[0].focus();
    });
  </script>
  <!-- 前后台交互js -->
<script>

	var um = UM.getEditor('myEditor');
	$('#nickname')[0].focus();
	//新建WebSocket对象，最后的/websocket对应服务器端的@ServerEndpoint("/websocket")
	var socket = new WebSocket('ws://${pageContext.request.getServerName()}:${pageContext.request.getServerPort()}${pageContext.request.contextPath}/websocket');
	
	socket.onopen = function(event) {
		 $.ajax({
			type: "post",
			url: "xiaoxjl.do",
			data: {
			},
			success: function(response) {
				if (response.success == 0) {
					console.info(" error：获取初始消息记录失败！请求失败！");
					return;
				}
				var data = response.data;
				for (var i = data.length - 1; i >= 0; i--) {
					if((data[i].src) == ZHBH){
						data[i].isSelf = true;
					}else{
						data[i].isSelf = false;
					}
					console.info(data[i]);
					addMessage(data[i]);
				}
			},
			error: function() {
				console.info("error，ajax请求失败");
			}
		}); 
	};
	
	
	
	
	// 处理服务器端发送的数据
	socket.onmessage = function(event) {
		addMessage(event.data,"1");
	};
	// 点击Send按钮时的操作
	$('#send').on('click', function() {
	  var nickname = DLXM;// $('#nickname').val()
	  if (!um.hasContents()) {	// 判断消息输入框是否为空
	    // 消息输入框获取焦点
	    um.focus();
	    // 添加抖动效果
	    $('.edui-container').addClass('am-animation-shake');
	    setTimeout("$('.edui-container').removeClass('am-animation-shake')", 1000);
	  } else if (nickname == '') {	// 判断昵称框是否为空
	    //昵称框获取焦点
	    $('#nickname')[0].focus();
	    // 添加抖动效果
	    $('#message-input-nickname').addClass('am-animation-shake');
	    setTimeout("$('#message-input-nickname').removeClass('am-animation-shake')", 1000);
	  } else {
	    // 发送消息
	    socket.send(JSON.stringify({
	      content : um.getContent(),
	      nickname : DLXM,
	      ZHBH : ZHBH,
	      touxbh : touxbh
	    }));
	   }
	     var xiaox = {
	    		content : um.getContent(),
	    		nickname : DLXM,
	    		ZHBH : ZHBH,
	    		touxbh : touxbh
	    } 
	    //利用ajax存入数据库
	     $.ajax({
	    	data: xiaox,
	    	type: "post",
	    	url: "xiaoxbc.do",
	    	success: function(response) {
				if (response.success == 0) {
					console.info("  error：消息存入数据库失败！请求上传后台失败！ ");
					return;
				}
			},
			error: function() {
				console.info("error，ajax请求失败");
			}
	    }); 
	    // 清空消息输入框
	    um.setContent('');
	    // 消息输入框获取焦点
	    um.focus();
	  
	});
	// 把消息添加到聊天内容中
	function addMessage(message,flag) {
		flag = (flag == undefined? false : true);
		if(flag == true){
	  message = JSON.parse(message);
	  var messageItem = '<li class="am-comment '
	      + (message.isSelf ? 'am-comment-flip' : 'am-comment')
	      + '">'
	      + '<a href="javascript:void(0)" ><img src="http://localhost:8091/ImageWeb/touxiang.do?touxbh='
	      + message.touxbh
	      + '" alt="" class="am-comment-avatar" width="48" height="48"/></a>'
	      + '<div class="am-comment-main"><header class="am-comment-hd"><div class="am-comment-meta">'
	      + '<a href="javascript:void(0)" class="am-comment-author">'
	      + message.nickname + '</a> <time>' + message.date
	      + '</time></div></header>'
	      + '<div class="am-comment-bd">' + message.content
	      + '</div></div></li>';
	  $(messageItem).appendTo('#message-list');
	  zidgdt();
		}else{
			 var messageItem = '<li class="am-comment '
			      + (message.isSelf ? 'am-comment-flip' : 'am-comment')
			      + '">'
			      + '<a href="javascript:void(0)" ><img src="http://localhost:8091/ImageWeb/touxiang.do?touxbh='
			      + message.touxbh
			      + '" alt="" class="am-comment-avatar" width="48" height="48"/></a>'
			      + '<div class="am-comment-main"><header class="am-comment-hd"><div class="am-comment-meta">'
			      + '<a href="javascript:void(0)" class="am-comment-author">'
			      + message.xm + '</a> <time>' + message.send_time
			      + '</time></div></header>'
			      + '<div class="am-comment-bd">' + message.content
			      + '</div></div></li>';
			  $(messageItem).appendTo('#message-list');
			  zidgdt();
		}
	}


	//监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
	window.onbeforeunload = function(){
		websocket.close();
	}
	
/*
 * 滚动条自动滚动
 * 
 */
function zidgdt() {
	console.log($(".chat-content-container").height());
	$(".chat-content-container").scrollTop($("#message-list").height() * 10);
};
</script>
</body>
</html>