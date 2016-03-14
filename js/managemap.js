var MapPg = {
    serverWmsLayers: [], // geoserver的wms图层
    dropLayerName: [], // 所有落入的图层名称
    postgisConfig: {}, // postgis数据库参数
    init: function () {
    },
    resizePg: function () {
    }, // 页面大小变换
    submitForm: function () {
    }, // 提交表单
    addTask: function () {
    }, // 添加任务到任务列表
    getDatatree: function () {
    }, // 添加目录树
    deleteLayer: function () {
    }, // 删除图层
    getLayer: function () {
    }, // 删除图层
    cancelConnectDB: function () {
    }, // 删除图层
    sureConnectDB: function () {
    }, // 删除图层
    layerMiddle: function () {
    }, // 删除图层
};

var DragObj = {
    canEditList: document.getElementById('caneditLayer'), // 可编辑图层放置元素
    cantEditList: document.getElementById('canteditLayer'), // 不可编辑图层放置元素
    canEditBuffer: $('.canedit')[0], // 不可编辑图层放置元素缓冲区
    cantEditBuffer: $('.cantedit')[0], // 不可编辑图层放置元素缓冲区

    init: function () {
    },
    loadDrag: function () {
    }, // 加载拖拽元素，注册事件
    handleDragEnter: function () {
    }, // 拖拽进入事件
    handleDragLeave: function () {
    }, // 拖拽离开事件
    handleDrop: function () {
    }, // 拖拽放下事件
    handleCanEditDragOver: function () {
    }, // 拖拽到元素上面事件
    handleCantEditDragOver: function () {
    }, // 拖拽到元素上面事件
    handleDragOverOuter: function () {
    }, // 拖拽到元素的缓冲区上面事件
    handleDragStart: function () {
    }, // 拖拽开始事件
    handleDragEnd: function () {
    }, // 拖拽结束事件
};

var MapObj = {
    init: function () {
    },  // 初始化地图
    newMap: function () {
    }, // 新建图层
    saveMap: function () {
    }, // 保存
    zoomout: function () {
    }, // 放大
    zoomin: function () {
    }, // 缩小
    fullMap: function () {
    }, // 全图
    panMap: function () {
    }, // 漫游
    selectRect: function () {
    }, // 按矩形选择
    selectPoly: function () {
    } // 按多边形选择
};


$(document).ready(function () {
    MapPg.init();
})

MapPg.init = function () {
    $(document).ready(function () {
        MapPg.resizePg();
        MapPg.getDatatree();
        DragObj.init();
        $(window).resize(function () {
            MapPg.resizePg();
        });
        $('.taskListHead li').click(function (e) {
            var index = $(this).index();
            MapPg.switchPanel(index);
        });
        $('.listContent').click(function () {
            MapPg.switchPanel(1);
        });
        $('#newMap').click(function () {
            MapObj.newMap();
        });
        $('#saveMap').click(function () {
            MapObj.saveMap();
        });
        $('#zoomout').click(function () {
            MapObj.zoomout();
        });
        $('#zoomin').click(function () {
            MapObj.zoomin();
        });
        $('#fullMap').click(function () {
            MapObj.fullMap();
        });
        $('#panMap').click(function () {
            MapObj.panMap();
        });
        $('#selectRect').click(function () {
            MapObj.selectRect();
        });
        $('#selectPoly').click(function () {
            MapObj.selectPoly();
        });
        $('.deleteButton').click(function () {
            MapPg.deleteLayer();
        });
        $('#postgis').click(function (e) {
            MapPg.getLayer(e);
        });
        $('#cancelConnectDB').click(function () {
            MapPg.cancelConnectDB();
        });
        $('#sureConnectDB').click(function () {
            MapPg.sureConnectDB();
        });
        $('#layerMiddle').click(function () {
            MapPg.layerMiddle();
        });
    })

};

MapPg.resizePg = function () {
    $('.Layers').height($(window).height() - 52);
    $('.mapContent').height($(window).height() - 52);
    $('.taskList').height($(window).height() - 52);
    $('#datatree').height($(window).height() - 92);
    $('#canteditLayer').height(($(window).height() - 350) / 2);
    $('#caneditLayer').height(($(window).height() - 350) / 2);
};

MapPg.submitForm = function () {

};

MapPg.addTask = function (taskObj) {

};

MapPg.getDatatree = function () {
    $("#datatree").treeview({
        toggle: function () {
            console.log("%s was toggled.", $(this).find(">span").text());
        }
    });
};

