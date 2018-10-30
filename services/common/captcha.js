//svg验证码
var svgCaptcha = require("svg-captcha");

//验证码对象
const Captcha = {
    //生成验证码
    genCaptcha(req, res, next) {
		// 创建验证码对象
		var captcha = svgCaptcha.create({ color: true }); // {data: '<svg.../svg>', text: 'abcd'}
		// 将验证码文本内容保存到 session 中
	    req.session.captcha = captcha.text;
	    // 将验证码 <svg> 标签返回浏览器
	    res.status(200).json({
					res_code: 1,
					res_error: "",
					res_body: {
						data: captcha.data
					}
				});
    },
    
    //进行验证
    verifyCaptcha(req,res,next){
        const {code} = req.query;
        var valid;
        if(code.toUpperCase() === req.session.captcha.toUpperCase()) {
			valid = true;
		} else {
			valid = false;
        }
        
        res.json( {
            res_code: 1,
            res_error: "",
            res_body: {
                valid
            }
        })
    }
};

module.exports = Captcha;