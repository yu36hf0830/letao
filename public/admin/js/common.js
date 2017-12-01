//关闭进度环
NProgress.configure({
  showSpinner: false
});

$(document).ajaxStart(function () {
  //开始进度条
  NProgress.start();
});

$(document).ajaxStop(function () {
  //结束进度条
  setTimeout(function () {
    NProgress.done();
  }, 500);
});

//check-root-login判断管理员登录
//非登录页发送ajax请求(每个页面判断一次)，函数indexOf是否包含字符串
if(location.href.indexOf("login.html")==-1){
  $.ajax({
    type:"get",
    url:"/employee/checkRootLogin",
    success:function(data){
      // console.log(data);
      if(data.error===400){
        location.href="login.html";
      }
    }
  });
}


//二级菜单显示与隐藏效果
$(".child").prev().on("click", function () {
  $(this).next().slideToggle();
});


//侧边栏显示与隐藏效果
$(".icon_menu").on("click", function () {
  $(".lt_aside").toggleClass("now");
  $(".lt_main").toggleClass("now");
});


//退出功能
$(".icon_logout").on("click", function () {
  $("#logoutModal").modal("show");

  //因为jquery注册事件不会覆盖。
  //off()解绑所有的事件
  //off("click")
  $(".btn_logout").off().on("click", function () {
    
    //发送ajax请求，告诉服务器，需要退出
    $.ajax({
      type:"get",
      url:"/employee/employeeLogout",
      success:function(data) {
        if(data.success){
          //退出成功，才跳转到登录页面
          location.href = "login.html";
        }
      }
    });


  });
});