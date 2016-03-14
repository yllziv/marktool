window.newLayer = {
    "sessionID":"",
    "projID":"",
    "layername":"",
    "layertype ":"",
    "createTime":"",
    "createPerson":"",
    "coordinateSys":"",
    "dbtype":"",
    "symbolid":"",
    "database":{
        "dbtype":"",
        "dbname":"",
        "ip":"",
        "port":"",
        "usr":"",
        "password":""
    },
    "property":[],
    "constraintinfo":[],
    "layerStyle":{    // 增加图层样式
        "field":"",
        "default":{
            "style":{
                "type":"4",
                "width":"3",
                "height":"8",
                "color":"#00BFFF",
                "border-width":"1",
                "border-color":"#000000"
            }
        },
        "section":[]
    },
    "annotationStyle":{ // 增加注记样式
        "field":"",
        "default":{
            "mapvalue":"",
            "style":{
                "color":"#000000",
                "font-size":"18",
                "font-family":"SimSun",
                "font-bold":false,
                "font-italic":false,
                "font-underscore":false
            }
        },
        "section":[]
    }
}

var consIndex;                   //点击字段约束的单元格行数
var layerIndex;                 //设置图层样式的单元格行数
var noteIndex;                  //设置注记样式的单元格行数
var pointType;                  //点击选择的点形状

var layerTable={
    addField:function(){},            //图层属性表格增加一行
    addLayerStyle:function(){},       //图层样式表格增加一行
    addNoteStyle:function(){},        //注记样式表格增加一行
    addEnum:function(){},             //枚举值表格增加一行
    deleteLayerRow:function(){},       //删除图层样式表格的行，对应要删除全局变量中数组项
    deleteFieldRow:function(){},       //删除字段表格的行，对应要删除样式的字段选项
    deleteNoteRow:function(){},
    deleteEnumRow:function(){}
}

var popup={
    constraintPop:function(){},       //弹出字段约束
    layerStylePop:function(){},       //弹出图层样式
    noteStylePop:function(){},        //弹出注记样式
    popupCenter:function(){},        //屏幕大小变化时弹窗自适应
    popupClose:function(){}          //点击图标弹窗关闭
}

var linePreview={
    lColor:function(){},              //选择不同线颜色对应修改弹窗中线预览（颜色）
    lWidth:function(){},              //输入不同线宽度时对应修改弹窗中线预览（宽度）
    lConfirm:function(){}             //点击确定后更新结果至新建图层页面中，并关闭弹窗
}

var facePreview={
    fColor:function(){},             //选择不同面颜色修改弹窗中面预览
    bColor:function(){},             //选择不同边框颜色修改弹窗中面预览
    bWidth:function(){},             //输入不同边界宽度修改弹窗中面预览
    fConfirm:function(){}            //点击确定后更新结果至新建图层页面中，并关闭弹窗
}

var notePreview={
    noteColor:function(){},          //选择不同颜色修改弹窗中注记预览
    noteSize:function(){},           //注记大小预览
    noteFont:function(){},           //注记字体预览
    noteBold:function(){},           //注记粗体预览
    noteInc:function(){},            //注记斜体预览
    noteUnder:function(){},          //注记下划线预览
    noteConfirm:function(){}         //注记样式预览确定
}

var pointPreview={
    pointType:function(){},           //点形状预览
    pBgColor:function(){},            //点背景颜色预览
    pBdColor:function(){},            //点边框颜色预览
    pHeight:function(){},             //点高度预览
    pWidth:function(){},              //点宽度预览
    pBdWid:function(){},              //点边框宽度预览
    pConfirm:function(){}             //点样式预览确定
}

var fieldCons={
    textConsConfirm:function(){},
    numConsConfirm:function(){},         //字段约束确认
    enumConsConfirm:function(){}
}

