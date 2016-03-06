var indexPage = {
    showPage: function(name) { // 切换登录、注册、找回密码页面
        name = '#' + name;
        var pageArray = ['#login', '#register', '#findpwd'];
        var hiddenPage = _.difference(pageArray,[name])
        $(name).show();
        _.map(hiddenPage, function(onePage){
            $(onePage).hide();
        })
    }
}

$(document).ready(function(){ // 页面加载
    indexPage.showPage('login');
    // 登录页面事件
    $('#login .link-Login').click(function(){ // 登录页面
        indexPage.showPage('login');
    });
    $('#login .link-Register').click(function(){ // 注册页面
        indexPage.showPage('register');
    });
    $('#login .forgot-pw').click(function(){ // 忘记密码
        indexPage.showPage('findpwd');
    });
    $('#login .rightnowRegister').click(function(){ // 注册
        indexPage.showPage('register');
    })
    $('#btn-login').click(function(){ // 登录到主界面
        window.location.href = './view/home.html';
    })

    // 注册页面事件
    $('#btn-register').click(function(){
        indexPage.showPage('login');
    })
    $('#register .desc').click(function(){
        indexPage.showPage('login');
    });

    // 忘记密码页面事件
    $('#pswreset').click(function(){ // 忘记密码
        indexPage.showPage('login');
    })
});

