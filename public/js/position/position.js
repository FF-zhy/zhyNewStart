function Position(){
    this.addListener();
    // 查询一次数据
    this.loadData();
}
// ejs模板
Position.PositionRowTemplate =`
<tr>
    <td class="company-id"><%= _id %></td>
    <td><img style="width: 60px;" src="<%= logo %>" alt="" /></td>  
    <td><%= company %></td>
    <td><%= posName %></td>
    <td></td>
    <td></td>
    <td></td>
    <td><%= salary %></td>
    <td>
        <a class="modify" href="#" data-toggle="modal" data-target="#positionManage">修改</a>
        <a class="delete" href="#">删除</a>
    </td>
</tr>
`;

$.extend(Position.prototype, {
    addListener() {
        // t添加职业
        $(".btn-add-pos").on("click",this.addPosHandler);
        //点击分页
        $(".pagination").on("click", "a", $.proxy(this.loadDataHandler, this));
        //点击表格的删除
        $(".table-position tbody").on("click",".delete",$.proxy(this.deleteHandler,this) );
        //点击表格的 修改
        $(".table-position tbody").on("click",".modify",$.proxy(this.modifyHandler,this) );
    },
    // 添加数据
    addPosHandler(){
        const fd = new FormData($(".form-add-pos").get(0));
        // fd.append("portrait", 123); //imgInfo 为 file
        // console.log("fd =",fd.get(0));
        // 调用并渲染数据
        $.ajax({
            type:"post",
            url: "/api/position/add",
            data: fd,
            // 上传二进制流[不转换]
            processData:false,
            contentType:false, //不使用默认的"application/x-www-form-urlencoded"
            success: function(data){
                if(data.res_body.status ===1) {
                    // 使用ejs模板渲染
                    console.log(data.res_body.data);
                    const html = ejs.render(Position.PositionRowTemplate,data.res_body.data)
                    //显示
                    $(".table-position tbody").append(html);
                    //关闭模态框
                    $("#positionManage").modal("hide");
                } else{
                    $(".add-pos-error").removeClass("hidden");
                }
            }
        })
    },
    // 分页加载数据
    loadDataHandler(event){
        const $src = $(event.target);
        // 获取页数
        const page = Number($src.text());
        // 修改显示类名
        $src.parent("li").addClass("active").siblings("li").removeClass("active");

        this.loadData(page);
    },
    // 加载数据
    loadData(page){
        page = page || 1;
        const url ="/api/position/find_by_page?page=" +  page ;
        // get请求
        $.getJSON(url, (data) => {
            if(data.res_code === 1) {
                let html = "";
                data.res_body.list.forEach((curr) => {
                    html += ejs.render(Position.PositionRowTemplate,curr);
                });
                $(".table-position tbody").html(html);
            }
        })
    },
    // 删除职业信息
    deleteHandler(event){
        // 获取当前行
        const tr = $(event.target).parent("td").parent("tr");
        const id = tr.find(".company-id").text();


        const url = "/api/position/delete_by_id";
        // 删除数据库
        $.post(url,{id : id},(data) => {
            if(data.res_code === 1){
                console.log(data);
                // 删除DOM元素
               // tr.remove();
            }else{
                console.log("删除失败");
            }
        },"json");
    },
    // 更新数据
    modifyHandler(event){
        // 获取当前行
        const tr = $(event.target).parent("td").parent("tr");
        const id = tr.find(".company-id").text();

        const url = "/api/position/modify_by_id";
        // post请求

    }
})

new Position();