var newLayerInfo= {
    InfoConfirm: function () {},          //确定新建图层并保存信息
    InfoCancel: function () {},           //点击取消关闭页面并清空已存值
    closePage:function(){}
}
$(document).ready(function(){
    //center("addLayerPage");
    $(window).resize(function(){
        popup.popupCenter();
    });
    $(".typeInput").change(function(){changeType();});    //改变图层属性时，图层样式表格和注记样式表格切换预览
    $("#addFd").on('change','.fieldName',function(e){changeOption(e);});   //字段名称改变时，图层样式和注记样式的字段选项对应变化
    $("#layerField").change(function(){changeStyle();});    //改变图层样式字段时，表格第一列单元格内容清空
    $("#noteField").change(function(){changeNote();});     //改变注记样式字段时，表格第一、二列单元格内容清空
    $("#addFd").on('click','.deleteBtn',function(e){layerTable.deleteFieldRow(e);});
    $("#addTp").on('click','.deleteBtn',function(e){layerTable.deleteLayerRow(e);});
    $("#addAt").on('click','.deleteBtn',function(e){layerTable.deleteNoteRow(e);});
    $("#enumTb").on('click','.deleteBtn',function(e){layerTable.deleteEnumRow(e);});
    $("#addFd").on('change','.fieldType',function(e){changeFieldType(e);});
    $("#toAddFd").click(function(){layerTable.addField();});
    $("#toAddTp").click(function(){layerTable.addLayerStyle();});
    $("#toAddAt").click(function(){layerTable.addNoteStyle();});
    $("#toAddEnum").click(function(){layerTable.addEnum()});
    $(".addLogo").mouseover(function(){$(this).attr("src","../img/add-hover.png")});
    $(".addLogo").mouseout(function(){$(this).attr("src","../img/add.png")});
    $(".typeModify").click(function(e){popup.layerStylePop(e);});
    $(".anModify").click(function(e){popup.noteStylePop(e);});
    $("#addFd").on('click','.toConstraint',function(e){popup.constraintPop(e);});
    $(".closePop").click(function(){popup.popupClose();});
    $("#lineColor").change(function(){linePreview.lColor();});
    $("#lineWid").change(function(){linePreview.lWidth();});
    $("#LineBtn").click(function(){linePreview.lConfirm();});
    $("#FBgColor").change(function(){facePreview.fColor();});
    $("#FBdColor").change(function(){facePreview.bColor();});
    $("#FWidth").change(function(){facePreview.bWidth();});
    $("#FaceBtn").click(function(){facePreview.fConfirm();});
    $("#noteColor").change(function(){notePreview.noteColor();});
    $("#noteSize").change(function(){notePreview.noteSize();});
    $("#FontSelect").change(function(){notePreview.noteFont();});
    $("#noteBold").click(function(){notePreview.noteBold();});
    $("#noteInc").click(function(){notePreview.noteInc();});
    $("#noteUnder").click(function(){notePreview.noteUnder();});
    $("#noteBtn").click(function(){notePreview.noteConfirm();});
    $("#pType td").click(function(){pointPreview.pointType();});
    $("#PBgColor").change(function(){pointPreview.pBgColor();});
    $("#PBdColor").change(function(){pointPreview.pBdColor();});
    $("#PHeight").change(function(){pointPreview.pHeight();});
    $("#PWidth").change(function(){pointPreview.pWidth();});
    $("#PBWidth").change(function(){pointPreview. pBdWid();});
    $("#pointBtn").click(function(){pointPreview.pConfirm();});
    $("#textSet").click(function(){fieldCons.textConsConfirm();});
    $("#numSet").click(function(){fieldCons.numConsConfirm();});
    $("#enumSet").click(function(){fieldCons.enumConsConfirm();});
    $("#newLayerBtn").click(function(){newLayerInfo.InfoConfirm();});
    $("#closePage").click(function(){newLayerInfo.closePage();});
    $("#newCancel").click(function(){newLayerInfo.InfoCancel();});
})

function changeType(){
    var chooseType = $("input[name='layerType']:checked").val();
    if (chooseType=="point"){
        $(".PStyle").show();
        $(".LStyle").hide();
        $(".FStyle").hide();
    }
    else{
        if (chooseType=="line"){
            $(".PStyle").hide();
            $(".LStyle").show();
            $(".FStyle").hide();
        }
        else{
            $(".PStyle").hide();
            $(".LStyle").hide();
            $(".FStyle").show();
        }
    }
}
function changeOption(e){
    var rowIndex=$(e.target).parent().parent().index();
    var inputValue=$(e.target).val();
    var layerSelect=document.getElementById("layerField");
    var noteSelect=document.getElementById("noteField");
    layerSelect.options[rowIndex-1]=new Option(inputValue,inputValue);
    noteSelect.options[rowIndex-1]=new Option(inputValue,inputValue);
}
function changeStyle(){
    $("#addTp tr").each(function(){
        $(this).find("td").eq(0).find("input").val("");
    });
}
function changeNote(){
    $("#addAt tr").each(function(){
        $(this).find("td").eq(0).find("input").val("");
        $(this).find("td").eq(1).find("input").val("");
    });
}
function changeFieldType(e){
    $(e.target).parent().next().find("input").val("");
}

