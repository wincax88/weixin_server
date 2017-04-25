var express = require('express');
var router = express.Router();
var WechatAPI = require('wechat-api');
var wechat = require('wechat');
var urllib = require('url');

var config = {
  token: 'minecraft',
  appid: 'wx466da66554d41eef', // 'wx30313aabad645559',
  appsecret: '0654acb8beed48a192a4b9d246addedd',
  encodingAESKey: 'GoPxlhaQJ2pbHxk732VgpPDOE3SZS3PuG9XP9NMnyRx', // 'GoPxlhaQJ2pbHxk732VgpPDOE3SZS3PuG9XP9NMnyRx',
  checkSignature: true // 可选，默认为true。由于微信公众平台接口调试工具在明文模式下不发送签名，所以如要使用该测试工具，请将其设置为false
};

// 测试号信息
// appID wx466da66554d41eef
// appsecret 0654acb8beed48a192a4b9d246addedd

//var api = new WechatAPI('wx30313aabad645559', '7a18fe7e127b7c17ff1c3399f2260b95');
var api = new WechatAPI('wx466da66554d41eef', '0654acb8beed48a192a4b9d246addedd');
api.getAccessToken(function (err, token) {
  console.log(token);
  var menu = JSON.stringify(require('../data/menu.json'));
      api.createMenu(menu, function (err, result) {
        console.log(err);
        console.log(result);
      });
});

router.get('/getJsToken', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  api.getTicket('jsapi', function (err, result) {
    var param = {
      debug: false,
      jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'],
      url: 'http://weixin.draw100.com/api' //'http://localhost:8080/' //'http://weixin.draw100.com/api/demo'
    };
    api.getJsConfig(param, function (err, result){
      console.log(err, result);
      var params = urllib.parse(req.url, true);
      console.log(params);
      if (params.query && params.query.jsonpCallback) {
        //console.log(params.query.callback);
        var str =  params.query.jsonpCallback + '(' + JSON.stringify(result) + ')';//jsonp
        res.end(str);
      } else {
        res.end(JSON.stringify(result));//普通的json
      }

      //res.send({'status': 'ok', 'errorMessage': '', 'config': result});
    })
  });
});

