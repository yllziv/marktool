var HomePg = {
    init: function(){},        // 初始化，事件
    autoHeight: function(){},  // 自动调整子页面高度
    changePage: function(){}   // 切换子页面
};

$(document).ready(function(){
    HomePg.init();
});

HomePg.init = function() {
    $('.nav').on('click','li',function(e){
        HomePg.changePage(e);
    });

    $('.myself').click(function(){
        $('.mymenu').toggle();
    });
};

HomePg.autoHeight = function(){
    var iframe = document.getElementById("Iframe");
    if(iframe.Document){//ie自有属性
        iframe.style.height = iframe.Document.documentElement.scrollHeight + 30;
    }else if(iframe.contentDocument){//ie,firefox,chrome,opera,safari
        iframe.height = iframe.contentDocument.body.offsetHeight + 30 ;
    }
    $("#Iframe").show();
};

HomePg.changePage = function(e){
    var pageName = $(e.target).text();
    var chageNav = function(num){
        $('.navcenter li:eq('+num+')').addClass('clicked')
            .siblings().removeClass('clicked');;
    };
    if(pageName.length > 0 ) {
        switch (pageName) {
            case '项目':
                pageName = 'project';
                chageNav(0);
                break;
            case '任务':
                pageName = 'task';
                chageNav(1);
                break;
            case '动态':
                pageName = 'active';
                chageNav(2);
                break;
            case '地图':
                pageName = 'map';
                chageNav(3);
                break;
            case '我自己':
                pageName = 'myself';
                chageNav(4);
                break;
            case '个人设置':
                pageName = 'setting';
                $('.mymenu').hide();
                break;
            case '退出':
                window.location.href = '../index.html';
                $('.mymenu').hide();
                break;
            default:
                pageName = 'project';
        }
        $("#Iframe").attr('src', "../view/" + pageName + ".html");
    }
}