layerTable.addField=function(){
    var currentRow=$("#addFd tr").length-1;
    if (currentRow==0){
        var newRow=document.getElementById("addFd").insertRow();
        var td1=newRow.insertCell(0);
        var td2=newRow.insertCell(1);
        var td3=newRow.insertCell(2);
        var td4=newRow.insertCell(3);
        var td5=newRow.insertCell(4);
        $(td1).append($("<input type='text' class='fieldName' required>"));
        $(td4).append($("<input type='text' class='fieldInput' required>"));
        $(td3).append($("<input type='text' class='fieldCons' required>"));
        $(td3).addClass("toConstraint");
        $(td5).append($("<button class='deleteBtn'>删除</button>"));
        var sel=document.createElement("select");
        $(sel).addClass("fieldType");
        sel.options.add(new Option("字符串","String"));
        sel.options.add(new Option("文本","text"));
        sel.options.add(new Option("整型","Integer"));
        sel.options.add(new Option("双精度","Double"));
        sel.options.add(new Option("枚举","enum"));
        td2.appendChild(sel);
    }
    else{
        var lastRow=$("#addFd").find("tr").eq(currentRow);
        lastRow.clone(true).appendTo($("#addFd"));
        var newTd=$("#addFd").find("tr").eq(currentRow+1).find("td").eq(0).find("input");
        var setTd=$("#addFd").find("tr").eq(currentRow+1).find("td").eq(3).find("input");
        var conTd=$("#addFd").find("tr").eq(currentRow+1).find("td").eq(2).find("input");
        newTd.val("");
        setTd.val("");
        conTd.val("");
    }
    newLayer.property.push({"name":"", "type":"", "note":"",});
    newLayer.constraintinfo.push({"default":"", "min":"", "max":"", "repeat":"","enum":[""]});
    $("#layerField").append("<option></option>");
    $("#noteField").append("<option></option>");
}
layerTable.addLayerStyle=function(){
    newLayer.layerStyle.section.push({
        "range":"",
        "style":{
            "type":"",
            "width":"",
            "height":"",
            "color":"",
            "border-width":"",
            "border-color":""
        }
    });
    var currentRow=$("#addTp tr").length-1;
    if (currentRow==1){
        var ss=$("#addTp").find("tr").eq(1).clone(true).appendTo($("#addTp"));
        var newTd=$("#addTp").find("tr").eq(2).find("td").eq(0);
        newTd.html("");
        var newInput=$("<input type='text' required>");
        newInput.addClass("fieldValue");
        newInput.appendTo(newTd);
        $("<button class='deleteBtn'>删除</button>").appendTo($("#addTp").find("tr").eq(2).find("td").eq(2));
        newLayer.layerStyle.section[0].style.type=newLayer.layerStyle.default.style.type;
        newLayer.layerStyle.section[0].style.width=newLayer.layerStyle.default.style.width;
        newLayer.layerStyle.section[0].style.height=newLayer.layerStyle.default.style.height;
        newLayer.layerStyle.section[0].style.color=newLayer.layerStyle.default.style.color;
        newLayer.layerStyle.section[0].style["border-width"]=newLayer.layerStyle.default.style["border-width"];
        newLayer.layerStyle.section[0].style["border-color"]=newLayer.layerStyle.default.style["border-color"];
    }
    else{
        var lastRow=$("#addTp").find("tr").eq(currentRow);
        lastRow.clone(true).appendTo($("#addTp"));
        var newTd=$("#addTp").find("tr").eq(currentRow+1).find("td").eq(0).find("input");
        newTd.val("");
        newLayer.layerStyle.section[currentRow-1].style.type=newLayer.layerStyle.section[currentRow-2].style.type;
        newLayer.layerStyle.section[currentRow-1].style.width=newLayer.layerStyle.section[currentRow-2].style.width;
        newLayer.layerStyle.section[currentRow-1].style.height=newLayer.layerStyle.section[currentRow-2].style.height;
        newLayer.layerStyle.section[currentRow-1].style.color=newLayer.layerStyle.section[currentRow-2].style.color;
        newLayer.layerStyle.section[currentRow-1].style["border-width"]=newLayer.layerStyle.section[currentRow-2].style["border-width"];
        newLayer.layerStyle.section[currentRow-1].style["border-color"]=newLayer.layerStyle.section[currentRow-2].style["border-color"];
    }


}
layerTable.addNoteStyle=function(){
    newLayer.annotationStyle.section.push({
        "range":"",
        "mapvalue":"",
        "style":{
            "color":"",
            "font-size":"",
            "font-family":"",
            "font-bold":"",
            "font-italic":"",
            "font-underscore":""
        }
    });
    var currentRow=$("#addAt tr").length-1;
    if (currentRow==1){
        $("#addAt").find("tr").eq(1).clone(true).appendTo($("#addAt"));
        var newTd=$("#addAt").find("tr").eq(2).find("td").eq(0);
        var setTd=$("#addAt").find("tr").eq(2).find("td").eq(1);
        newTd.html("");
        setTd.html("");
        var newInput=$("<input type='text' required>");
        var newInputT=$("<input type='text' required>");
        newInput.addClass("noteType").appendTo(newTd);
        newInputT.addClass("noteType").appendTo(setTd);
        $("<button class='deleteBtn'>删除</button>").appendTo($("#addAt").find("tr").eq(2).find("td").eq(3));
        newLayer.annotationStyle.section[0].style.color=newLayer.annotationStyle.default.style.color;
        newLayer.annotationStyle.section[0].style["font-size"]=newLayer.annotationStyle.default.style["font-size"];
        newLayer.annotationStyle.section[0].style["font-family"]=newLayer.annotationStyle.default.style["font-family"];
        newLayer.annotationStyle.section[0].style["font-bold"]=newLayer.annotationStyle.default.style["font-bold"];
        newLayer.annotationStyle.section[0].style["font-italic"]=newLayer.annotationStyle.default.style["font-italic"];
        newLayer.annotationStyle.section[0].style["font-underscore"]=newLayer.annotationStyle.default.style["font-underscore"];
    }
    else {
        var lastRow=$("#addAt").find("tr").eq(currentRow);
        lastRow.clone(true).removeAttr("id").appendTo($("#addAt"));
        var newTd=$("#addAt").find("tr").eq(currentRow+1).find("td").eq(0).find("input");
        var setTd=$("#addAt").find("tr").eq(currentRow+1).find("td").eq(1).find("input");
        newTd.val("");
        setTd.val("");
        newLayer.annotationStyle.section[currentRow-1].style.color=newLayer.annotationStyle.section[currentRow-2].style.color;
        newLayer.annotationStyle.section[currentRow-1].style["font-size"]=newLayer.annotationStyle.section[currentRow-2].style["font-size"];
        newLayer.annotationStyle.section[currentRow-1].style["font-family"]=newLayer.annotationStyle.section[currentRow-2].style["font-family"];
        newLayer.annotationStyle.section[currentRow-1].style["font-bold"]=newLayer.annotationStyle.section[currentRow-2].style["font-bold"];
        newLayer.annotationStyle.section[currentRow-1].style["font-italic"]=newLayer.annotationStyle.section[currentRow-2].style["font-italic"];
        newLayer.annotationStyle.section[currentRow-1].style["font-underscore"]=newLayer.annotationStyle.section[currentRow-2].style["font-underscore"];
    }
}
layerTable.addEnum=function(){
    var newRow=document.getElementById("enumTb").insertRow();
    var td=newRow.insertCell(0);
    var td2=newRow.insertCell(1);
    $(td).append($("<input type='text' class='noteType' required>"));
    $(td2).append($("<button class='deleteBtn'>删除</button>"));
    newLayer.constraintinfo[consIndex-1].enum.push("");
}
layerTable.deleteLayerRow=function(e){
    $(e.target).parent().parent().remove();
    newLayer.layerStyle.section.splice($(e.target).parent().parent().index()-2,1);
}
layerTable.deleteNoteRow=function(e){
    $(e.target).parent().parent().remove();
    newLayer.annotationStyle.section.splice($(e.target).parent().parent().index()-2,1);
}
layerTable.deleteFieldRow=function(e){
    var rowIndex=$(e.target).parent().parent().index();
    var layerSelect=document.getElementById("layerField");
    var noteSelect=document.getElementById("noteField");
    layerSelect.options.remove(rowIndex-1);
    noteSelect.options.remove(rowIndex-1);
    $(e.target).parent().parent().remove();
    newLayer.property.splice(rowIndex-1,1);
    newLayer.constraintinfo.splice(rowIndex-1,1);
}
layerTable.deleteEnumRow=function(e){
    var rowIndex=$(e.target).parent().parent().index();
    $(e.target).parent().parent().remove();
    newLayer.constraintinfo[consIndex-1].enum.splice(rowIndex,1)
}

