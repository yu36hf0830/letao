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
                    location.href="index.html";
                }
                if(data.error==1000){
                    alert("用户不存在");
                }
                if(data.error==1001){
                    alert("密码错误");
                }
            }
        })
    })

})