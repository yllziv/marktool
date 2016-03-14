var MapPg = {
    prevTrElement:null,
    init: function(){},
    resizePg: function(){}, // 页面大小变换
    switchPanel: function(){}, // 切换右侧面板
    submitForm: function(){}, // 提交表单
    addTask: function(){} // 添加任务到任务列表
};

var MapObj = {
    map:"",    //地图对象
    defaultStyle:"",  //默认样式
    selectStyle:"",  //选择样式
    layers:[],  //所有图层
    baseLayers:"",     //底图图层
    taskSource:"",    //任务范围图层的source
    taskLayer:"",      //任务范围图层
    markSource:"",     //标点图层的source
    markLayer:"",      //标点图层
    markFID:[],        //标点要素的FID值
    viewCenter:"",     //地图中心点
    zoomInit:"",       //初始化zoom大小
    draw:"",           //绘制操作
    selcet:"",         //选择操作
    modify:"",         //修改操作
    current_feature:"",    //上一个绘制的图形
    //工具条
    init: function(){},  // 初始化地图
    newMap: function(){}, // 新建图层
    saveMap: function(){}, // 保存
    zoomout: function(){}, // 放大
    zoomin: function(){}, // 缩小
    fullMap: function(){}, // 全图
    panMap: function(){}, // 漫游
    editClick:0,      //开始编辑点击次数
    startEdit: function(){}, // 开始编辑
    editPoint: function(){}, // 点
    editLine: function(){}, // 线
    editPolygon: function(){}, // 面
    selectFeature: function(){}, // 选择要素
    modifyFeature: function(){}, // 修改要素
    deleteFeature: function(){}, // 删除要素
    createMap:function(){},  //创建openlayer地图
    //选择、修改、删除操作
    drawInteraction:function(){},   //绘制操作
    modifyInteraction:function(){},   //修改操作
    selectInteraction:function(){},   //选择操作
    deleteInteraction:function(){},   //删除操作
    removeAllInteractions:function(){},   //清除所有操作
    selectFunctionOn:false,       //选择操作是否开启
    //属性编辑
    getAttribute:function(){},      //根据FID获取该要素的属性
    //保存数据
    saveData:function(){}      //根据FID获取该要素的属性
};