popup.layerStylePop=function(e){
    var layerType = $("input[name='layerType']:checked").val();
    layerIndex=$(e.target).parent().parent().parent().index();
    if (layerType == "point")
    {
        if (layerIndex==1){
            if (newLayer.layerStyle.default.style.type!=""){
                $("#PWidth").val(newLayer.layerStyle.default.style.width);
                $("#PHeight").val(newLayer.layerStyle.default.style.height);
                $("#PBgColor").val(newLayer.layerStyle.default.style.color);
                $("#PBdColor").val( newLayer.layerStyle.default.style["border-color"]);
                $("#PBWidth").val(newLayer.layerStyle.default.style["border-width"]);
                showPointPre(newLayer.layerStyle.default.style.type-1);
            }
        }
        else{
            if (newLayer.layerStyle.section[layerIndex-2].style.type!=""){
                $("#PWidth").val(newLayer.layerStyle.section[layerIndex-2].style.width);
                $("#PHeight").val(newLayer.layerStyle.section[layerIndex-2].style.height);
                $("#PBgColor").val(newLayer.layerStyle.section[layerIndex-2].style.color);
                $("#PBdColor").val(newLayer.layerStyle.section[layerIndex-2].style["border-color"]);
                $("#PBWidth").val(newLayer.layerStyle.section[layerIndex-2].style["border-width"]);
                showPointPre(newLayer.layerStyle.section[layerIndex-2].style.type-1);
            }
        }
        center("PointStyle");
        $("#LineStyle").hide();
        $("#PointStyle").show();
        $("#FaceStyle").hide();
    }
    else {
        if (layerType == "line")
        {
            if (layerIndex==1){
                if(newLayer.layerStyle.default.style["border-width"]!=""){
                    $("#lineWid").val(newLayer.layerStyle.default.style["border-width"]);
                    $("#linePre").children().children().css("strokeWidth",$("#lineWid").val());
                }
                if(newLayer.layerStyle.default.style["border-color"]!=""){
                    $("#lineColor").val(newLayer.layerStyle.default.style["border-color"]);
                    $("#linePre").children().children().css("stroke",$("#lineColor").val());
                }
            }
            else{
                if(newLayer.layerStyle.section[layerIndex-2].style["border-width"]!=""){
                    $("#lineWid").val(newLayer.layerStyle.section[layerIndex-2].style["border-width"]);
                    $("#linePre").children().children().css("strokeWidth",$("#lineWid").val());
                }
                if(newLayer.layerStyle.section[layerIndex-2].style["border-color"]!=""){
                    $("#lineColor").val(newLayer.layerStyle.section[layerIndex-2].style["border-color"]);
                    $("#linePre").children().children().css("stroke",$("#lineColor").val());
                }
            }
            center("LineStyle");
            $("#LineStyle").show();
            $("#PointStyle").hide();
            $("#FaceStyle").hide();
        }
        else
        {
            if (layerIndex==1){
                if(newLayer.layerStyle.default.style.color!=""){
                    $("#FBgColor").val(newLayer.layerStyle.default.style.color);
                    $("#FacePre").children().children().css("fill",$("#FBgColor").val());
                }
                if(newLayer.layerStyle.default.style["border-color"]!=""){
                    $("#FBdColor").val(newLayer.layerStyle.default.style["border-color"]);
                    $("#FacePre").children().children().css("stroke",$("#FBdColor").val());
                }
                if(newLayer.layerStyle.default.style["border-width"]!=""){
                    $("#FWidth").val(newLayer.layerStyle.default.style["border-width"]);
                    $("#FacePre").children().children().css("strokeWidth",$("#FWidth").val());
                }
            }
            else{
                    if(newLayer.layerStyle.section[layerIndex-2].style.color!=""){
                        $("#FBgColor").val(newLayer.layerStyle.section[layerIndex-2].style.color);
                        $("#FacePre").children().children().css("fill",$("#FBgColor").val());
                    }
                    if(newLayer.layerStyle.section[layerIndex-2].style["border-color"]!=""){
                        $("#FBdColor").val(newLayer.layerStyle.section[layerIndex-2].style["border-color"]);
                        $("#FacePre").children().children().css("stroke",$("#FBdColor").val());
                    }
                    if(newLayer.layerStyle.section[layerIndex-2].style["border-width"]!=""){
                        $("#FWidth").val(newLayer.layerStyle.section[layerIndex-2].style["border-width"]);
                        $("#FacePre").children().children().css("strokeWidth",$("#FWidth").val());
                    }
            }
            center("FaceStyle");
            $("#LineStyle").hide();
            $("#PointStyle").hide();
            $("#FaceStyle").show();
        }
    }
}
popup.noteStylePop=function(e){
    noteIndex=$(e.target).parent().parent().parent().index();
    if (noteIndex==1){
        if (newLayer.annotationStyle.default.style.color!=""){
            $("#noteColor").val(newLayer.annotationStyle.default.style.color) ;
            $("#notePre").css("color",$("#noteColor").val());
        }
        if (newLayer.annotationStyle.default.style["font-size"]!=""){
            $("#noteSize").val(newLayer.annotationStyle.default.style["font-size"]) ;
            $("#notePre").css("font-size",$("#noteSize").val());
        }
        if (newLayer.annotationStyle.default.style["font-family"]!=""){
            $("#FontSelect").val(newLayer.annotationStyle.default.style["font-family"]) ;
            $("#notePre").css("font-family",$("#FontSelect").val());
        }
        if (newLayer.annotationStyle.default.style["font-bold"]){
            $("#noteFont").addClass("fontBold");
        }
        else {
            $("#noteFont").removeClass("fontBold");
        }
        if (newLayer.annotationStyle.default.style["font-italic"]){
            $("#noteFont").addClass("fontInc");
        }
        else {
            $("#noteFont").removeClass("fontInc");
        }
        if (newLayer.annotationStyle.default.style["font-underscore"]){
            $("#noteFont").addClass("fontUnder");
        }
        else {
            $("#noteFont").removeClass("fontUnder");
        }
    }else{
        if (newLayer.annotationStyle.section[noteIndex-2].style.color!=""){
            $("#noteColor").val(newLayer.annotationStyle.section[noteIndex-2].style.color) ;
            $("#notePre").css("color",$("#noteColor").val());
        }
        if (newLayer.annotationStyle.section[noteIndex-2].style["font-size"]!=""){
            $("#noteSize").val(newLayer.annotationStyle.section[noteIndex-2].style["font-size"]) ;
            $("#notePre").css("font-size",$("#noteSize").val());
        }
        if (newLayer.annotationStyle.section[noteIndex-2].style["font-family"]!=""){
            $("#FontSelect").val(newLayer.annotationStyle.section[noteIndex-2].style["font-family"]) ;
            $("#notePre").css("font-family",$("#FontSelect").val());
        }
        if (newLayer.annotationStyle.section[noteIndex-2].style["font-bold"]){
            $("#noteFont").addClass("fontBold");
        }
        else {
            $("#noteFont").removeClass("fontBold");
        }
        if (newLayer.annotationStyle.section[noteIndex-2].style["font-italic"]){
            $("#noteFont").addClass("fontInc");
        }
        else {
            $("#noteFont").removeClass("fontInc");
        }
        if (newLayer.annotationStyle.section[noteIndex-2].style["font-underscore"]){
            $("#noteFont").addClass("fontUnder");
        }
        else {
            $("#noteFont").removeClass("fontUnder");
        }
    }
    $("#notePre").find("p").text($(e.target).parent().parent().prev().children().val());
    center("AnnotationStyle");
    $("#AnnotationStyle").show();
}
popup.constraintPop=function(e){
        consIndex=$(e.target).parent().parent().index();
        var fieldType=$(e.target).parent().prev().children().val();
        if(fieldType=='String'||fieldType=='text'){
            if (fieldType==newLayer.property[consIndex-1].type){
                if (newLayer.constraintinfo[consIndex-1].default!=""){
                    $("#textDefault").val(newLayer.constraintinfo[consIndex-1].default);
                }
                if (newLayer.constraintinfo[consIndex-1].min!=""){
                    $("#textMinValue").val(newLayer.constraintinfo[consIndex-1].min);
                }
                if (newLayer.constraintinfo[consIndex-1].max!=""){
                    $("#textMaxValue").val(newLayer.constraintinfo[consIndex-1].max);
                }
                if (newLayer.constraintinfo[consIndex-1].repeat!=""){
                    $("#textRepeated").val(newLayer.constraintinfo[consIndex-1].repeat);
                }
            }
            center("textCons");
            $("#textCons").show();
            $("#NumCons").hide();
            $("#enumCons").hide();
        }
        else{
            if (fieldType=='Integer'||fieldType=='Double'){
                if (fieldType==newLayer.property[consIndex-1].type){
                    if (newLayer.constraintinfo[consIndex-1].default!=""){
                        $("#numDefault").val(newLayer.constraintinfo[consIndex-1].default);
                    }
                    if (newLayer.constraintinfo[consIndex-1].min!=""){
                        $("#numMinValue").val(newLayer.constraintinfo[consIndex-1].min);
                    }
                    if (newLayer.constraintinfo[consIndex-1].max!=""){
                        $("#numMaxValue").val(newLayer.constraintinfo[consIndex-1].max);
                    }
                    if (newLayer.constraintinfo[consIndex-1].repeat!=""){
                        $("#numRepeated").val(newLayer.constraintinfo[consIndex-1].repeat);
                    }
                }
                center("NumCons");
                $("#textCons").hide();
                $("#NumCons").show();
                $("#enumCons").hide();
            }
            else{
                if (fieldType==newLayer.property[consIndex-1].type){
                    var enums=newLayer.constraintinfo[consIndex-1].enum.length;
                    var enumRow=$("#enumTb tr").length;
                    if (enums>enumRow){
                        for(var i=0;i<(enums-enumRow);i++){
                            var newRow=document.getElementById("enumTb").insertRow();
                            var td=newRow.insertCell(0);
                            var td2=newRow.insertCell(1);
                            $(td).append($("<input type='text' class='noteType' required>"));
                            $(td2).append($("<button class='deleteBtn'>删除</button>"));
                        }
                    }
                    else{
                        if (enumRow>enums){
                            for(var i=0;i<(enumRow-enums);i++){
                                $("#enumTb").find("tr").eq(enumRow-1).remove();
                            }
                        }
                    }
                    for(var i=0;i<enums;i++){
                        $("#enumTb").find("tr").eq(i).find("td").eq(0).find("input").val(newLayer.constraintinfo[consIndex-1].enum[i]);
                    }
                }
                center("enumCons");
                $("#textCons").hide();
                $("#NumCons").hide();
                $("#enumCons").show();
            }
        }
}
popup.popupCenter=function(){
    if($("#PointStyle").is(":visible")==true){
        center("PointStyle");
    }
    if($("#LineStyle").is(":visible")==true){
        center("LineStyle");
    }
    if($("#FaceStyle").is(":visible")==true){
        center("FaceStyle");
    }
    if($("#AnnotationStyle").is(":visible")==true){
        center("AnnotationStyle");
    }
    if($("#textCons").is(":visible")==true){
        center("textCons");
    }
    if($("#NumCons").is(":visible")==true){
        center("NumCons");
    }
}
popup.popupClose=function(){
    $("#textCons").hide();
    $("#NumCons").hide();
    $("#PointStyle").hide();
    $("#LineStyle").hide();
    $("#FaceStyle").hide();
    $("#AnnotationStyle").hide();
    $("#enumCons").hide();
}
function center(divId){
    var showDiv=$("#"+divId);
    var pW=showDiv.outerWidth(true);
    var pH=showDiv.outerHeight(true);
    var wW = document.documentElement.clientWidth,
        wH = document.documentElement.clientHeight;
    var pTop=wH*0.5-pH*0.5;
    var pLeft=wW*0.5-pW*0.5;
    showDiv.css("top",pTop+"px");
    showDiv.css("left",pLeft+"px");
}

