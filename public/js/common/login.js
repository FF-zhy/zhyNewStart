/*
* @Author: Marte
* @Date:   2018-10-26 14:27:34
* @Last Modified by:   Marte
* @Last Modified time: 2018-10-26 20:31:58
*/

function Login(){
    this.createLogin();
    this.addListener();
    //生成验证码
    this.genCode();
}
//html 字符串
Login.template = ` <!-- loginModal -->
    <div class="modal fade" id="loginModal" tabindex="-1"  >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="myModalLabel">登录</h4>
          </div>
          <div class="modal-body">
            <!-- 信息收集表单 -->
            <form class="form-login">
              <div class="form-group">
              <div class="alert alert-danger hidden login-error">用户名或密码错误</div>
                <label for="userLoginName">用户名</label>
                <input type="email" class="form-control" id="userLoginName" name="username" placeholder="请输入用户名">
              </div>
              <div class="form-group">
                <label for="userPassword1">密码</label>
                <input type="password" class="form-control" id="userPassword1" name="password" placeholder="请输入密码">
              </div>
              <!--验证码-->
              <div class="form-group">
                <label for="loginCode">验证码</label>
                <input type="text" class="form-control input-code" id="loginCode" placeholder="请输入验证码">
                <div class="code"></div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-login">登录</button>
          </div>
        </div>
      </div>
    </div>`;

$.extend( Login.prototype, {
    createLogin(){
        $("body").append(Login.template);
    },
    //注册事件监听
    addListener(){
      //登录按钮的点击
      $(".btn-login").on("click", this.loginHandler);
      //验证码
      $(".code").on("click", this.genCode);
      $(".input-code").on("blur", this.codeHandler);
    },

    //登录处理
    loginHandler(){
      const data = $(".form-login").serialize();
      //请求API接口，实现验证
      console.log(data);
      const url = "/api/users/login";
      $.post(url,data,(data)=>{
        console.log("data.res.status = ",data.res_body.status )
        if( data.res_body.status === 1){//验证成功
          //保存登录成功的用户名
          sessionStorage.username = data.res_body.data.username;
          //刷新页面
          location.reload();
        } else{
          $(".login-error").removeClass("hidden");
        }
      }, "json")
    },

    // 生成验证码
    genCode() {
      $.getJSON("/api/captcha", (data) => {
        $(".code").html(data.res_body.data);
      })
    },

    // 校验验证码
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
});
