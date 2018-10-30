function RegModel(){
    this.createDom();
    this.addListener();
    this.getCode();
}

RegModel.modelTemplate = `  
<div class="modal fade" id="regModal" tabindex="-1"  >
<div class="modal-dialog" role="document">
  <div class="modal-content">
    <div class="modal-header">
      <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
      <h4 class="modal-title" >注册</h4>
    </div>
    <div class="modal-body">
      <div class="alert alert-danger hidden register-error">用户注册失败，请稍后重试</div>
      <!-- 信息收集表单 -->
      <form class="form-register">
        <div class="form-group">
          <label for="userName">用户名</label>
          <input type="email" class="form-control" id="userName" name="username" placeholder="请输入用户名">
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">密码</label>
          <input type="password" class="form-control" id="exampleInputPassword1" name="password" placeholder="请输入密码">
        </div>
        <div class="form-group">
          <label for="configPassword">确认密码</label>
         <input type="password" class="form-control" id="configPassword" placeholder="请输入确认密码">
        </div>
        <div class="form-group">
          <label for="inputEmail">邮箱</label>
         <input type="email" class="form-control" id="inputEmail" name="email" placeholder="请输入邮箱">
        </div>
        <div class="form-group">
          <label for="register-verify">验证码</label>
          <input type="email" class="form-control" id="register-verify"  placeholder="请输入验证码">
          <div class="code"></div>
        </div>
      </form>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
      <button type="button " class="btn btn-primary btn-register">保存</button>
    </div>
  </div>
</div>
</div>`;

$.extend(RegModel.prototype,{
    createDom(){
        $("body").append(RegModel.modelTemplate);
    },
    // 注册事件监听
    addListener(){
      $(".btn-register").on("click",this.registerHandler);
      $(".code").on("click", this.getCode);
      $("#register-verify").on("blur",this.codeHandler);
    },
    //注册按钮点击
    registerHandler(){
      const data = $(".form-register").serialize();
      console.log("form ",data);
      const url = "/api/users/register";
      $.get(url,data,(data)=>{
        if(data.res_body.status ===1 ){ //判断 匹配状态
          sessionStorage.username = data.res_body.data.username;
          // 刷新页面
          location.reload();
        } else{ //注册失败
          $(".register-error").removeClass("hidden");
        }
      }, "json")
    },
    // 生成验证码
    getCode(){
      $.getJSON("/api/captcha",(data)=>{
        $(".code").html(data.res_body.data);
      })
    },
    //验证码 验证
    codeHandler(event) {
      // 输入的值
      const code = $(event.target).val();
      // ajax
      $.getJSON("/api/captcha/verify", {code}, (data)=>{
        if (data.res_body.valid) {
          alert("正确");
        } else {
          alert("错误");
        }
      })
    }

})