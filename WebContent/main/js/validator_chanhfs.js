$(function(){
	$(".bitian_yic").each(function(){
		$(this).click(function(){
			var type=$(this).attr("type");
			var select_txt=$(this).next(".text").text();
			if(type=='radio'){
				if(select_txt=='异常' || select_txt=='其他' || select_txt=='有' || select_txt=='未闭' || select_txt=='未恢复' || select_txt=='患病'||select_txt=='转诊')
				{
					$(this).nextAll(".hide_div").css("display","");
					$(this).nextAll(".hide_div").find(":text").validatebox({   
						required: true,
					});  
					$(this).nextAll(".error_pop").html('');
				}
				else
				{
					$(this).nextAll(".hide_div").css("display","none").find(":text").val('');
					$(this).nextAll(".hide_div").find(":text").validatebox({
						required: false	,
					});  
					$(this).nextAll(".error_pop").html('');
				}
			}
			
			if(type=='checkbox'){
				$(this).nextAll(".error_pop").html('');
				if((select_txt=='无症状') && $(this).attr("checked")=="checked")
				{
					$(this).siblings("input:checkbox").attr("disabled","disabled").removeAttr("checked");
					$(this).nextAll(".hide_div").css("display","none").validatebox({
						required: false	,
					});
				}
				else
				{
					$(this).siblings("input:checkbox").removeAttr("disabled");
					$(this).nextAll(".hide_div").css("display","none").validatebox({
						required: false	,
					});
				}
				$(".bitian_yic").each(function(){
					if($(this).next(".text").text()=='其他' && $(this).attr("checked")=="checked" ){
						$(this).nextAll(".hide_div").css("display","").find(":text").validatebox({
							required: false	,
						}); 
					} 
				}); 
			} 
		});
	});

	$(".bixuan").each(function(){
		var $checkedthis=$(this).find("input:radio:checked,input:checkbox:checked");
		if($checkedthis.next(".text").text()=='')
		{
			$(this).find(".error_pop").html("必须选择");
		} 
		if($checkedthis.attr("type")=='checkbox'){
			var select_txt=$checkedthis.next(".text").text();
			if(select_txt=='无症状'){
				$checkedthis.siblings("input:checkbox").attr("disabled","disabled").removeAttr("checked");
			}
		}
	});
})