MapPg.deleteLayer = function () {  // 删除图层，分别删除
    $('#caneditLayer input[type="checkbox"]:checked').each(function (i) { // 删除可编辑区图层
        var dataAllinfo = JSON.parse(decodeURI($(this).parent().parent().attr('data-allinfo')));
        console.log(dataAllinfo)
        var baseParam = {"sessionID":"123","projectID":"1457759329280",
            "addBaseMap":[{"layerID":dataAllinfo.addBaseMap[0].layerID,"name":dataAllinfo.addBaseMap[0].name,"addtime":dataAllinfo.addBaseMap[0].addtime}]};
        //$.post('http://192.168.106.100:8081/annatationtool/project/operateProjLayer',JSON.stringify(baseParam),function(data){
        //    data = JSON.parse(data);
        //    if(data.status == 0){
        //        $(this).parent().parent().remove();
        //    }
        //});
    });

    $('#canteditLayer input[type="checkbox"]:checked').each(function (i) { // 删除不可编辑区图层，底图
        var dataAllinfo = JSON.parse(decodeURI($(this).parent().parent().attr('data-allinfo')));
        var baseParam = {"sessionID":"123","projectID":"1457759329280",
            "addBaseMap":[{"layerID":dataAllinfo.addBaseMap[0].layerID,"name":dataAllinfo.addBaseMap[0].name,"addtime":dataAllinfo.addBaseMap[0].addtime}]};
        $.post('http://192.168.106.100:8081/annatationtool/project/operateProjBaseMap',JSON.stringify(baseParam),function(data){
            data = JSON.parse(data);
            if(data.status == 0){
                $(this).parent().parent().remove();
            }
        });
    })
};

MapPg.getLayer = function (e) {
    if ($(e.target).text() == 'PostGIS库') {
        $('#connectDB').show();
    }
};

MapPg.sureConnectDB = function () {
    MapPg.postgisConfig = {
        "sessionID": "123",
        "type": 1,
        "database": {
            "ip": "202.114.114.34",
            "port": 5432,
            "user": "postgres",
            "password": "admin",
            "dbtype": "postgis",
            "dbname": "annotationtool",
            "schema": "public"
        }
    };
    var formElement = $('#connectDB input[type="text"]');
    MapPg.postgisConfig.database.ip = formElement.eq(0).val();
    MapPg.postgisConfig.database.port = formElement.eq(1).val();
    MapPg.postgisConfig.database.user = formElement.eq(2).val();
    MapPg.postgisConfig.database.password = formElement.eq(3).val();
    MapPg.postgisConfig.database.dbtype = formElement.eq(4).val();
    MapPg.postgisConfig.database.dbname = formElement.eq(5).val();
    $.post('http://192.168.106.100:8081/annatationtool/layer/conn_db', JSON.stringify(MapPg.postgisConfig), function (data) {
            data = JSON.parse(data);
            if (data.status == 0) {
                var ulHTML = '';
                var layers = data.layers;
                for (var i = 0; i < layers.length; i++) {
                    ulHTML += '<li><span class="file" draggable="true" data-allinfo="' + encodeURI(JSON.stringify({
                            name: layers[i].name,
                            type: "postgis"
                        })) + '">' + layers[i].name + '</span></li>'
                }
                $('#folder21').html(ulHTML);
                //console.log(ulHTML)
                DragObj.init();
            } else {
                alert('连接出错')
            }
        })
        .error(function () {
            $('#folder21').html('<li><span class="file" draggable="true" data-name="layertest1">layertest1</span></li><li><span class="file" draggable="true" data-name="spatial_ref_sys">spatial_ref_sys</span></li><li><span class="file" draggable="true" data-name="layertest2">layertest2</span></li><li><span class="file" draggable="true" data-name="typeTest">typeTest</span></li><li><span class="file" draggable="true" data-name="projadmin">projadmin</span></li><li><span class="file" draggable="true" data-name="roads2">roads2</span></li><li><span class="file" draggable="true" data-name="taskcomment">taskcomment</span></li><li><span class="file" draggable="true" data-name="bk">bk</span></li><li><span class="file" draggable="true" data-name="project">project</span></li><li><span class="file" draggable="true" data-name="layermeta">layermeta</span></li><li><span class="file" draggable="true" data-name="usrproj">usrproj</span></li><li><span class="file" draggable="true" data-name="projlayer">projlayer</span></li><li><span class="file" draggable="true" data-name="sdd">sdd</span></li><li><span class="file" draggable="true" data-name="task">task</span></li><li><span class="file" draggable="true" data-name="roads">roads</span></li>');
            DragObj.init();
        })
    $('#connectDB').hide();
}

