var MapPg = {
    prevTrElement:null,
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
    startEdit: function(){}, // 开始编辑
    editPoint: function(){}, // 点
    editLine: function(){}, // 线
    editPolygon: function(){}, // 面
    selectFeature: function(){}, // 选择要素
    modifyFeature: function(){}, // 修改要素
    deleteFeature: function(){} // 删除要素
};


$(document).ready(function(){
    MapPg.init();

});

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
        $('#startEdit').click(function(){ MapObj.startEdit(); });
        $('#editPoint').click(function(){ MapObj.editPoint();  });
        $('#editLine').click(function(){ MapObj.editLine();  });
        $('#editPolygon').click(function(){ MapObj.editPolygon();  });
        $('#selectFeature').click(function(){ MapObj.selectFeature();  });
        $('#modifyFeature').click(function(){ MapObj.modifyFeature();  });
        $('#deleteFeature').click(function(){ MapObj.deleteFeature();  });
        $('.sureButton').click(function(){MapPg.submitForm();})
        $('#marktotalTBody').on('click','tr',function(e){
            $('#markAtrrTBody').html(

            );
        });
        $('#marktotalTBody tr').on('blur','td:first-child',function(){
            $(this).next().html((new Date()).pattern("yyyy-MM-dd hh:mm:ss"))
        })
    })

};

MapPg.resizePg = function() {
    $('.Layers').height($(window).height() - 52);
    $('.mapContent').height($(window).height() - 52);
    $('.taskList').height($(window).height() - 52);
    $('.taskTable').height($(window).height() - 130);
    $('.marktotal').height(($(window).height() - 130)/2);
    $('.markattr').height(($(window).height() - 130)/2 -80);
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
            $("div.holder").jPages({
                containerID : "marktotalTBody",
                previous : "←",
                next : "→",
                perPage : 8,
                delay : 8
            });
        }
    }
};

MapPg.submitForm = function(){
    alert('save attr');

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
MapObj.startEdit = function(){
    alert('startEdit')
};
MapObj.editPoint = function(){
    alert('editPoint')
};
MapObj.editLine = function(){
    alert('editLine')
};
MapObj.editPolygon = function(){
    alert('editPolygon')
};
MapObj.selectFeature = function(){
    alert('selectFeature')
};
MapObj.modifyFeature = function(){
    alert('modifyFeature')
};
MapObj.deleteFeature = function(){
    alert('deleteFeature')
};
