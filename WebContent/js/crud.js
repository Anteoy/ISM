/**
 * 人员管理
 */

var url;
function newUser(){
    $('#dlg').dialog('open').dialog('center').dialog('setTitle','New User');
    $('#fm').form('clear');
   // url = 'insertemployee.do';
}
function editUser(){
    var row = $('#dg').datagrid('getSelected');
    if (row){
        $('#dlg').dialog('open').dialog('center').dialog('setTitle','Edit User');
        $('#fm').form('load',row);
      //  url = 'updateemployee.do?id='+row.id;
    }
}
function saveUser(){
	var id = $("#id").val();
	var xm = $("#xm").val();
	var num = $("#num").val();
    $('#fm').form('submit',{
        url: '../insertemployee.do?id='+id+"&xm="+xm+"&num="+num,
        onSubmit: function(){
            return $(this).form('validate');
        },
        success: function(result){
            if (result.isSuccess){
                $.messager.show({
                    title: 'Error',
                    msg: result.errorMsg
                });
            } else {
                $('#dlg').dialog('close');        // close the dialog
                $('#dg').datagrid('reload');    // reload the user data
            }
        }
    });
}
function updateUser(){
	var row = $('#dg').datagrid('getSelected');
	var id = $("#id").val();
	var xm = $("#xm").val();
	var num = $("#num").val();
	
	var bh = row.bh;
	
    $('#fm').form('submit',{
        url: '../updateemployee.do?id='+id+"&xm="+xm+"&num="+num+"&bh="+bh,
        
        onSubmit: function(){
            return $(this).form('validate');
        },
        success: function(result){
            if (result.success/* isSuccess */){
                $.messager.show({
                    title: 'Error',
                    msg: result.errorMsg
                });
            } else {
                $('#dlg').dialog('close');        // close the dialog
                $('#dg').datagrid('reload');    // reload the user data
            }
        }
    });
}


function destroyUser(){
    var row = $('#dg').datagrid('getSelected');
    if (row){
        $.messager.confirm('Confirm','Are you sure you want to destroy this user?',function(r){
            if (r){
            //	$.post(url,[data],[callback],[type])

            	/* 说明：这个AJAX函数跟$.get()参数差不多，多了一个type参数，type为返回的数据类型，可以是html,xml,json等类型，如果我们设置这个参数为：json，那么返回的格式则是json格式的，如果没有设置，就 和$.get()返回的格式一样，都是字符串的。 */
                $.post('../deleteemployee.do',{bh:row.bh},function(result){
                    if (result.success){
                        $('#dg').datagrid('reload');    // reload the user data
                    } else {
                        $.messager.show({    // show error message
                            title: 'Error',
                            msg: result.errorMsg
                        });
                    }
                },'json');
            }
        });
    }
}