$(document).ready(function(){
    MapPg.init();
    MapObj.init();

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
    MapObj.map.updateSize();
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

    //底图图层
    MapObj.baseLayers = new ol.layer.Tile({
        source: new ol.source.MapQuest({layer: 'sat'}),
        projection: "EPSG:4326"
    });
    //标点图层
    MapObj.markSource = new ol.source.Vector({wrapX: false});
    MapObj.markLayer = new ol.layer.Vector({
        source: MapObj.markSource,
        style: MapObj.defaultStyle
    });
    MapObj.layers.push(MapObj.baseLayers);
    MapObj.layers.push(MapObj.markLayer);
    MapObj.viewCenter = [-11000000, 4600000];
    MapObj.zoomInit = 4;
    MapObj.map = MapObj.createMap('mapDiv',MapObj.layers,MapObj.viewCenter,MapObj.zoomInit);

};
/*************************************************
 * 创建地图
 * @param: mapDiv  地图div
 * @param: layers  图层
 * @param: viewCenter 地图中心
 * @param: zoomInit  地图缩放大小
 * @return: map
 ***************************************************/
MapObj.createMap= function(mapDiv,layers,viewCenter,zoomInit)
{
    //地图初始化
    var map = new ol.Map({
        layers: layers,
        target: mapDiv,
        view: new ol.View({
            center: viewCenter,
            zoom: zoomInit
        })
    });
    var zoomslider = new ol.control.ZoomSlider();
    map.addControl(zoomslider);
    return map;
};

/************************  toolbar *************************/
MapObj.newMap = function(){
    alert('newMap')
};
MapObj.saveMap = function(){
    MapObj.saveData(MapObj.markLayer);
};
MapObj.zoomout = function(){
    var view = MapObj.map.getView();
    var zoom = view.getZoom();
    view.setZoom(zoom + 1);
};
MapObj.zoomin = function(){
    var view = MapObj.map.getView();
    var zoom = view.getZoom();
    view.setZoom(zoom - 1);
};
MapObj.fullMap = function(){
    var view = MapObj.map.getView();
    var zoom = view.getZoom();
    view.setZoom(0);
};
MapObj.panMap = function(){
    $("#mapDiv").css("cursor","pointer");
    MapObj.removeAllInteractions();
};
MapObj.startEdit = function(){
    MapObj.getAttribute(100);
    if( MapObj.editClick++ %2 == 0){
        $('#startEdit img').attr("src","../img/toolbar/jsbj.png");
        $('#startEdit span').html("结束编辑");
        $("#mapDiv").css("cursor","default");  //改变光标
        $("#editPoint").attr("disabled",false);
        $("#editLine").attr("disabled",false);
        $("#editPolygon").attr("disabled",false);
        $("#selectFeature").attr("disabled",false);
        $("#modifyFeature").attr("disabled",false);
        $("#deleteFeature").attr("disabled",false);
    }else{
        $('#startEdit img').attr("src","../img/toolbar/ksbj.png");
        $('#startEdit span').html("开始编辑");
        $("#mapDiv").css("cursor","default");  //改变光标
        $("#editPoint").attr("disabled",true);
        $("#editLine").attr("disabled",true);
        $("#editPolygon").attr("disabled",true);
        $("#selectFeature").attr("disabled",true);
        $("#modifyFeature").attr("disabled",true);
        $("#deleteFeature").attr("disabled",false);
    }
};
MapObj.editPoint = function(){
    $("#mapDiv").css("cursor","crosshair");  //改变光标
    MapObj.removeAllInteractions();
    MapObj.drawInteraction(MapObj.markSource,"Point");
};
MapObj.editLine = function(){
    $("#mapDiv").css("cursor","crosshair");  //改变光标
    MapObj.removeAllInteractions();
    MapObj.drawInteraction(MapObj.markSource,"LineString");
};
MapObj.editPolygon = function(){
    $("#mapDiv").css("cursor","crosshair");  //改变光标
    MapObj.removeAllInteractions();
    MapObj.drawInteraction(MapObj.markSource,"Polygon");
};
MapObj.selectFeature = function(){
    $("#mapDiv").css("cursor","default");  //改变光标
    MapObj.removeAllInteractions();
    MapObj.selectInteraction(MapObj.markSource)
};
MapObj.modifyFeature = function(){
    $("#mapDiv").css("cursor","crosshair");  //改变光标
    MapObj.removeAllInteractions();
    MapObj.modifyInteraction(MapObj.markSource);
};
MapObj.deleteFeature = function(){
    $("#mapDiv").css("cursor","default");  //改变光标
    MapObj.map.removeInteraction(MapObj.draw);
    MapObj.map.removeInteraction(MapObj.modify);
    MapObj.deleteInteraction(MapObj.markSource);
};

/********************************************************
 * 绘制函数
 * @param: source: 选择图层的source
 * @param: type: 绘制类型
 * @return: 返回绘制结果geometry
 ********************************************************/
MapObj.drawInteraction = function(source,type) {
    var geometryFunction, maxPoints;
    if (type !== 'None') {
        if (type === 'Rect') {  //按矩形选择
            type = 'LineString';
            maxPoints = 2;
            geometryFunction = function(coordinates, geometry) {
                if (!geometry) {
                    geometry = new ol.geom.Polygon(null);
                }
                var start = coordinates[0];
                var end = coordinates[1];
                geometry.setCoordinates([
                    [start, [start[0], end[1]], end, [end[0], start[1]], start]
                ]);
                return geometry;
            };
        }

        MapObj.draw = new ol.interaction.Draw({
            source: source,
            type: /** @type {ol.geom.GeometryType} */ (type),  //如果是Polygon，则此处默认
            geometryFunction: geometryFunction,
            maxPoints: maxPoints
        });


        //画图层开始前先记录此刻的图形
        MapObj.draw.on('drawstart',
            function(evt) {
                //设置唯一标识值：时间戳 + 用户ID
                var timestamp = new Date().getTime();
                var userID = "0001"
                var FID = timestamp + userID
                evt.feature.setId(FID);
                evt.feature.set("道路名","珞喻路");
                evt.feature.set("等级","3");
                evt.feature.set("分类","主干道");
                var properties = [];
                MapObj.markFID.push(FID);
                MapObj.current_feature = evt.feature;
                addList(FID,properties)
            }, this);

        MapObj.map.addInteraction(MapObj.draw);
    }
}

MapObj.select = new ol.interaction.Select({
    style: MapObj.selectStyle,
    layers: MapObj.markLayer
});

MapObj.modify = new ol.interaction.Modify({
    features: MapObj.select.getFeatures(),
    style: MapObj.selectStyle
});


/********** 修改函数 ***************************************/
/**参数  source；选择图层 ***************************************/
MapObj.modifyInteraction = function (source){
    MapObj.map.addInteraction(MapObj.select);
    MapObj.map.addInteraction(MapObj.modify);
}

/********** 选择函数 ***************************************/
/**参数  source；选择图层 ***************************************/
MapObj.selectInteraction = function (source){
    MapObj.map.addInteraction(MapObj.select);
    MapObj.selectFunctionOn = true;
}

/********** 删除选择要素函数 ***************************************/
/**参数：source: 选择的图层***************************************/
MapObj.deleteInteraction =  function(source) {
    //如果选择操作开启
    if( MapObj.selectFunctionOn == true)
    {
//      var features = source.getFeatures();
        var selected_collection = MapObj.select.getFeatures().getArray();  //返回集不同，因此需要加getArray()
        if (selected_collection!= null && selected_collection.length > 0) {
            for (var x in selected_collection) {
                source.removeFeature(selected_collection[x]);
            }
            MapObj.select.getFeatures().clear();
            //关闭选择操作
            MapObj.map.removeInteraction(MapObj.select);
            MapObj.selectFunctionOn = false;

        }
        else   //如果选中的要素为空
            alert("请先选择需要删除的要素");
    }
    else
        alert("请先选择需要删除的要素");
}

/********** 删除所有Interactions***************************************/
MapObj.removeAllInteractions = function() {
    MapObj.map.removeInteraction(MapObj.draw);
    MapObj.map.removeInteraction(MapObj.select);
    MapObj.map.removeInteraction(MapObj.modify);
    MapObj.selectFunctionOn = false;
}


MapObj.getAttribute = function(fid){
    var feature = MapObj.markSource.getFeatureById(fid);
    var keys =  feature.getKeys()
    var keyNames = keys.splice(1,keys.length-1);  //属性名数组
    var properties = [];                           //属性值数组
    for(var x in keyNames )
    {
        var proper = feature.get(keyNames[x])
        properties.push(proper);
    }
    alert(keyNames);
    alert(properties);
//    MapObj.markSource.setStyle(MapObj.selectStyle);
}

//保存数据
MapObj.saveData = function(layer) {
    var data_type = "GeoJSON";
    var format = new ol.format[data_type](),
        data;
    try {
        //将绘制的图层转化为所需的格式
        data = format.writeFeatures(layer.getSource().getFeatures());
    } catch (e) {
        alert("保存出错！"+e.name + ": " + e.message);
        return;
    }
    if (data_type === 'GeoJSON') {
        // format is JSON
       var dataSave = JSON.stringify(data);
        alert(dataSave);
    } else {
        // format is XML (GPX or KML)
        var serializer = new XMLSerializer();
        var dataSave = serializer.serializeToString(data);
        alert(dataSave);
    }
}

//默认样式
MapObj.defaultStyle = new ol.style.Style({
    fill: new ol.style.Fill({
        color:  'rgba(255, 255, 255, 0.2)'
    }),
    stroke: new ol.style.Stroke({
        color: '#ffcc33',
        width: 2
    }),
    image: new ol.style.Circle({
        radius: 7,
        fill: new ol.style.Fill({
            color: '#ffcc33'
        })
    }),
    text: new ol.style.Text({ //文本样式
        font: '12px Calibri,sans-serif',
        fill: new ol.style.Fill({
            color: '#000'
        }),
        stroke: new ol.style.Stroke({
            color: '#fff',
            width: 3
        })
    })
})

//点击后要素样式
MapObj.selectStyle = (function() {
    var styles = {};
    styles['Polygon'] = [
        new ol.style.Style({
            fill: new ol.style.Fill({
                color: [255, 255, 255, 0.5]
            })
        }),
        new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: [255, 255, 255, 1],
                width: 5
            })
        }),
        new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: [0, 153, 255, 1],
                width: 3
            })
        })
    ];
    styles['MultiPolygon'] = styles['Polygon'];

    styles['LineString'] = [
        new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: [255, 255, 255, 1],
                width: 5
            })
        }),
        new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: [0, 153, 255, 1],
                width: 3
            })
        })
    ];
    styles['MultiLineString'] = styles['LineString'];

    styles['Point'] = [
        new ol.style.Style({
            image: new ol.style.Circle({
                radius: 7,
                fill: new ol.style.Fill({
                    color: [0, 153, 255, 1]
                }),
                stroke: new ol.style.Stroke({
                    color: [255, 255, 255, 0.75],
                    width: 1.5
                })
            }),
            zIndex: 100000
        })
    ];
    styles['MultiPoint'] = styles['Point'];

    styles['GeometryCollection'] = styles['Polygon'].concat(styles['Point']);

    return function(feature) {
        return styles[feature.getGeometry().getType()];
    };
})();