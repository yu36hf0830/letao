$(function(){
    var page=1;
    var pageSize=5;
   
    function render(){
        $.ajax({
            type:"get",
            url:"/user/queryUser",
            data:{
                page:page,
                pageSize:pageSize
            },
            // 准备数据
            success:function(data){
                // console.log(data);
                // 模板与数据进行绑定
                // 参数:模板id/对象
                //模板与对象绑定之后，模板可以使用对象中的属性
                var html=template("tpl",data);
                // console.log(html);
                $("tbody").html(html);

                // 渲染分页
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    // currentPage:currentPage,
                    totalPages:Math.ceil(data.total/data.size),
                    numberOfPages:5,
                    onPageClicked:function(a,b,c,page){
                        // console.log(page);
                        currentPage = page;
                        render();
                    }
                });
            }
            
        });
    }
    render();


    // 启用与禁用功能
    $("tbody").on("click",".btn",function(){
        // console.log("呵呵");
        $("#userModal").modal("show");
        // console.log($(this));
        // var id=$(this).data("id");
        // console.log(id);
        var id=$(this).parent().data("id");
        // console.log(id);
        var isDelete=$(this).hasClass("btn-danger")?0:1;
        // console.log(id);
        // console.log(isDelete);

        $(".btn_confirm").off().on("click",function(){
            // console.log("呵呵");
        
            $.ajax({
                type:"post",
                url:"/user/updateUser",
                data:{
                    id:id,
                    isDelete:isDelete
                },
                success:function(data){
                    // console.log(data);
                    if(data.success){
                        $("#userModal").modal("hide");
                        render();
                    }
                }
            });
        
        });
    });
})