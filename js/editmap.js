var MapPg = {
    init: function(){},
    resizePg: function(){}, // 页面大小变换
    switchPanel: function(){}, // 切换右侧面板
    submitForm: function(){}, // 提交表单
    addTask: function(){} // 添加任务到任务列表
};

var MapObj = {
    init: function(){},  // 初始化地图
    newMap: function(){}, // 新建图层
    saveMap: function(){}, // 保存
    zoomout: function(){}, // 放大
    zoomin: function(){}, // 缩小
    fullMap: function(){}, // 全图
    panMap: function(){}, // 漫游
    selectRect: function(){}, // 按矩形选择
    selectPoly: function(){} // 按多边形选择
};


$(document).ready(function(){
    MapPg.init();
})

MapPg.init = function() {
    $(document).ready(function(){
        MapPg.resizePg();
        $(window).resize(function(){
            MapPg.resizePg();
        });
        $('.taskListHead li').click(function(e){
            var index = $(this).index();
            MapPg.switchPanel(index);
        });
        $('.listContent').click(function(){
            MapPg.switchPanel(1);
        });
        $('#newMap').click(function(){ MapObj.newMap(); });
        $('#saveMap').click(function(){ MapObj.saveMap();  });
        $('#zoomout').click(function(){ MapObj.zoomout(); });
        $('#zoomin').click(function(){ MapObj.zoomin(); });
        $('#fullMap').click(function(){ MapObj.fullMap();  });
        $('#panMap').click(function(){ MapObj.panMap(); });
        $('#selectRect').click(function(){ MapObj.selectRect(); });
        $('#selectPoly').click(function(){ MapObj.selectPoly();  });
        $('.sureButton').click(function(){
            MapPg.submitForm();
        })
    })

};

MapPg.resizePg = function() {
    $('.Layers').height($(window).height() - 52);
    $('.mapContent').height($(window).height() - 52);
    $('.taskList').height($(window).height() - 52);
    $('.taskTable').height($(window).height() - 130);
};

MapPg.switchPanel = function(index){
    if(index == 0){
        $('.taskListHead li:eq(0)').addClass('clicked');
        $('.taskListHead li:eq(1)').removeClass('clicked');
        $('.taskTable').show();
        $('.taskProgress').hide();
    } else if(index ==1){
        {
            $('.taskListHead li:eq(1)').addClass('clicked');
            $('.taskListHead li:eq(0)').removeClass('clicked');
            $('.taskTable').hide();
            $('.taskProgress').show();
        }
    }
};

MapPg.submitForm = function(){
    var taskInfo = {};
    taskInfo.taskDesc = $('.taskDescContent textarea').val();
    taskInfo.taskPeople = $('.taskPpContent select').val();
    taskInfo.taskDate = $('.taskDateContent input').val();
    MapPg.addTask(taskInfo);
    console.log(taskInfo);

};

MapPg.addTask = function(taskObj){
    var taskListE = $('#taskListUL');
    var newTaskHTML = '<li>' +
        '    <ul class="listContent">' +
        '        <li>' +
        '            <img src="../img/icon_ren.png">' +
        '            <span>'+taskObj.taskPeople+'</span>' +
        '        </li>' +
        '        <li>' +
        '            <img src="../img/icon_renwu.png">' +
        '            <span>'+taskObj.taskDesc+'</span>' +
        '        </li>' +
        '        <li>' +
        '            <img src="../img/icon_riqi.png">' +
        '            <span>截至日期：'+taskObj.taskDate+'</span>' +
        '        </li>' +
        '    </ul>' +
        '    <div class="line"></div>' +
        '</li>' ;
    taskListE.append(newTaskHTML);

};

MapObj.init = function(){

};
MapObj.newMap = function(){
    alert('newMap')
};
MapObj.saveMap = function(){
    alert('saveMap')
};
MapObj.zoomout = function(){
    alert('zoomout')
};
MapObj.zoomin = function(){
    alert('zoomin')
};
MapObj.fullMap = function(){
    alert('fullMap')
};
MapObj.panMap = function(){
    alert('panMap')
};
MapObj.selectRect = function(){
    alert('selectRect')
};
MapObj.selectPoly = function(){
    alert('selectPoly')
};