MapPg.cancelConnectDB = function () {
    $('#connectDB').hide();
}
MapPg.layerMiddle = function () {
    $.post('http://192.168.106.100:8081/annatationtool/layer/conn_db', JSON.stringify({
            "sessionID": "123",
            "type": 0
        }), function (data) {
            data = JSON.parse(data);
            if (data.status == 0) {
                var ulHTML = '';
                MapPg.serverWmsLayers = data.layers;
                for (var i = 0; i < MapPg.serverWmsLayers.length; i++) {
                    ulHTML += '<li><span class="file" draggable="true" data-allinfo="' + encodeURI(JSON.stringify(MapPg.serverWmsLayers[i])) + '">' + MapPg.serverWmsLayers[i].name + '</span></li>'
                }
                $('#folder11').html(ulHTML);
                //console.log(ulHTML)
                DragObj.init();
            } else {
                alert('连接出错')
            }
        })
        .error(function () {
            $('#folder11').html('<li><span class="file" draggable="true" data-name="layertest1">layertest1</span></li><li><span class="file" draggable="true" data-name="layertest2">layertest2</span></li>');
            DragObj.init();
        })
}

DragObj.init = function () {
    DragObj.loadDrag();
}

DragObj.loadDrag = function () {
    var lists = [DragObj.canEditList, DragObj.cantEditList];
    var bufferDiv = [DragObj.canEditBuffer, DragObj.cantEditBuffer];
    // 每个目标注册进入、离开、放下事件
    [].forEach.call(lists, function (list) {
        list.addEventListener('dragenter', DragObj.handleDragEnter, false);
        list.addEventListener('dragleave', DragObj.handleDragLeave, false);
        list.addEventListener('drop', DragObj.handleDrop, false);
    });

    // 每个目标 有自己的dragover事件
    DragObj.canEditList.addEventListener('dragover', DragObj.handleCanEditDragOver, false);
    DragObj.cantEditList.addEventListener('dragover', DragObj.handleCantEditDragOver, false);
    // 外围的div框起到缓冲作用，用来重置dragover样式
    [].forEach.call(bufferDiv, function (buffer) {
        buffer.addEventListener('dragover', DragObj.handleDragOverOuter, false);
    });

    // 每个拖动元素设置开始拖动和结束拖动事件

    [].forEach.call(document.querySelectorAll('#datatree .file'), function (member) {
        member.addEventListener('dragstart', DragObj.handleDragStart, true);
        member.addEventListener('dragend', DragObj.handleDragEnd, true);
    })
};

DragObj.handleDragStart = function (e) {
    console.log('dragstart');
    e.dataTransfer.effectAllowed = 'copy'; // 设置拖动操作
    e.dataTransfer.setData('text/plain', e.target.textContent);
    e.dataTransfer.setData('text/html', e.target.dataset.allinfo);
    // 高亮放置目标
    DragObj.canEditList.className = 'validtarget';
    DragObj.cantEditList.className = 'validtarget';
    return true;
};

// 停止传播，阻止默认的拖动动作
DragObj.handleDragEnter = function (e) {
    console.log('enter');
    e.stopPropagation();
    e.preventDefault();
    return false;
};

DragObj.handleDragLeave = function (e) {
    console.log('leave');
    return false;
};

// 移动到缓冲区上，关闭高亮效果
DragObj.handleDragOverOuter = function (e) {
    console.log('handleDragOverOuter');
    DragObj.canEditList.className = 'validtarget';
    DragObj.cantEditList.className = 'validtarget';
    e.stopPropagation();
    return false;
};

DragObj.handleCanEditDragOver = function (e) {
    console.log('handleCanEditDragOver')
    e.dataTransfer.dropEffect = 'copy';
    e.stopPropagation();
    e.preventDefault();
    DragObj.canEditList.className = 'highlighted';
    return false;
};

DragObj.handleCantEditDragOver = function (e) {
    console.log('handleCantEditDragOver')
    e.dataTransfer.dropEffect = 'copy';
    e.stopPropagation();
    e.preventDefault();
    DragObj.cantEditList.className = 'highlighted';
    return false;
};

