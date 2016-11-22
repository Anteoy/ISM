function validatorcheckbox(obj) {

	var error_div = "<span class='error-div' style='color:red;'>必须选择</span>";
	var $this = $(obj);
	var checkboxs = $this.find("input[type=checkbox]");
	var toggle = $this.attr("toggle"); //用法:填入单个控制所有其他选中项的启用状态开关
	var other = ($this.attr("other")||'').split(","); // 用法:填入要触发的值如(7,8,9)
	var other_tag = ($this.attr("other-tag")||'').split(","); // 用法:填入对应出发的显示组件ID如('tag1','tag2', 'tag3')
	var error_pos = $this.attr("error-pos")||'after'; // 提示位置(before|after|top|bottom)
	var required = $this.attr("required")||false;
	
	var toggle_boxs = checkboxs.filter("[value='" + toggle + "']");
	var validateElement = toggle_boxs||checkboxs.filter(":first");
	
	if (required) {
		validateElement.validatebox({ validType: "checkbox" });
		validateElement.validatebox("validate");
		if (!checkboxs.is(":checked")) {
			if (error_pos == "after") {
				$this.append(error_div);
			} else if (error_pos == "before") {
				$this.prepend(error_div);
			} else if (error_pos == "top") {
				$this.prepend("<div class='error-div'>" + error_div + "</div>");
			} else if (error_pos == "bottom") {
				$this.append("<div class='error-div'>" + error_div + "</div>");
			}
		}
	}
	
	checkboxs.change(function() {
		var box = $(this);
		if (box.val() == toggle) { // 触发开关值
			var other_boxs = checkboxs.not("[value='" + toggle + "']");
			if (box.is(":checked")) {
				var change_box = other_boxs.filter(":checked");
				other_boxs.removeAttr("checked");
				change_box.change();
				other_boxs.attr('disabled',"true");
			} else {
				other_boxs.removeAttr("disabled");
			}
		} else { // 其他值
			var found = $.inArray(box.val(), other);
			if ( found > -1 ) {
				if ( box.is(":checked") ) {
					$("#" + $.trim(other_tag[found])).show();
				} else {
					$("#" + $.trim(other_tag[found])).hide();
				}
			}
		}
		if (required) {
			if (checkboxs.is(":checked")) {
				validateElement.validatebox({ validType: "" });
				validateElement.validatebox("validate");
				checkboxs.css("border", "");
				$this.find(".error-div").remove();
			} else {
				validateElement.validatebox({ validType: "checkbox" });
				validateElement.validatebox("validate");
				checkboxs.css("border", "red 1px solid");
				if ($this.find(".error-div").length == 0) {
					if (error_pos == "after") {
						$this.append(error_div);
					} else if (error_pos == "before") {
						$this.prepend(error_div);
					} else if (error_pos == "top") {
						$this.prepend("<div class='error-div'>" + error_div + "</div>");
					} else if (error_pos == "bottom") {
						$this.append("<div class='error-div'>" + error_div + "</div>");
					}
				}
			}
		}
	});
	
	checkboxs.change();

}

function validatorradiobox(obj) {

	var error_div = "<div class='error-div' style='color:red;'>必须选择</div>";
	var $this = $(obj);
	var radioboxs = $this.find("input[type=radio]");
	var other = ($this.attr("other")||'').split(","); // 用法:填入要触发的值如(7,8,9)
	var other_tag = ($this.attr("other-tag")||'').split(","); // 用法:填入对应出发的显示组件ID如('tag1','tag2', 'tag3')
	var required = $this.attr("required")||false;
	
	if (required) {
		radioboxs.validatebox({
			validType: "radiobox"
		});
		$this.append(error_div);
	}
	
	radioboxs.change(function() {
		var box = $(this);
		
		var found = $.inArray(box.val(), other);
		if ( found > -1 ) {
			if ( box.is(":checked") ) {
				$("#" + $.trim(other_tag[found])).show();
			} else {
				$("#" + $.trim(other_tag[found])).hide();
			}
		}
		
		if (required) {
			if (radioboxs.is(":checked")) {
				radioboxs.validatebox({ validType: "" });
				radioboxs.css("border", "");
				$this.find(".error-div").remove();
			} else {
				radioboxs.validatebox({ validType: "radiobox" });
				radioboxs.css("border", "red 1px solid");
				if ($this.find(".error-div").length == 0) $this.append(error_div);
			}
		}
	});
	
	radioboxs.change();

}

$(function() {
	
	$(".validator-checkbox").each(function() {
		validatorcheckbox($(this));
	});

	$(".validator-radiobox").each(function() {
		validatorradiobox($(this));
	});
	
	$(".bitian_yic").each(function(){
		$(this).click(function(){
			var type = $(this).attr("type");
			var select_txt = $(this).next(".text").text();
			if(type == 'radio') {
				if(select_txt=='异常' || select_txt=='其他' || select_txt=='有'||select_txt=='是' || select_txt=='未闭' || select_txt=='未通过' || select_txt=='患病') {
					$(this).nextAll(".hide_div").css("display","");
					$(this).nextAll(".hide_div").find(":text").validatebox({
						required: true
					});
					$(this).nextAll(".error_pop").html("");
				} else {
					$(this).nextAll(".hide_div").css("display","none").find(":text").val("");
					$(this).nextAll(".hide_div").find(":text").validatebox({
						required: false
					});
					$(this).nextAll(".error_pop").html("");
				}
			}
			
			if(type=='checkbox'){
				$(this).nextAll(".error_pop").html('');
				if(((select_txt=='无症状') || (select_txt=='无')) && $(this).attr("checked")=="checked")
				{
					$(this).siblings("input:checkbox").attr("disabled","disabled").removeAttr("checked");
					$(this).nextAll(".hide_div").css("display","none").find(":text").validatebox({
						required: false
					});
				} else {
					$(this).siblings("input:checkbox").removeAttr("disabled");
					$(this).nextAll(".hide_div").css("display","none").find(":text").validatebox({
						required: false
					});
				}
				$(".bitian_yic").each(function(){
					if($(this).next(".text").text()=='其他') {
						if ($(this).attr("checked")=="checked") {
							$(this).nextAll(".hide_div").css("display","").find(":text").validatebox({
								required: true
							});
						} else {
							$(this).nextAll(".hide_div").css("display","none").find(":text").validatebox({
								required: false
							});
						}
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
			if(select_txt=='无症状' || select_txt == '无'){
				$checkedthis.siblings("input:checkbox").attr("disabled","disabled").removeAttr("checked");
			}
		}
	});
});

function checkReturn() {
	$(".bixuan").each(function(){
		var $checkedthis=$(this).find("input:radio:checked,input:checkbox:checked");
		if($checkedthis.next(".text").text()=='')
		{
			$(this).find(".error_pop").html("必须选择");
		} 
		if($checkedthis.attr("type")=='checkbox'){
			var select_txt=$checkedthis.next(".text").text();
			if(select_txt=='无症状' || select_txt == '无'){
				$checkedthis.siblings("input:checkbox").attr("disabled","disabled").removeAttr("checked");
			}
		}
	});
}

function checkbixuan(contents) {
	var ispass = true;
	$(contents).find(".bixuan,.bixuan1").each(function(){
		var $checkedthis=$(this).find("input:radio:checked,input:checkbox:checked");
		if($checkedthis.length == 0) {
			ispass = false;
		}
	});
	return ispass;
}