linePreview.lColor=function(){
    var lineColor=$("#lineColor").val();
    $("#linePre").children().children().css("stroke",lineColor);
}
linePreview.lWidth=function(){
    var lineWidth=$("#lineWid").val();
    $("#linePre").children().children().css("strokeWidth",lineWidth);
}
linePreview.lConfirm=function(){
    if (layerIndex==1){
        newLayer.layerStyle.default.style["border-width"]=$("#lineWid").val();
        newLayer.layerStyle.default.style["border-color"]=$("#lineColor").val();
    }
    else{
        newLayer.layerStyle.section[layerIndex-2].style["border-width"]=$("#lineWid").val();
        newLayer.layerStyle.section[layerIndex-2].style["border-color"]=$("#lineColor").val();
    }
    $("#addTp").find("tr").eq(layerIndex).find("td").eq("1").find(".LStyle").children().replaceWith($("#linePre").clone().removeAttr("id"));
    $('#LineStyle').hide();
}

facePreview.fColor=function(){
    var bgColor=$("#FBgColor").val();
    $("#FacePre").children().children().css("fill",bgColor);
}
facePreview.bColor=function(){
    var bdColor=$("#FBdColor").val();
    $("#FacePre").children().children().css("stroke",bdColor);
}
facePreview.bWidth=function(){
    var bdWidth=$("#FWidth").val();
    $("#FacePre").children().children().css("strokeWidth",bdWidth);
}
facePreview.fConfirm=function(){
    if (layerIndex==1){
        newLayer.layerStyle.default.style.color=$("#FBgColor").val();
        newLayer.layerStyle.default.style["border-color"]=$("#FBdColor").val();
        newLayer.layerStyle.default.style["border-width"]=$("#FWidth").val();
    }
    else{
        newLayer.layerStyle.section[layerIndex-2].style.color=$("#FBgColor").val();
        newLayer.layerStyle.section[layerIndex-2].style["border-color"]=$("#FBdColor").val();
        newLayer.layerStyle.section[layerIndex-2].style["border-width"]=$("#FWidth").val();
    }
    $("#addTp").find("tr").eq(layerIndex).find("td").eq("1").find(".FStyle").children().replaceWith($("#FacePre").clone().removeAttr("id"));
    $('#FaceStyle').hide();
}