router.use('/', wechat(config.token).text(function(message, req, res, next) {
  console.log(message);
  // message为文本内容
  // FromUserName: 'oPKu7jgOibOA-De4u8J2RuNKpZRw',
  // CreateTime: '1359125035',
  // MsgType: 'text',
  // Content: 'http',
  // MsgId: '5837397576500011341' }
  var keyArray = ['你好', '约吗'];
  var content = message.Content;
  var keyIndex = keyArray.indexOf(content);
  switch (keyIndex) {
    case 0:
      {
        res.reply({
          type: "text",
          content: '您好，大家好才是真的好！'
        });

      }
      break;
    case 1:
      {
        res.reply({
          type: "text",
          content: '不约，不约，叔叔我们不约！'
        });

      }
      break;
    default:
      res.reply({
        type: "text",
        content: '服务器挂掉了，你的要求暂时无法满足……'
      });
      break;
  }
}).image(function(message, req, res, next) {
  // message为图片内容
  // { ToUserName: 'gh_d3e07d51b513',
  // FromUserName: 'oPKu7jgOibOA-De4u8J2RuNKpZRw',
  // CreateTime: '1359124971',
  // MsgType: 'image',
  // PicUrl: 'http://mmsns.qpic.cn/mmsns/bfc815ygvIWcaaZlEXJV7NzhmA3Y2fc4eBOxLjpPI60Q1Q6ibYicwg/0',
  // MediaId: 'media_id',
  // MsgId: '5837397301622104395' }}).voice(function(message, req, res, next) {
  // TODO
}).voice(function(message, req, res, next) {
  // message为音频内容
  // { ToUserName: 'gh_d3e07d51b513',
  // FromUserName: 'oPKu7jgOibOA-De4u8J2RuNKpZRw',
  // CreateTime: '1359125022',
  // MsgType: 'voice',
  // MediaId: 'OMYnpghh8fRfzHL8obuboDN9rmLig4s0xdpoNT6a5BoFZWufbE6srbCKc_bxduzS',
  // Format: 'amr',
  // MsgId: '5837397520665436492' }
}).video(function(message, req, res, next) {
  // message为视频内容
  // { ToUserName: 'gh_d3e07d51b513',
  // FromUserName: 'oPKu7jgOibOA-De4u8J2RuNKpZRw',
  // CreateTime: '1359125022',
  // MsgType: 'video',
  // MediaId: 'OMYnpghh8fRfzHL8obuboDN9rmLig4s0xdpoNT6a5BoFZWufbE6srbCKc_bxduzS',
  // ThumbMediaId: 'media_id',
  // MsgId: '5837397520665436492' }
  // TODO
}).shortvideo(function(message, req, res, next) {
  // message为短视频内容
  // { ToUserName: 'gh_d3e07d51b513',
  // FromUserName: 'oPKu7jgOibOA-De4u8J2RuNKpZRw',
  // CreateTime: '1359125022',
  // MsgType: 'shortvideo',
  // MediaId: 'OMYnpghh8fRfzHL8obuboDN9rmLig4s0xdpoNT6a5BoFZWufbE6srbCKc_bxduzS',
  // ThumbMediaId: 'media_id',
  // MsgId: '5837397520665436492' }
  // TODO
}).location(function(message, req, res, next) {
  // message为链接内容
  // { ToUserName: 'gh_d3e07d51b513',
  // FromUserName: 'oPKu7jgOibOA-De4u8J2RuNKpZRw',
  // CreateTime: '1359125022',
  // MsgType: 'link',
  // Title: '公众平台官网链接',
  // Description: '公众平台官网链接',
  // Url: 'http://1024.com/',
  // MsgId: '5837397520665436492' }
  // TODO
}).link(function(message, req, res, next) {
  // message为链接内容
  // { ToUserName: 'gh_d3e07d51b513',
  // FromUserName: 'oPKu7jgOibOA-De4u8J2RuNKpZRw',
  // CreateTime: '1359125022',
  // MsgType: 'link',
  // Title: '公众平台官网链接',
  // Description: '公众平台官网链接',
  // Url: 'http://1024.com/',
  // MsgId: '5837397520665436492' }
  // TODO
}).event(function(message, req, res, next) {
  console.log(message);
  // message为事件内容
  // { ToUserName: 'gh_d3e07d51b513',
  // FromUserName: 'oPKu7jgOibOA-De4u8J2RuNKpZRw',
  // CreateTime: '1359125022',
  // MsgType: 'event',
  // Event: 'LOCATION',
  // Latitude: '23.137466',
  // Longitude: '113.352425',
  // Precision: '119.385040',
  // MsgId: '5837397520665436492' }
  // Event ： subscribe(订阅)、unsubscribe(取消订阅) SCAN
  // EventKey : 事件KEY值，qrscene_为前缀，后面为二维码的参数值
  if (message.Event == 'subscribe') {
    content = '欢迎关注 : ' + message.EventKey
    res.reply({
      type: "text",
      content: content
    });
  }
  else if (message.Event == 'unsubscribe') {
    // notify

  }
  else if (message.Event == 'SCAN') {
    content = '欢收到 : ' + message.EventKey
    res.reply({
      type: "text",
      content: content
    });
  }
  else {
    content = '欢收到 : ' + message.Event
    res.reply({
      type: "text",
      content: content
    });
  }
}).device_text(function(message, req, res, next) {
  // message为设备文本消息内容
  // { ToUserName: 'gh_d3e07d51b513',
  // FromUserName: 'oPKu7jgOibOA-De4u8J2RuNKpZRw',
  // CreateTime: '1359125022',
  // MsgType: 'device_text',
  // DeviceType: 'gh_d3e07d51b513'
  // DeviceID: 'dev1234abcd',
  // Content: 'd2hvc3lvdXJkYWRkeQ==',
  // SessionID: '9394',
  // MsgId: '5837397520665436492',
  // OpenID: 'oPKu7jgOibOA-De4u8J2RuNKpZRw' }
  // TODO
}).device_event(function(message, req, res, next) {
  console.log(message);
  // message为设备事件内容
  // { ToUserName: 'gh_d3e07d51b513',
  // FromUserName: 'oPKu7jgOibOA-De4u8J2RuNKpZRw',
  // CreateTime: '1359125022',
  // MsgType: 'device_event',
  // Event: 'bind'
  // DeviceType: 'gh_d3e07d51b513'
  // DeviceID: 'dev1234abcd',
  // OpType : 0, //Event为subscribe_status/unsubscribe_status时存在
  // Content: 'd2hvc3lvdXJkYWRkeQ==', //Event不为subscribe_status/unsubscribe_status时存在
  // SessionID: '9394',
  // MsgId: '5837397520665436492',
  // OpenID: 'oPKu7jgOibOA-De4u8J2RuNKpZRw' }

}).middlewarify());
module.exports = router;
