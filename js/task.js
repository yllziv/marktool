var TaskPg = {
    init: function(){},
    goTaskDailPg: function(){}  // 跳转到任务详情
};

$(document).ready(function(){
    TaskPgN.init();
});

TaskPg.init = function() {
    $('.onelist').on('click','label',function(e){ // 点击任务详情
        TaskPg.goTaskDailPg();
    })
}

TaskPg.goTaskDailPg = function() {
    window.parent.HomePg.gotoPage('taskdetail');
};

