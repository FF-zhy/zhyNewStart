function Logout(){
    this.Listener();
}

$.extend(Logout.prototype,{
    // 点击注销事件
    Listener(){
        $(".logout").on("click",() => {
            sessionStorage.removeItem("username") ;
            // 显示he 隐藏
            $(".login-success").addClass("hidden").prev("ul").removeClass("hidden");
        })
    }
})