// 在目标列表上进行放置时，传输数据
DragObj.handleDrop = function (e) {
    console.log('handleDrop');
    var allinfoOrigin = e.dataTransfer.getData('text/html')
    var allinfo = JSON.parse(decodeURI(allinfoOrigin));
    var text = allinfo.name;
    var targetE; // 目标落入元素
    var uniqLi = function (text) { // 拖动文本、目标节点
        if (MapPg.dropLayerName.indexOf(text) == -1) {
            return true;
        } else {
            return false;
        }
    };

    e.preventDefault();
    e.stopPropagation();
    if (e.target.tagName == 'UL') {
        targetE = $(e.target);
    } else if (e.target.tagName == 'LI') {
        targetE = $(e.target).parent();
    } else if (e.target.tagName == 'IMG') {
        targetE = $(e.target).parent().parent();
    }
    if (targetE.attr('id') == 'caneditLayer' && !allinfo.url) {
        alert('该图层不可编辑');
        return false;
    }
    if (uniqLi(text)) {

        if (targetE.attr('id') == 'caneditLayer') { // 移动到可编辑图层
            if (allinfo.id) { // 只有中间库图层能移动到这里
                var param = {
                    "sessionID": "123",
                    "projectID": "1457759329280",
                    "addLayer": [{"layerID": "", "name": "layer22", "addtime": "2016-02-27 13:37:45"}]
                };
                param.addLayer[0].layerID = allinfo.id;
                param.addLayer[0].name = text;
                param.addLayer[0].addtime = new Date();
                $.post('http://192.168.106.100:8081/annatationtool/project/operateProjLayer', JSON.stringify(param), function (data) {
                    data = JSON.parse(data);
                    if (data.status == 0) {
                        targetE.append('' +
                            '<li data-allinfo="'+allinfoOrigin+'"><label><input type="checkbox" value="' + text + '"/>&nbsp ' + text + '</label>' +
                            '<br/><img class="symbol" src="../img/symbol.jpg"></li>');
                    }
                })
            }
        } else if (targetE.attr('id') == 'canteditLayer') { // 移动到不可编辑图层
            if (allinfo.id) { // 中间库图层
                var param1 = {
                    "sessionID": "123",
                    "projectID": "1457759329280",
                    "addBaseMap": [{"layerID": "", "name": "layer22", "addtime": "2016-02-27 13:37:45"}]
                };
                param1.addBaseMap[0].layerID = allinfo.id;
                param1.addBaseMap[0].name = text
                param1.addBaseMap[0].addtime = new Date();
                $.post('http://192.168.106.100:8081/annatationtool/project/operateProjBaseMap', param1, function (data) {
                    data = JSON.parse(data);
                    console.log(data);
                    if (data.status == 0) {
                        targetE.append('' +
                            '<li  data-allinfo="'+allinfoOrigin+'"><label><input type="checkbox" value="' + text + '"/>&nbsp ' + text + '</label>' +
                            '<br/><img class="symbol" src="../img/symbol.jpg"></li>');
                    }
                })
            } else {  // 添加postgis库，先发布为wms服务，后添加到数据库
                var wmsparam = {
                    "dataStoreName": "fromPostgis",
                    "ip": MapPg.postgisConfig.database.ip,
                    "port": MapPg.postgisConfig.database.port,
                    "database": MapPg.postgisConfig.database.dbname,
                    "user": MapPg.postgisConfig.database.user,
                    "passwd": MapPg.postgisConfig.database.password,
                    "dbtype": MapPg.postgisConfig.database.dbtype,
                    "table": text,
                    "sessionID": "123"
                };
                $.post('http://192.168.106.100:8081/annatationtool/layer/publish_layer',JSON.stringify(wmsparam),function(wmsdata){
                    wmsdata = JSON.parse(wmsdata);
                    if(wmsdata.url){ // 发布成功后
                        var param2 = {
                            "sessionID": "123",
                            "projectID": "1457759329280",
                            "addBaseMap": [{"layerID": "", "name": "layer22", "addtime": "2016-02-27 13:37:45"}]
                        };
                        param2.addBaseMap[0].layerID = wmsdata.url;
                        param2.addBaseMap[0].name = text;
                        param2.addBaseMap[0].addtime = new Date();
                        $.post('http://192.168.106.100:8081/annatationtool/project/operateProjBaseMap', JSON.stringify(param2), function (data) {
                            console.log(data);
                            data = JSON.parse(data);
                            if (data.status == 0) {
                                targetE.append('' +
                                    '<li  data-allinfo="'+encodeURI(JSON.stringify(param2))+'"><label><input type="checkbox" value="' + text + '"/>&nbsp ' + text + '</label>' +
                                    '<br/><img class="symbol" src="../img/symbol.jpg"></li>');
                            }else{
                                alert('保存图层失败');
                            }
                        });

                    }else {
                        alert('发布图层失败')
                    }
                })
            }
        }
        MapPg.dropLayerName.push(text);
    } else {
        alert('重复数据');
    }
    return false;
};

DragObj.handleDragEnd = function (e) {
    console.log('dragend');
    DragObj.canEditList.className = null;
    DragObj.cantEditList.className = null;
    return false;
};

MapObj.init = function () {

};
MapObj.newMap = function () {
    $('#newlayer').show();
};
MapObj.saveMap = function () {
    alert('saveMap')
};
MapObj.zoomout = function () {
    alert('zoomout')
};
MapObj.zoomin = function () {
    alert('zoomin')
};
MapObj.fullMap = function () {
    alert('fullMap')
};
MapObj.panMap = function () {
    alert('panMap')
};
MapObj.selectRect = function () {
    alert('selectRect')
};
MapObj.selectPoly = function () {
    alert('selectPoly')
};