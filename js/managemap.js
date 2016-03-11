var MapPg = {
    wmsLayer:[], // geoserver的wms图层
    init: function(){},
    resizePg: function(){}, // 页面大小变换
    submitForm: function(){}, // 提交表单
    addTask: function(){}, // 添加任务到任务列表
    getDatatree: function(){}, // 添加目录树
    deleteLayer: function(){}, // 删除图层
    getLayer: function(){}, // 删除图层
    cancelConnectDB: function(){}, // 删除图层
    sureConnectDB: function(){}, // 删除图层
    layerMiddle: function(){}, // 删除图层
};

var DragObj = {
    canEdit: [], // 保存可编辑图层
    cantEdit: [], // 保存不可编辑图层
    canEditList:document.getElementById('caneditLayer'), // 可编辑图层放置元素
    cantEditList:document.getElementById('canteditLayer'), // 不可编辑图层放置元素
    canEditBuffer:$('.canedit')[0], // 不可编辑图层放置元素缓冲区
    cantEditBuffer:$('.cantedit')[0], // 不可编辑图层放置元素缓冲区

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
        DragObj.init();
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
        $('#postgis').click(function(){ MapPg.getLayer();});
        $('#cancelConnectDB').click(function(){ MapPg.cancelConnectDB();});
        $('#sureConnectDB').click(function(){ MapPg.sureConnectDB();});
        $('#layerMiddle').click(function(){ MapPg.layerMiddle();});
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

MapPg.getLayer = function(){
    $('#connectDB').show();
};

MapPg.sureConnectDB = function(){
    var connectParam = {"sessionID":"123","type":1,"database":{"ip":"202.114.114.34","port":5432,"user":"postgres","password":"admin","dbtype":"postgis","dbname":"annotationtool","schema":"public"}};
    var formElement = $('#connectDB input[type="text"]');
    connectParam.database.ip = formElement.eq(0).val();
    connectParam.database.port = formElement.eq(1).val();
    connectParam.database.user = formElement.eq(2).val();
    connectParam.database.password = formElement.eq(3).val();
    connectParam.database.dbtype = formElement.eq(4).val();
    connectParam.database.dbname = formElement.eq(5).val();
    $.post('http://192.168.106.100:8081/annatationtool/layer/conn_db',JSON.stringify(connectParam),function(data){
        data = JSON.parse(data);
        if(data.status == 0){
            var ulHTML = '';
            var layers = data.layers;
            for(var i = 0; i < layers.length; i++){
                ulHTML += '<li><span class="file" draggable="true" data-name="'+layers[i].name+'">'+layers[i].name+'</span></li>'
            }
            $('#folder21').html(ulHTML);
            //console.log(ulHTML)
            DragObj.init();
        }else{
            alert('连接出错')
        }
    })
        .error(function() {
            $('#folder21').html('<li><span class="file" draggable="true" data-name="layertest1">layertest1</span></li><li><span class="file" draggable="true" data-name="spatial_ref_sys">spatial_ref_sys</span></li><li><span class="file" draggable="true" data-name="layertest2">layertest2</span></li><li><span class="file" draggable="true" data-name="typeTest">typeTest</span></li><li><span class="file" draggable="true" data-name="projadmin">projadmin</span></li><li><span class="file" draggable="true" data-name="roads2">roads2</span></li><li><span class="file" draggable="true" data-name="taskcomment">taskcomment</span></li><li><span class="file" draggable="true" data-name="bk">bk</span></li><li><span class="file" draggable="true" data-name="project">project</span></li><li><span class="file" draggable="true" data-name="layermeta">layermeta</span></li><li><span class="file" draggable="true" data-name="usrproj">usrproj</span></li><li><span class="file" draggable="true" data-name="projlayer">projlayer</span></li><li><span class="file" draggable="true" data-name="sdd">sdd</span></li><li><span class="file" draggable="true" data-name="task">task</span></li><li><span class="file" draggable="true" data-name="roads">roads</span></li>');
            DragObj.init();
        })
    $('#connectDB').hide();
}

MapPg.cancelConnectDB = function(){
    $('#connectDB').hide();
}
MapPg.layerMiddle = function(){
    $.post('http://192.168.106.100:8081/annatationtool/layer/conn_db',JSON.stringify({"sessionID":"123","type":0}),function(data){
        data = JSON.parse(data);
        if(data.status == 0){
            var ulHTML = '';
            MapPg.wmsLayer = data.layers;
            for(var i = 0; i < MapPg.wmsLayer.length; i++){
                ulHTML += '<li><span class="file" draggable="true" data-name="'+MapPg.wmsLayer[i].name+'">'+MapPg.wmsLayer[i].name+'</span></li>'
            }
            $('#folder11').html(ulHTML);
            //console.log(ulHTML)
            DragObj.init();
        }else{
            alert('连接出错')
        }
    })
        .error(function() {
            $('#folder11').html('<li><span class="file" draggable="true" data-name="layertest1">layertest1</span></li><li><span class="file" draggable="true" data-name="layertest2">layertest2</span></li>');
            DragObj.init();
        })
}

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

    [].forEach.call(document.querySelectorAll('#datatree .file'), function(member){
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
    console.log('enter');
    e.stopPropagation();
    e.preventDefault();
    return false;
};

DragObj.handleDragLeave = function(e) {
    console.log('leave');
    return false;
};

// 移动到缓冲区上，关闭高亮效果
DragObj.handleDragOverOuter = function(e){
    console.log('handleDragOverOuter');
    DragObj.canEditList.className = 'validtarget';
    DragObj.cantEditList.className = 'validtarget';
    e.stopPropagation();
    return false;
};

DragObj.handleCanEditDragOver = function(e) {
    console.log('handleCanEditDragOver')
    e.dataTransfer.dropEffect = 'copy';
    e.stopPropagation();
    e.preventDefault();
    DragObj.canEditList.className = 'highlighted';
    return false;
};

DragObj.handleCantEditDragOver = function(e) {
    console.log('handleCantEditDragOver')
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