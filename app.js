//引入“express’等模块
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// 添加的session
const session = require("express-session");
//引入路由模块
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var positionRouter = require("./routes/position");
//创建express应用实例
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
//使用中间件
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//添加express-session 中间件，使得Express 应用支持session处理
app.use(session({
    secret: "zhy",
    resave:false,
    saveUninitialized:true,
    cookie: {maxAge:30*60*1000 }
}));

// 指明静态资源位置：public目录下
app.use(express.static(path.join(__dirname, 'public')));
// 使用路由中间件
app.use('/', indexRouter);
// 要多加一个 '/' ??
app.use('/api/users/', usersRouter);
app.use('/api/position/', positionRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
