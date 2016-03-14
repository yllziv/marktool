var TaskPg = {
    currentTask: sessionStorage.getItem("currenttaskid"), // 当前任务id
    init: function(){},
    getCurrentTask: function(){}, // 从服务端获取任务
    pulishComment: function(){}, // 发表评论
};

$(document).ready(function(){
    TaskPg.init();
});

TaskPg.init = function() {

    TaskPg.getCurrentTask();
    $('#pulishComment').click(function(){ TaskPg.pulishComment();   })
};

TaskPg.getCurrentTask = function(){
    $.post('http://192.168.106.100:8081/annatationtool/task/query_task',JSON.stringify({"taskID":TaskPg.currentTask,"sessionID":"123"}),function(data){
            data = JSON.parse(data);
            if(data.status == 0){
                $('.forPro span').html('项目：' + data.project.name);
                $('.taskName').html(data.taskName);
                $('.taskPer').html(data.executive);
                $('#createTask .taskTime').html(data.createTime);
                $('#createTask .taskPer').html(data.assign);
                $('#startTask .taskTime').html(data.startTime);
                $('#startTask .taskPer').html(data.executive);
                $('#endTask .taskTime').html(data.endTime);
                $('#endTask .taskPer').html(data.executive);
            }else{
                alert('连接错误');
            }
        })
        .error(function(){
            $('.tasklist').html('<li class="onelist">    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>    <input type="checkbox"/>    <label>武汉市路网标注</label>    <span class="append">截止日期：2016-02-18</span>    <span class="append">杨龙龙</span>    <div class="popup">        <div class="delete"></div>        <div class="edit"></div>        <div class="start"></div>    </div></li>');
        })
};

TaskPg.pulishComment = function(){
    var currentUser = '张三';
    var commentContent = $('#comText').val();
    $('.commentUl').append('<li class="commentLi">' +
        '    <div class="tComment">' +
        '        <div class="perLogo">' +
        '            <img src="../img/taskdetail/头像1.png">' +
        '        </div>' +
        '        <div class="comDetail">' +
        '            <div class="comInfo">' +
        '                <span class="comPer">'+currentUser+'</span>' +
        '                <span class="comTime">'+new Date().pattern("yyyy-MM-dd hh:mm:ss")+'</span>' +
        '            </div>' +
        '            <div class="comContent">' +
        '                <span class="contentInfo">'+commentContent+'</span>' +
        '            </div>' +
        '        </div>' +
        '    </div>' +
        '</li>');
    $('#comText').val('');
}