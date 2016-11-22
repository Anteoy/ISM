//根据ID识别是否是相同的人发来的消息，进而进行不同的处理
		if(msg == null) return;
		var found = findItem(msg.src);
		
		if (found) { // 找到，先删除，再添加到最上面
			$(found).remove();
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
					$("#zaixList").prepend( $("#zaixTemplate").tmpl( xx ) );
					if (msg.newmsg) {
						parent.chat_interface_newmessage(msg.src, response.xm, msg.content);
						tisy();//新消息声音提醒
						xiaoxk(xx.name,xx.content);//消息（提示）框
					}
				},
				error: function() {}
			});
		} else { // 未找到，没有可删除的，直接添加
			
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
						xiaoxk(xx.name,xx.content);//消息（提示）框
					}
				},
				error: function() {}
			});
		}