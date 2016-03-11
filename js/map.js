var MapPg = {
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
    markLayer:"",      //标点图层
    viewCenter:"",     //地图中心点
    zoomInit:"",       //初始化zoom大小
    draw:"",           //绘制操作
    selcet:"",         //选择操作
    modify:"",         //修改操作
    current_feature:"",    //上一个绘制的图形
    init: function(){},  // 初始化地图
    createMap:function(){},  //创建openlayer地图
    drawInteraction:function(){},  //绘制函数
    newMap: function(){}, // 新建图层
    saveMap: function(){}, // 保存
    zoomout: function(){}, // 放大
    zoomin: function(){}, // 缩小
    fullMap: function(){}, // 全图
    panMap: function(){}, // 漫游
    selectRect: function(){}, // 按矩形选择
    selectPoly: function(){}, // 按多边形选择
    backoutBtn: function(){}, // 撤销按钮
    getText:function(){},  //获取标注信息
    addTask: function(){}   // 添加任务到任务列表(即增加标注)

};


$(document).ready(function(){
    MapPg.init();
    MapObj.init();
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
        $('#taskListUL').on('click','.listContent',function(){
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
        $('#backoutBtn').click(function(){ MapObj.backoutBtn();  });
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
        }
    }
};

MapPg.submitForm = function(){
    var taskInfo = {};
    taskInfo.taskDesc = $('.taskDescContent textarea').val();
    taskInfo.taskPeople = $('.taskPpContent select').val();
    taskInfo.taskDate = $('.taskDateContent input').val();
    MapPg.addTask(taskInfo);       //右侧任务列表
    MapObj.addTask(taskInfo.taskPeople);     //地图标注
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

    //底图图层
    MapObj.baseLayers = new ol.layer.Tile({
        source: new ol.source.MapQuest({layer: 'sat'}),
        projection: "EPSG:4326"
    });
    //任务范围图层
    MapObj.taskSource = new ol.source.Vector({wrapX: false});
    MapObj.taskLayer = new ol.layer.Vector({
        source: MapObj.taskSource,
        style: MapObj.defaultStyle
    });
    MapObj.layers.push(MapObj.baseLayers);
    MapObj.layers.push(MapObj.taskLayer);
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
//                // set old_feature
//                if(MapObj.last_feature!=null && MapObj.last_feature!="undifined"){
//                    //删除前一个图层
//                    source.removeFeature(MapObj.last_feature);
//                }
                MapObj.current_feature = evt.feature;
            }, this);

        MapObj.map.addInteraction(MapObj.draw);
    }
}



/************************  toolbar *************************/
MapObj.newMap = function(){
    alert('newMap')
};
MapObj.saveMap = function(){
    alert('saveMap')
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
    MapObj.map.removeInteraction(MapObj.draw);


};
MapObj.selectRect = function(){
    $("#mapDiv").css("cursor","crosshair");  //改变光标
    MapObj.map.removeInteraction(MapObj.draw);      //删去上一个按钮的绘图操作
    MapObj.drawInteraction(MapObj.taskSource,"Rect");
};
MapObj.selectPoly = function(){
    $("#mapDiv").css("cursor","crosshair");  //改变光标
    MapObj.map.removeInteraction(MapObj.draw);      //删去上一个按钮的绘图操作
    MapObj.drawInteraction(MapObj.taskSource,"Polygon");
};
MapObj.backoutBtn = function(){
    alert('backoutBtn')
};

MapObj.getText = function(feature){
    var text = feature.get("taskPeople");
    return text;
}

MapObj.addTask = function(taskPeople){
    //默认样式
    var defaultStyle = new ol.style.Style({
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
            font: '20px Calibri,sans-serif',
            fill: new ol.style.Fill({
                color: '#000'
            }),
            stroke: new ol.style.Stroke({
                color: '#fff',
                width: 3
            })
        })
    });

    MapObj.current_feature.set("taskPeople",taskPeople);
    var text = MapObj.current_feature.get("taskPeople");
    defaultStyle.getText().setText(text);
    MapObj.current_feature.setStyle(defaultStyle);
}