notePreview.noteColor=function(){
    var noteColor=$("#noteColor").val();
    $("#notePre").css("color",noteColor);
}
notePreview.noteSize=function(){
    var noteSize=$("#noteSize").val();
    $("#noteFont").css("font-size",noteSize+'px');
}
notePreview.noteFont=function(){
    var noteFont=$("#FontSelect").find("option:checked").text();
    if (noteFont=="宋体")
    {
        $("#noteFont").css("font-family","SimSun");
    }
    else {
        $("#noteFont").css("font-family","Microsoft YaHei");
    }
}
notePreview.noteBold=function(){
    if($("#noteFont").hasClass("fontBold")){
        $("#noteFont").removeClass("fontBold");
    }
    else{
        $("#noteFont").addClass("fontBold");
    }
}
notePreview.noteInc=function(){
    if($("#noteFont").hasClass("fontInc")){
        $("#noteFont").removeClass("fontInc");
    }
    else{
        $("#noteFont").addClass("fontInc");
    }
}
notePreview.noteUnder=function(){
    if($("#noteFont").hasClass("fontUnder")){
        $("#noteFont").removeClass("fontUnder");
    }
    else{
        $("#noteFont").addClass("fontUnder");
    }
}
notePreview.noteConfirm=function(){
    if($("#noteFont").hasClass("fontBold")){
        var FBold=true;
    }
    else{
        FBold=false;
    }
    if($("#noteFont").hasClass("fontInc")){
        var FInc=true;
    }
    else{
        FInc=false;
    }
    if($("#noteFont").hasClass("fontUnder")){
        var FUnder=true;
    }
    else{
        FUnder=false;
    }
    if (noteIndex==1){
        newLayer.annotationStyle.default.style.color=$("#noteColor").val();
        newLayer.annotationStyle.default.style["font-size"]=$("#noteSize").val();
        newLayer.annotationStyle.default.style["font-family"]=$("#FontSelect").val();
        newLayer.annotationStyle.default.style["font-bold"]=FBold;
        newLayer.annotationStyle.default.style["font-italic"]=FInc;
        newLayer.annotationStyle.default.style["font-underscore"]=FUnder;
    }
    else{
        newLayer.annotationStyle.section[noteIndex-2].style.color=$("#noteColor").val();
        newLayer.annotationStyle.section[noteIndex-2].style["font-size"]=$("#noteSize").val();
        newLayer.annotationStyle.section[noteIndex-2].style["font-family"]=$("#FontSelect").val();
        newLayer.annotationStyle.section[noteIndex-2].style["font-bold"]=FBold;
        newLayer.annotationStyle.section[noteIndex-2].style["font-italic"]=FInc;
        newLayer.annotationStyle.section[noteIndex-2].style["font-underscore"]=FUnder;
    }
    var setTd=$("#addAt").find("tr").eq(noteIndex).find("td").eq("2").find("p");
    setTd.text($("#noteFont").text());
    setTd.css("color",$("#noteColor").val());
    setTd.css("font-size",$("#noteSize").val()+'px');
    setTd.css("font-family",$("#FontSelect").val());
    if (FBold){
        setTd.addClass("fontBold");
    }
    if (FInc){
        setTd.addClass("fontInc");
    }
    if (FUnder){
        setTd.addClass("fontUnder");
    }
    $("#AnnotationStyle").hide();
}

