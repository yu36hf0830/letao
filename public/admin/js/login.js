$(function(){
    //表单效验
    var $form=$("form");
    //添加了插件，就会出现新方法
    $form.bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
          },
        fields:{
            username:{
                validators:{
                    notEmpty:{
                        message:"用户不能为空"
                    },
                    callback: {
                        message:"用户名不存在"
                      }
                }
            },
            password:{
                validators:{
                    notEmpty:{
                        message:"密码不能为空"
                    },
                   
                    stringLength:{
                        min:6,
                        max:12,
                        message:"密码长度为6-12位"
                    },
                    callback: {
                        message: "密码错误"
                      }
                }
            }
        }
    });

    $form.on("success.form.bv",function(e){
        e.preventDefault();
        $.ajax({
            type:"post",
            url:"/employee/employeeLogin",
            data: $form.serialize(),
            success:function(data){
                if(data.success){
                    //跳转到首页
                    location.href = "index.html";
                  }
                if(data.error == 1000){
                    //alert("用户名不存在");
                    //把用户名的校验失败
                    //第一个参数：想要修改的字段
                    //第二个参数：改成什么状态  INVALID  VALID
                    //第三个参数： 指定显示的错误信息
                    $form.data("bootstrapValidator").updateStatus("username", "INVALID", "callback");
                  }
                  if(data.error == 1001){
                    $form.data("bootstrapValidator").updateStatus("password", "INVALID", "callback");
                  }
          
                
            }
        })
    });

    $("[type='reset']").on("click",function(){
        $form.data("bootstrapValidator").resetForm();
    });
});