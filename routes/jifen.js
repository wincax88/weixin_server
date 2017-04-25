var express = require('express');
var router = express.Router();
var MD5 = require("crypto-js/MD5");

// duiba
// AppSecret为：47sqKE7qMRH7Kp3svH51fw8bL5Da
// AppKey： CSnuLUnqiwWPovXJtrwntfNr8Qu

/* GET users listing. */
router.get('/', function(req, res, next) {
  var url = "http://www.duiba.com.cn/autoLogin/autologin";
  var appKey = 'CSnuLUnqiwWPovXJtrwntfNr8Qu';
  var appSecret = '47sqKE7qMRH7Kp3svH51fw8bL5Da';
  var credits = 0; // 9999;
  var timestamp = new Date().getTime(); // Math.floor((new Date().getTime()) / 1000);
  var uid = "not_login"; // "123456";
  // var redirect = '';
  // md5签名的原理如下： 将所有的参数值与appSecret按参数名升序进行排列。
  var sign = MD5(appKey+appSecret+credits+timestamp+uid).toString();
  // http://www.duiba.com.cn/autoLogin/autologin?uid=test001&credits=100&appKey=CSnuLUnqiwWPovXJtrwntfNr8Qu&sign=fbce3..4769&timestamp=1418625055000
  url = `${url}?uid=${uid}&credits=${credits}&appKey=${appKey}&sign=${sign}&timestamp=${timestamp}`;
  console.log(url);
  res.send(url);

});

router.get('/xiaofei', function(req, res, next) {
  /*
  {
    'status': 'ok',
    'errorMessage': '',
    'bizId': '20140730192133033',
    'credits': '100'
  }
  */
  var bizId = req.orderNum
  res.send({'status': 'ok', 'errorMessage': '', 'bizId': bizId, 'credits': '9000'});

});

router.get('/jieguo', function(req, res, next) {
  res.send('ok');

});

module.exports = router;
