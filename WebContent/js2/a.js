// 根据ID识别是否是相同的人发来的消息，进而进行不同的处理
		if (msg == null) return;
		var found = findItem(msg.src);
		
		if (found) { // 找到，修改
			$(found).find(".zaix_content").html(msg.content);
			$(found).find(".zaix_time").html(msg.send_time);
			if (msg.newmsg) {//当newmsg不等于数字0和null时
				$(found).find(".img_newmsg").attr("src", GLOBAL_MSGTIP);
				var xm = $(found).find(".xm").html();
				parent.chat_interface_newmessage(msg.src, xm, msg.content);
				tisy();
				xiaoxk(xm,msg.content);
			}
		} else { // 未找到，添加
			
			$.ajax({
				url: chaxyhUrl,
				type: "post",
				data: {"src": msg.src},
				dataType: "json",
				async: false,
				success: function(response) {
					var touxbh = response.touxbh;
					var touxurl = touxUrl+touxbh;
					var xx = [{ 
						"name": response.xm, 
						"content": msg.content, 
						"src": msg.src, 
						"time": msg.send_time, 
						"newmsg": (msg.newmsg ? GLOBAL_MSGTIP : ""),
						"touxurl": touxurl
					}]; //消息
					$("#zaixTemplate").tmpl( xx ).appendTo( "#zaixList" );
					if (msg.newmsg) {
						parent.chat_interface_newmessage(msg.src, response.xm, msg.content);
						tisy();//新消息声音提醒
						xiaoxk(xx.name,xx.content);
					}
				},
				error: function() {}
			});
		}