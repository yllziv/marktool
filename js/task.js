var TaskPg = {
    init: function(){},
    getTask: function(){}, // 从服务端获取任务
    goTaskDailPg: function(){}  // 跳转到任务详情
};

$(document).ready(function(){
    TaskPg.init();
});

TaskPg.init = function() {
    TaskPg.getTask();
    $('.tasklist').on('click','label',function(e){ // 点击任务详情
        var currenttaskid = $(e.target).attr('data-taskid');
        sessionStorage.setItem("currenttaskid", currenttaskid);
        TaskPg.goTaskDailPg();
    })
};

TaskPg.getTask = function(){
    $.post('http://192.168.106.100:8081/annatationtool/task/query_user_task',JSON.stringify({"personID":"12345567","sessionID":"123"}),function(data){
        data = JSON.parse(data);
        if(data.status == 0){
            var tasks = data.taskInfo;
            var ulHTML = '';
            for(var i = 0; i < tasks.length; i++){
                ulHTML += '<li class="onelist">' +
                    '    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>' +
                    '    <input type="checkbox"/>' +
                    '    <label data-taskid="'+tasks[i].taskID+'">'+tasks[i].taskName +'</label>' +
                    '    <span class="append">截至日期：'+tasks[i].endTime +'</span>' +
                    '    <span class="append">负责人：'+tasks[i].projectName +'</span>' +

                    '    <div class="popup">' +
                    '        <div class="delete"></div>' +
                    '        <div class="edit"></div>' +
                    '        <div class="start"></div>' +
                    '    </div>' +
                    '</li>'
            }
            $('.tasklist').html(ulHTML);
        }else{
            alert('连接错误');
        }
    })
        .error(function(){
            $('.tasklist').html('<li class="onelist">    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>    <input type="checkbox"/>    <label>武汉市路网标注</label>    <span class="append">截止日期：2016-02-18</span>    <span class="append">杨龙龙</span>    <div class="popup">        <div class="delete"></div>        <div class="edit"></div>        <div class="start"></div>    </div></li>');
        })
}

TaskPg.goTaskDailPg = function() {
    window.parent.HomePg.gotoPage('taskdetail');
};

