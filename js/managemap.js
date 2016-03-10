var MapPg = {
    init: function(){},
    resizePg: function(){}, // 页面大小变换
    submitForm: function(){}, // 提交表单
    addTask: function(){}, // 添加任务到任务列表
    getDatatree: function(){}, // 添加目录树
    deleteLayer: function(){}, // 删除图层
};

var DragObj = {
    canEdit: [], // 保存可编辑图层
    cantEdit: [], // 保存不可编辑图层
    canEditList:document.getElementById('caneditLayer'), // 可编辑图层放置元素
    cantEditList:document.getElementById('canteditLayer'), // 不可编辑图层放置元素
    canEditBuffer:$('.canedit')[0], // 不可编辑图层放置元素缓冲区
    cantEditBuffer:$('.cantedit')[0], // 不可编辑图层放置元素缓冲区
    dragMember:document.querySelectorAll('#datatree .file'), // 每个拖动的元素
    init: function(){},
    loadDrag: function(){}, // 加载拖拽元素，注册事件
    handleDragEnter: function(){}, // 拖拽进入事件
    handleDragLeave: function(){}, // 拖拽离开事件
    handleDrop: function(){}, // 拖拽放下事件
    handleCanEditDragOver: function(){}, // 拖拽到元素上面事件
    handleCantEditDragOver: function(){}, // 拖拽到元素上面事件
    handleDragOverOuter: function(){}, // 拖拽到元素的缓冲区上面事件
    handleDragStart: function(){}, // 拖拽开始事件
    handleDragEnd: function(){}, // 拖拽结束事件
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
        MapPg.getDatatree();
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
        });
        $('.deleteButton').click(function(){ MapPg.deleteLayer(); });

        DragObj.init();

    })

};

MapPg.resizePg = function() {
    $('.Layers').height($(window).height() - 52);
    $('.mapContent').height($(window).height() - 52);
    $('.taskList').height($(window).height() - 52);
    $('#datatree').height($(window).height() - 92);
    $('#canteditLayer').height(($(window).height() - 350)/2);
    $('#caneditLayer').height(($(window).height() - 350)/2);
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

};

MapPg.getDatatree = function(){
    $("#datatree").treeview({
        toggle: function() {
            console.log("%s was toggled.", $(this).find(">span").text());
        }
    });
};

MapPg.deleteLayer = function(){
    $('.Layers input[type="checkbox"]:checked').each(function(i){
        $(this).parent().parent().remove();
    })
};

DragObj.init = function(){
    DragObj.loadDrag();
}

DragObj.loadDrag = function() {
    var lists = [DragObj.canEditList, DragObj.cantEditList];
    var bufferDiv = [DragObj.canEditBuffer, DragObj.cantEditBuffer];
    // 每个目标注册进入、离开、放下事件
    [].forEach.call(lists,function(list){
        list.addEventListener('dragenter',DragObj.handleDragEnter,false);
        list.addEventListener('dragleave',DragObj.handleDragLeave,false);
        list.addEventListener('drop',DragObj.handleDrop,false);
    });

    // 每个目标 有自己的dragover事件
    DragObj.canEditList.addEventListener('dragover',DragObj.handleCanEditDragOver,false);
    DragObj.cantEditList.addEventListener('dragover',DragObj.handleCantEditDragOver,false);

    // 外围的div框起到缓冲作用，用来重置dragover样式
    [].forEach.call(bufferDiv,function(buffer){
        buffer.addEventListener('dragover',DragObj.handleDragOverOuter, false);
    });

    // 每个拖动元素设置开始拖动和结束拖动事件

    [].forEach.call(DragObj.dragMember, function(member){
        member.addEventListener('dragstart',DragObj.handleDragStart, true);
        member.addEventListener('dragend',DragObj.handleDragEnd, true);
    })
};

DragObj.handleDragStart = function(e){
    console.log('dragstart');
    e.dataTransfer.effectAllowed = 'copy'; // 设置拖动操作
    e.dataTransfer.setData('text/plain', e.target.textContent);
    e.dataTransfer.setData('text/html', e.target.dataset.name);
    // 高亮放置目标
    DragObj.canEditList.className = 'validtarget';
    DragObj.cantEditList.className = 'validtarget';
    return true;
};

// 停止传播，阻止默认的拖动动作
DragObj.handleDragEnter = function(e) {
    //console.log('enter');
    e.stopPropagation();
    e.preventDefault();
    return false;
};

DragObj.handleDragLeave = function(e) {
    //console.log('leave');
    return false;
};

// 移动到缓冲区上，关闭高亮效果
DragObj.handleDragOverOuter = function(e){
    //console.log('handleDragOverOuter');
    DragObj.canEditList.className = 'validtarget';
    DragObj.cantEditList.className = 'validtarget';
    e.stopPropagation();
    return false;
};

DragObj.handleCanEditDragOver = function(e) {
    //console.log('handleCanEditDragOver')
    e.dataTransfer.dropEffect = 'copy';
    e.stopPropagation();
    e.preventDefault();
    DragObj.canEditList.className = 'highlighted';
    return false;
};

DragObj.handleCantEditDragOver = function(e) {
    //console.log('handleCantEditDragOver')
    e.dataTransfer.dropEffect = 'copy';
    e.stopPropagation();
    e.preventDefault();
    DragObj.cantEditList.className = 'highlighted';
    return false;
};

// 在目标列表上进行放置时，传输数据
DragObj.handleDrop = function(e) {
    console.log('handleDrop');
    var text = e.dataTransfer.getData('text/html');
    var targetE; // 目标落入元素
    var uniqLi = function(text){ // 拖动文本、目标节点
        if($('.Layers').text().indexOf(text) == -1){
            return true;
        }else{
            return false;
        }
    };

    e.preventDefault();
    e.stopPropagation();
    if(e.target.tagName == 'UL') {
        targetE = $(e.target);
    }else if(e.target.tagName == 'LI'){
        targetE = $(e.target).parent();
    }else if(e.target.tagName == 'IMG'){
        targetE = $(e.target).parent().parent();
    }
    if( uniqLi(text)) {
        targetE.append('' +
            '<li><label><input type="checkbox" value="' + text + '"/>&nbsp ' + text + '</label>' +
            '<br/><img class="symbol" src="../img/symbol.jpg"></li>');
    }else {
        alert('重复数据');
    }
    return false;
};

DragObj.handleDragEnd = function(e){
    console.log('dragend');
    DragObj.canEditList.className = null;
    DragObj.cantEditList.className = null;
    return false;
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