pointPreview.pointType=function(){
    $("#pType td").click(function(){
        var row=$(this).parent().index();
        var col=$(this).index();
        var num=row*5+col;
        pointType=num+1;
        showPointPre(num);
    })
}
function showSvg(showId){
    $("#"+showId).show();
    $("#"+showId).siblings().hide();
}
function setSvg(svgId){
    var svg=$("#"+svgId).children().children();
    var sHeight=$("#PHeight").val();
    var sWidth=$("#PWidth").val();
    svg.css("fill",$("#PBgColor").val());
    svg.css("stroke",$("#PBdColor").val());
    svg.css("strokeWidth",$("#PBWidth").val());
}
function showPointPre(nums){
    switch(nums){
        case 0:{
            setSvg("squarePre");
            showSvg("squarePre");
        }
            break;
        case 1:{
            setSvg("rectPre");
            showSvg("rectPre");
        }
            break;
        case 2:{
            setSvg("trianglePre");
            showSvg("trianglePre");
        }
            break;
        case 3:{
            setSvg("circlePre");
            showSvg("circlePre");
        }
            break;
        case 4:{
            setSvg("ellipsePre");
            showSvg("ellipsePre");
        }
            break;
        case 5:{
            setSvg("flagPre");
            showSvg("flagPre");
        }
            break;
        case 6:{
            setSvg("hexagonPre");
            showSvg("hexagonPre");
        }
            break;
        case 7:{
            setSvg("locationPre");
            showSvg("locationPre");
        }
            break;
        case 8:{
            setSvg("mapPre");
            showSvg("mapPre");
        }
            break;
        case 9:{
            setSvg("tickPre");
            showSvg("tickPre");
        }
            break;
    }
}
pointPreview.pBdColor=function(){
    $("#pointPreview >div").each(function(){
        if($(this).is(":visible")==true){
            var pBdColor=$("#PBdColor").val();
            $(this).children().children().css("stroke",pBdColor);
        }
    });
}
pointPreview.pBgColor=function(){
    $("#pointPreview >div").each(function(){
        if($(this).is(":visible")==true){
            var pBgColor=$("#PBgColor").val();
            $(this).children().children().css("fill",pBgColor);
        }
    });
}
pointPreview.pBdWid=function(){
    $("#pointPreview >div").each(function(){
        if($(this).is(":visible")==true){
            var pBWidth=$("#PBWidth").val();
            $(this).children().children().css("strokeWidth",pBWidth);
        }
    });
}
pointPreview.pConfirm=function(){
    if (layerIndex==1){
        newLayer.layerStyle.default.style.type=pointType;
        newLayer.layerStyle.default.style.width=$("#PWidth").val();
        newLayer.layerStyle.default.style.height=$("#PHeight").val();
        newLayer.layerStyle.default.style.color=$("#PBgColor").val();
        newLayer.layerStyle.default.style["border-color"]=$("#PBdColor").val();
        newLayer.layerStyle.default.style["border-width"]=$("#PBWidth").val();
    }
    else{
        newLayer.layerStyle.section[layerIndex-2].style.type=pointType;
        newLayer.layerStyle.section[layerIndex-2].style.width=$("#PWidth").val();
        newLayer.layerStyle.section[layerIndex-2].style.height=$("#PHeight").val();
        newLayer.layerStyle.section[layerIndex-2].style.color=$("#PBgColor").val();
        newLayer.layerStyle.section[layerIndex-2].style["border-color"]=$("#PBdColor").val();
        newLayer.layerStyle.section[layerIndex-2].style["border-width"]=$("#PBWidth").val();
    }
    var svgPreId;
    $("#pointPreview >div").each(function(){
        if($(this).is(":visible")==true){
            svgPreId=$(this).attr("id");}
    });
    $("#addTp").find("tr").eq(layerIndex).find("td").eq("1").find(".PStyle").children().replaceWith($("#"+svgPreId).clone().removeAttr("id"));
    $("#PointStyle").hide();
}


