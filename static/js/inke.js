


$(document).ready(function() {
   //提交工单页面默认加载维护工单
   if (window.location.pathname == '/job/list=commit_list/'){
	    var contacts_data = contacts_admin();
		op_contacts = contacts_data['op']
		test_contacts = contacts_data['test']
		owner_contacts = contacts_data['owner']

        var op_html = select_format(op_contacts,'op_abutment') 
        var test_html = select_format(test_contacts,'test_abutment') 
        var sure_html = select_format(owner_contacts,'gongdan_sure') 

        $(".work_comfirm").empty();
        $(".op_comfirm").empty();
        $(".work_comfirm").html(sure_html)
        $(".op_comfirm").html(op_html)
        weihu();   
       }
   
    $("#job_type_change").change(function(){
        var text = $('#job_type_change option:selected').val();
        $("#list_type").empty();
        /* 1:维护 2:监控, 3:资源申请, 4:项目上线 */
        if (text==4){shangxian(test_html)};
        if (text==3){resoure_add()};
        if (text==1){weihu()};
        if (text==2){monitors()};
    });
   
   
    var ONline_NAME = function service_name() {
        var value = "";
        $.ajax({
            type: "GET",
            url: "/api/server_name/",
            async: false,
            success: function(result) {
    
                var s_name = result['ret'];
    
                var start_str = '<select class="form-control" id="select_online_service">';
                var end_str = '</select>';
                for (var i = 0; i < s_name.length; i++) {
                    var mid_str = '<option>' + s_name[i] + '</option>' + mid_str
    
                }
    
                var data = start_str + mid_str + end_str ;
                value = data;
            }
        });
        return value;
    }
    
	//联系人加载
    function contacts_admin(){
		var tmp_data = ''
		$.ajax({
            type: "GET",
			async: false,
            url: "/api/contacts_admin/",
            success: function(result) {
				tmp_data = result
            }
        });
		return tmp_data
	}

   //联系人html格式化
    function select_format(data,id){
        var tmp_html = '<select class="form-control" id="'+id+'">';
        for (var i = 0; i < data.length; i++) {
            tmp_html += '<option value='+data[i][0]+'>' + data[i][1] + '</option>'
            }
        tmp_html += '</select>';
		return tmp_html
	}
		
    function shangxian(test_html){

       var  online_server_name = ONline_NAME();

       var contacts = ''

	   contacts += '<tr><td>测试执行:</td><td>'+test_html+'</td></tr>';

       var add_context = contacts +
						 '<tr><td>上线事由:</td><td> <input type="text" class="form-control" id="online_reason"> </td></tr> ' +  
                         '<tr><td>服务名称:</td><td> '+ online_server_name  +' </td></tr> ' +
                         '<tr><td>更新版本:</td><td> <input type="text" class="form-control" id="update_version"> </td></tr> ' +
                         '<tr><td>CI名称:</td><td> <input type="text" class="form-control" id="CI_name"> </td></tr> ' +
                         '<tr><td>上线时间:</td><td> <input type="text" class="form-control" id="online_time"> </td></tr> ' +
                         '<tr><td>回滚方案:</td><td> <input type="text" class="form-control" id="rollback_way"> </td></tr> ' +
                         '<tr><td>回滚版本:</td><td> <input type="text" class="form-control" id="rollback_version"> </td></tr> ' +
                         '<tr><td>备注:</td><td>  <textarea class="form-control" rows="3" id="online_lable"></textarea> </td></tr> ' 
   
       $("#list_type").append(add_context); 
        
        }
   
   
   
   
    function resoure_add(){

       var contacts = ''
       var add_context = contacts +
						 '<tr><td>申请事由:</td><td> <input type="text" class="form-control" id="resource_reason"> </td></tr> ' +  
                         '<tr><td>资源类型:</td><td> <input type="text" class="form-control" id="resource_type"> </td></tr> ' +  
                         '<tr><td>资源配置:</td><td> <input type="text" class="form-control" id="resource_config"> </td></tr> ' +
                         '<tr><td>带宽:</td><td> <input type="text" class="form-control" id="resource_bandwidth"> </td></tr> '  +
                         '<tr><td>开始时间:</td><td> <input type="text" class="form-control" id="resource_start_time"> </td></tr> ' + 
                         '<tr><td>备注:</td><td> <textarea class="form-control" rows="3"  id="resource_remarks"></textarea> </td></tr> ' 
       $("#list_type").append(add_context); 
        }
   
    function weihu(){

       var contacts = ''
       var add_context = contacts +
						 '<tr><td>维护事由:</td><td> <input type="text" class="form-control" id="weihu_reason"> </td></tr> ' +  
                         '<tr><td>维护内容:</td><td> <input type="text" class="form-control" id="weihu_content"> </td></tr> ' +  
                         '<tr><td>操作详情:</td><td> <textarea class="form-control" rows="3" id="weihu_detail"></textarea> </td></tr> ' +  
                         '<tr><td>备注:</td><td> <textarea class="form-control" rows="3" id="weihu_lable"> </textarea>  </td></tr> ' 
       $("#list_type").append(add_context); 
        }
   
   
    function monitors(){
       var contacts = ''
       var add_context = contacts+
						'<tr><td>监控事由:</td><td> <input type="text" class="form-control" id="monitors_reason"> </td></tr> ' +  
                         '<tr><td>监控内容:</td><td> <textarea class="form-control" rows="3" id="monitors_content"></textarea>  </td></tr> ' +  
                         '<tr><td>是否报警:</td><td> <select class="form-control"  id="monitors_allow"> <option value="0">是</option> <option value="1">否</option>  </select> </td></tr> ' +  
                         '<tr><td>报警阈值:</td><td> <input type="text" class="form-control" id="monitors_yuzhi"> </td></tr> ' +  
                         '<tr><td>报警人员名单:</td><td> <input type="text" class="form-control" id="monitors_people"> </td></tr>'  +
                         '<tr><td>备注:</td><td> <textarea class="form-control" rows="3" id="monitors_lable"></textarea> </td></tr> ' 
       $("#list_type").append(add_context); 
        }
   
   //////////////////////////////////////////////////////////////////
    $("#project_btn").click(function(){
        var project_name   =   $("#project_name").val();
        var project_dev    =   $("#project_dev").val();
        var project_op     =   $("#project_op").val();
        var project_server =   $("#project_server").val();
        var project_lable  =   $("#project_lable").val();
        var project_idc    =   $("#project_idc option:selected").val();
   
           if (project_name == "") {
               alert("项目名称不能为空");
           } else {
               $.post("/service_line/action=make/", {
                   project_name: project_name,
                   project_dev: project_dev,
                   project_op: project_op,
                   project_server: project_server,
                   project_lable: project_lable,
                   project_idc: project_idc
               },
               function(data) {
                       alert(data);
                       window.location.href = "/service_line/action=info/";
               });
           };
   
   
    });
   //////////////////////////////////////////////////////////////////
   
   
    $("#gongdan_commit").click(function() {
        var text = $('#job_type_change option:selected').val();
        var gongdan_id =    $("#gongdan_id").html();
        var gongdan_mingchen = $("#gongdan_mingchen").val();
        var gongdan_sure = $("#gongdan_sure").val();
        var gongdan_critical = $("#gongdan_critical").val();
        var op_abutment =   $("#op_abutment").val();
        //待用户模块写好以后，此处需要更改
        var gongdan_sponsor = 'admin';
    
        if (gongdan_mingchen == "") {
            alert("请填写工单名称!!!!");
            return;
        };
    
    
        if (gongdan_mingchen.length > 20 ) {
            alert("工单名字长度不能超过20个字符!!!!");
            return;
        };


        var msg = "确定要提交吗?";
        if (confirm(msg) == true) {
            /* 1:维护 2:监控, 3:资源申请, 4:项目上线 */
            /*监控工单提交*/
            if (text == 2) {
                var monitors_reason = $("#monitors_reason").val();
                var monitors_content = $("#monitors_content").val();
                var monitors_allow = $("#monitors_allow option:selected").val();
                var monitors_yuzhi = $("#monitors_yuzhi").val();
                var monitors_people = $("#monitors_people").val();
                var monitors_lable = $("#monitors_lable").val();
    
                if (monitors_reason == "") {
                    alert("监控内容不能为空");
                } else {
                    $.post("/job/list=commit_list/", {
                        gongdan_id: gongdan_id,
                        gongdan_mingchen: gongdan_mingchen,
                        gongdan_sure: gongdan_sure,
                        gongdan_critical: gongdan_critical,
                        gongdan_type: text,
                        gongdan_sponsor: gongdan_sponsor,
                        op_abutment: op_abutment,
                        monitors_reason: monitors_reason,
                        monitors_content: monitors_content,
                        monitors_allow: monitors_allow,
                        monitors_yuzhi: monitors_yuzhi,
                        monitors_people: monitors_people,
                        monitors_lable: monitors_lable,
                    },
                    function(data) {
                        alert(data);
                        window.location.href = "/job/list=my_list/";
                    });
                };
    
            };
    
            /*维护工单提交*/
            if (text == 1) {
                var weihu_reason = $("#weihu_reason").val();
    
                if (weihu_reason == "") {
                    alert("维内容不能为空");
                } else {
                    $.post("/job/list=commit_list/", {
                        gongdan_id: gongdan_id,
                        gongdan_mingchen: gongdan_mingchen,
                        gongdan_sure: gongdan_sure,
                        gongdan_critical: gongdan_critical,
                        gongdan_type: text,
                        gongdan_sponsor: gongdan_sponsor,
                        op_abutment: op_abutment,
                        weihu_reason: $("#weihu_reason").val(),
                        weihu_content: $("#weihu_content").val(),
                        weihu_detail: $("#weihu_detail").val(),
                        weihu_lable: $("#weihu_lable").val(),
                    },
                    function(data) {
                        alert(data);
                        window.location.href = "/job/list=my_list/";
                    });
                };
            };
    
            /*资源申请工单提交*/
            if (text == 3) {
                var resource_reason = $("#resource_reason").val();
    
                if (resource_reason == "") {
                    alert("资源申请原因不能为空");
                } else {
                    $.post("/job/list=commit_list/", {
                        gongdan_id: gongdan_id,
                        gongdan_mingchen: gongdan_mingchen,
                        gongdan_sure: gongdan_sure,
                        gongdan_critical: gongdan_critical,
                        gongdan_type: text,
                        gongdan_sponsor: gongdan_sponsor,
                        op_abutment: op_abutment,
                        resource_reason: $("#resource_reason").val(),
                        resource_type: $("#resource_type").val(),
                        resource_config: $("#resource_config").val(),
                        resource_bandwidth: $("#resource_bandwidth").val(),
                        op_abutment: op_abutment,
                        resource_start_time: $("#resource_start_time").val(),
                        resource_remarks: $("#resource_start_time").val(),
                    },
                    function(data) {
                        alert(data);
                        window.location.href = "/job/list=my_list/";
                    });
                };
            };
    
            /*项目上线工单提交*/
            if (text == 4) {
                var online_reason = $("#online_reason").val();
    
                if (online_reason == "") {
                    alert("上线事由不能为空");
                } else {
                    $.post("/job/list=commit_list/", {
                        gongdan_id: gongdan_id,
                        gongdan_mingchen: gongdan_mingchen,
                        gongdan_sure: gongdan_sure,
                        gongdan_critical: gongdan_critical,
                        gongdan_type: text,
                        gongdan_sponsor: gongdan_sponsor,
                        op_abutment: op_abutment,
                        online_reason: $("#online_reason").val(),
                        update_version: $("#update_version").val(),
                        CI_name: $("#CI_name").val(),
                        test_abutment: $("#test_abutment").val(),
                        online_time: $("#online_time").val(),
                        rollback_way: $("#rollback_way").val(),
                        rollback_version: $("#rollback_version").val(),
                        online_lable: $("#online_lable").val(),
                        service_list: $('#select_online_service option:selected').val(),
                    },
                    function(data) {
                        alert(data);
                        window.location.href = "/job/list=my_list/";
                    });
                };
    
            };
    
        } else {
            return false;
        }
    
    });
   //////////////////////////////////////////////////////////////////
   /*工单重置按钮*/
   
    $("#gongdan_reset").click(function() {
        var msg = "确定要重置吗?";
        if (confirm(msg) == true) {
            location.reload(true);
        }else{
            return false;    
        }
   
    });
   
    //////////////////////////////////////////////////////////////////
   /*业务线模板信息汇总*/

   function Get_Service_Name(){
       
        var $radio = $("#table input:radio:checked").parent().parent().parent();
        var $row = parseInt($radio.index()) + 1;
        var $project_name = $("#table tr:eq(" + $row + ") td:nth-child(1)").html();
       
       return $project_name
       }
   
    $("#OnlineService_template_edit").click(function() {
        var name = Get_Service_Name();
        if (typeof name !== "undefined") {
            window.location.href = "/service_line/action=make/?name=" + name ;
        }else{
            alert('清先选择一个删除的项目名称!');
            }
    });
   
    $("#OnlineService_template_delete").click(function() {
        var name = Get_Service_Name();
        if (typeof name !== "undefined") {
            clear_service(name);
        }else{
            alert('清先选择一个项目名称!');
            }
    });

    $("#OnlineService_template_add").click(function() {
        window.location.href = "/service_line/action=make/";
    });

    function clear_service(name) {
        var msg = "确定要删除吗?";
        if (confirm(msg) == true) {
            var res_msg = $.post("/delete_service_name/", {
                name: name,
            },
            function(data) {
                alert(data);
                window.location.href = "/service_line/action=info/";
            });
            return res_msg;
        } else {
            return false;
        }
    }



});
