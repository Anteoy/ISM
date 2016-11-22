function jui_datepicker() {
	$(".jui-datepicker").datepicker({dateFormat: "yy-mm-dd", changeMonth: true, changeYear: true});
}
$(function() {
	jui_datepicker();
});