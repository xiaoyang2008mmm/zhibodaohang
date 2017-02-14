$(function(){
//--------------------初始化--------------------------------

$("#b0").append($("#b1").html())

//--------------------我的工单/审批工单切换-------------------

$(".nav-tabs li").click(function(){
    $(this).siblings().removeClass('active')
    $(this).addClass('active')
    var div_id = $(this).attr('zone_id')
    $("#b0").empty()
    $("#b0").append($("#"+div_id).html())

})

//--------------------工单详情-------------------------------

$('#b0').on('click', '.work_info',function(){
    var work_id =  $($(this).parent().siblings()[0]).html()
    document.location.href="/work/info/?type='my_work'&id="+work_id

});


//已审批
$('#b0').on('click', ".confirm_work_info",function(){
    var work_id =  $($(this).parent().siblings()[0]).html()
    document.location.href="/work/info/?type='confirm_work_info'&id="+work_id

})


//撤回
$('#b0').on('click', '.work_back',function(){
    var work_status =  $($(this).parent().siblings()[2]).html()
    if (work_status=="已完成"){
            alert("工单已经完成，无法撤回!!!");
        }else if(work_status == '已撤回'){
            alert("已撤回")
        }else{
            var work_id =  $($(this).parent().siblings()[0]).html()
            $("#modal_work_id").html(work_id)
            $('#myModal').modal()
        }

})

$("#back_message").click(function(){
    $("#myModal").modal('hide')
    var message = $("#back_desc").val()
    var work_id = $("#modal_work_id").html()
    $.ajax({
      type:'POST',
      url:'/work/back/',
      data:{"message":message,"id":work_id,"type":"o_back"},
      success:function(callback){
        alert(callback)
      }
    })
    window.location.reload()
})


//-------------------工单审批部分-----------------------------

$('#b0').on('click', '.c_active',function(){
    $('#ConfirmModal').modal()
    var work_id = $($(this).parent().siblings()[0]).html()

    $.ajax({
      type:'POST',
      url:'/work/info/',
      data:{"id":work_id},
      success:function(callback){

        source_data = JSON.parse(callback)
        data = source_data['data']
        current_status = source_data['current_status']
        var work_type = data[1]['gongdan_type']
        var current_status_message = ''
        if (current_status == 'None'){
                current_status_message = '无'
            }else{
                current_status_message = '【 '+current_status['desc']+' | '+current_status['name']+' 】 ：'+current_status['message']
                }

        if (work_type == '日常维护'){
            var html = "<tr><td>工单ID</td><td>"+data[0]+"</td></tr>"+
                  "<tr><td>提交时间</td><td>"+data[1]['timestamp']+"</td></tr>"+
                  "<tr><td>工单类型</td><td>"+data[1]['gongdan_type']+"</td></tr>"+
                  "<tr><td>工单等级</td><td>"+data[1]['gongdan_critical'][0]+"</td></tr>"+
                  "<tr><td>发起人</td><td>"+data[1]['gongdan_sponsor'][0]+"</td></tr>"+
                  "<tr><td>工单标题</td><td>"+data[1]['gongdan_mingchen'][0]+"</td></tr>"+
                  "<tr><td>操作详情</td><td>"+data[1]['weihu_detail'][0]+"</td></tr>"+
                  "<tr><td>最新状态</td><td>"+current_status_message+"</td></tr>"+
                  "<tr><td>备注</td><td>"+data[1]['weihu_lable'][0]+"</td></tr>"
        }else if(work_type == '监控'){
            var html = "<tr><td>工单ID</td><td>"+data[0]+"</td></tr>"+
                  "<tr><td>提交时间</td><td>"+data[1]['timestamp']+"</td></tr>"+
                  "<tr><td>工单类型</td><td>"+data[1]['gongdan_type']+"</td></tr>"+
                  "<tr><td>工单等级</td><td>"+data[1]['gongdan_critical'][0]+"</td></tr>"+
                  "<tr><td>发起人</td><td>"+data[1]['gongdan_sponsor'][0]+"</td></tr>"+
                  "<tr><td>工单标题</td><td>"+data[1]['gongdan_mingchen'][0]+"</td></tr>"+
                  "<tr><td>监控事由</td><td>"+data[1]['monitors_reason'][0]+"</td></tr>"+
                  "<tr><td>监控内容</td><td>"+data[1]['monitors_content'][0]+"</td></tr>"+
                  "<tr><td>报警名单</td><td>"+data[1]['monitors_people'][0]+"</td></tr>"+
                  "<tr><td>报警阈值</td><td>"+data[1]['monitors_yuzhi'][0]+"</td></tr>"+
                  "<tr><td>报警阈值</td><td>"+data[1]['monitors_yuzhi'][0]+"</td></tr>"+
                  "<tr><td>是否报警</td><td>"+data[1]['monitors_allow'][0]+"</td></tr>"+
                  "<tr><td>最新状态</td><td>"+current_status_message+"</td></tr>"
        }else if(work_type == '资源申请'){
            var html = "<tr><td>工单ID</td><td>"+data[0]+"</td></tr>"+
                  "<tr><td>提交时间</td><td>"+data[1]['timestamp']+"</td></tr>"+
                  "<tr><td>工单类型</td><td>"+data[1]['gongdan_type']+"</td></tr>"+
                  "<tr><td>工单等级</td><td>"+data[1]['gongdan_critical'][0]+"</td></tr>"+
                  "<tr><td>发起人</td><td>"+data[1]['gongdan_sponsor'][0]+"</td></tr>"+
                  "<tr><td>工单标题</td><td>"+data[1]['gongdan_mingchen'][0]+"</td></tr>"+
                  "<tr><td>资源类型</td><td>"+data[1]['resource_type'][0]+"</td></tr>"+
                  "<tr><td>资源配置</td><td>"+data[1]['resource_config'][0]+"</td></tr>"+
                  "<tr><td>资源带宽</td><td>"+data[1]['resource_bandwidth'][0]+"</td></tr>"+
                  "<tr><td>起始时间</td><td>"+data[1]['resource_start_time'][0]+"</td></tr>"+
                  "<tr><td>申请事由</td><td>"+data[1]['resource_reason'][0]+"</td></tr>"+
                  "<tr><td>最新状态</td><td>"+current_status_message+"</td></tr>"
        }else if(work_type == '项目上线'){
           var html = "<tr><td>工单ID</td><td>"+data[0]+"</td></tr>"+
                  "<tr><td>提交时间</td><td>"+data[1]['timestamp']+"</td></tr>"+
                  "<tr><td>工单类型</td><td>"+data[1]['gongdan_type']+"</td></tr>"+
                  "<tr><td>工单等级</td><td>"+data[1]['gongdan_critical'][0]+"</td></tr>"+
                  "<tr><td>发起人</td><td>"+data[1]['gongdan_sponsor'][0]+"</td></tr>"+
                  "<tr><td>工单标题</td><td>"+data[1]['gongdan_mingchen'][0]+"</td></tr>"+
                  "<tr><td>上线事由</td><td>"+data[1]['online_reason'][0]+"</td></tr>"+
                  "<tr><td>上线时间</td><td>"+data[1]['online_time'][0]+"</td></tr>"+
                  "<tr><td>服务器地址</td><td>"+data[1]['service_list'][0]+"</td></tr>"+
                  "<tr><td>CI名称</td><td>"+data[1]['CI_name'][0]+"</td></tr>"+
                  "<tr><td>回滚方案</td><td>"+data[1]['rollback_way'][0]+"</td></tr>"+
                  "<tr><td>更新版本</td><td>"+data[1]['update_version'][0]+"</td></tr>"+
                  "<tr><td>回滚版本</td><td>"+data[1]['rollback_version'][0]+"</td></tr>"+
                  "<tr><td>最新状态</td><td>"+current_status_message+"</td></tr>"+
                  "<tr><td>备注</td><td>"+data[1]['online_lable'][0]+"</td></tr>"

        }



        $("#confirm_table").empty()
        $("#confirm_table").append(html)
      }
    })
  })

//打回
$("#c_back_message").click(function(){

    $("#ConfirmModal").modal('hide')
    var message = $("#confirm_desc").val()
    var work_id = $($("#confirm_table tr td")[1]).html()
    $.ajax({
          type:'POST',
          url:'/work/back/',
          data:{"message":message,"id":work_id,"type":"c_back"},
          success:function(callback){
            alert(callback)
          }
        })
    window.location.reload()
})

//审批
$("#c_sure_message").click(function(){
    $("#ConfirmModal").modal('hide')
    var message = $("#confirm_desc").val()
    var work_id = $($("#confirm_table tr td")[1]).html()
    var work_type = $($("#confirm_table tr td")[5]).html()
    $.ajax({
          type:'POST',
          url:'/work/confirm/',
          data:{"message":message,"id":work_id,"type":"sure"},
          success:function(callback){
            alert(callback)
          }
        })
    window.location.reload()
    })

//----------------------工单指派------------------------------


$("#b0").on('click','.a_active',function(){
    $('#assignModal').modal()
    var work_id = $($(this).parent().siblings()[0]).html()

    $.ajax({
        url:"/api/contacts_list/",
        type:"GET",
        success:function(callback){
            contacts_info = callback['contacts']
            contacts_select(contacts_info)
        }
    })

    $("#modal_assign_id").html(work_id)

})

function contacts_select(data){
   var contacts_select = '<select id="assign_user_name" style="width:100px">'

   for (var i=0;i < data.length;i++){
        contacts_select += "<option value='"+data[i][0]+"'>"+data[i][1]+"</option>"
    }

    contacts_select += "</select>"
    $("#modal_assign_user").html(contacts_select)
}

$("#assign_upload").click(function(){
    $('#assignModal').modal('hide')
    var assign_user_name = $("#assign_user_name").val();
    var assign_user = $("#assign_user_name").find("option:selected").text();
    var work_id = $("#modal_assign_id").html();
    $.ajax({
        url:'/work/assign/',
        type:'POST',
        data:{"id":work_id,"d_user":assign_user,"d_user_name":assign_user_name},
        success:function(callback){
            alert(callback)
        }
    })
    window.location.reload()
})

})