fieldCons.textConsConfirm=function(){
    var setTd=$("#addFd").find("tr").eq(consIndex).find("td").eq("2").find("input");
    $(setTd).val("已设置");
    $(setTd).attr("readonly","readonly");
    newLayer.property[consIndex-1].type=$("#addFd").find("tr").eq(consIndex).find("td").eq("1").find("select").val();
    newLayer.constraintinfo[consIndex-1].default=$("#textDefault").val();
    newLayer.constraintinfo[consIndex-1].min=$("#textMinValue").val();
    newLayer.constraintinfo[consIndex-1].max=$("#textMaxValue").val();
    newLayer.constraintinfo[consIndex-1].repeat=$("#textRepeated").is(":checked");
    $("#textCons").hide();
}
fieldCons.numConsConfirm=function(){
    var setTd=$("#addFd").find("tr").eq(consIndex).find("td").eq("2").find("input");
    $(setTd).val("已设置");
    $(setTd).attr("readonly","readonly");
    newLayer.property[consIndex-1].type=$("#addFd").find("tr").eq(consIndex).find("td").eq("1").find("select").val();
    newLayer.constraintinfo[consIndex-1].default=$("#numDefault").val();
    newLayer.constraintinfo[consIndex-1].min=$("#numMinValue").val();
    newLayer.constraintinfo[consIndex-1].max=$("#numMaxValue").val();
    newLayer.constraintinfo[consIndex-1].repeat=$("#numRepeated").is(":checked");
    $("#NumCons").hide();
}
fieldCons.enumConsConfirm=function(){
    var setTd=$("#addFd").find("tr").eq(consIndex).find("td").eq("2").find("input");
    $(setTd).val("已设置");
    $(setTd).attr("readonly","readonly");
    newLayer.property[consIndex-1].type=$("#addFd").find("tr").eq(consIndex).find("td").eq("1").find("select").val();
    var enums=$("#enumTb tr").length;
    for (var i= 0;i<enums;i++){
        newLayer.constraintinfo[consIndex-1].enum[i]=$("#enumTb").find("tr").eq(i).find("td").eq(0).find("input").val();
    }
    $("#enumCons").hide();
};

newLayerInfo.InfoConfirm=function(){
    newLayer.layername=$("#LayerName").val();
    newLayer.layerType=$("input[name='layerType']:checked").val();
    newLayer.coordinateSys=$(".coordinate").val();
    newLayer.layerStyle.field=$("#layerField").val();
    newLayer.annotationStyle.field=$("#noteField").val();
    var fieldRow=$("#addFd tr").length;
    var layerRow=$("#addTp tr").length;
    var noteRow=$("#addAt tr").length;
    for(var i=0;i<fieldRow-1;i++){
        newLayer.property[i].name=$("#addFd").find("tr").eq(i+1).find("td").eq("0").find("input").val();
        newLayer.property[i].note=$("#addFd").find("tr").eq(i+1).find("td").eq("3").find("input").val();
    }
    for(var i=0;i<layerRow-2;i++){
        newLayer.layerStyle.section[i].range=$("#addTp").find("tr").eq(i+2).find("td").eq("0").find("input").val();
    }
    for(var i=0;i<noteRow-2;i++){
        newLayer.annotationStyle.section[i].range=$("#addAt").find("tr").eq(i+2).find("td").eq("0").find("input").val();
        newLayer.annotationStyle.section[i].mapvalue=$("#addAt").find("tr").eq(i+2).find("td").eq("1").find("input").val();
    }
    newLayer.createTime = new Date();


    console.log(JSON.stringify(newLayer));
}

newLayerInfo.closePage=function(){
    $("#newlayer").hide();
}
newLayerInfo.InfoCancel=function(){
    $("#addLayerPage").hide();
}