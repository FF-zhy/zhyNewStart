/*
* @Author: Marte
* @Date:   2018-10-26 12:31:53
* @Last Modified by:   Marte
* @Last Modified time: 2018-10-26 20:31:06
*/

function Header(){
    this.createHeader();
}

Header.template = `<nav class="navbar navbar-inverse">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" >
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">职位管理系统</a>
        </div>

        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul class="nav navbar-nav">
            <li class="active"><a href="/index.html">首页 <span class="sr-only">(current)</span></a></li>
            <li data-toggle="modal" data-target="#positionModal"><a href="/html/position.html">职位管理</a></li>
          </ul>

          <ul class="nav navbar-nav navbar-right not-login">
            <li data-toggle="modal" data-target="#loginModal"><a href="#">登录</a></li>
            <li data-toggle="modal" data-target="#regModal"><a href="#">注册</a></li>
          </ul>

          <!--登录成功-->
          <ul class="nav navbar-nav navbar-right hidden login-success">
            <li ><a href="#">欢迎：</a></li>
            <li class="logout"><a href="javascript:void(0)">注销</a></li>
          </ul>

        </div><!-- /.navbar-collapse -->
        </nav>`;

$.extend(Header.prototype,{
    createHeader(){
        $("header").append(Header.template);
        
        
        //加载用户登录成功信息
        this.loadUser();
        // 加载注销事件
        new Logout();
    },
    loadUser(){
      const user = sessionStorage.username;
      if(user) {
        $(".login-success").removeClass("hidden").prev("ul").addClass("hidden");
        $(".login-success a:first").html("欢迎："+ user);
      } else{
        // 没有存储用户，加载绑定login模态框
        new Login();
        new RegModel();
      }
    }
})

new Header();