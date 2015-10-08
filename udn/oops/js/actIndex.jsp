var pageresult = false;
var actStatus = true;
var verifyArea = "驗證碼 <a href='javascript:randomCaptcha()' title='點我重新產生驗證碼'><img class='captcha_img'align='absmiddle' src='/funcap/keyimg' /></a><input class='captcha' type='text' name='captcha' />";
var submitForm = "actScoreing1";
var verifyForm = "";
var d1 = {
  "actTitle": "vote2016",
  "actDesc": "",
  "actWay": "",
  "actGift": "",
  "actHost": "",
  "actAssistant": "",
  "actSponsor": "",
  "startTime": {
    "$date": "2015-09-08T16:00:00.000Z"
  },
  "endTime": {
    "$date": "2015-09-29T16:00:00.000Z"
  },
  "onTime": {
    "$date": "2015-09-08T16:00:00.000Z"
  },
  "limitDevice": 3,
  "limitMember": 32,
  "actChannel": 1024,
  "offTime": null,
  "actCode": "v40",
  "question": "如果明天就投票，你會投給誰",
  "actTemplate": "bar2",
  "topColor": "#ffbc86"
};
var s1 = [3000, 3000, 3000];
var b1 = ["洪XX", "蔡OO", "宋口口"];
var p1 = ["", "", ""];
var c1 = ["#ffc163", "#c1b768", "#ff9378"];
var actCode = "v40";
var newTag = '<h3><span><i></i><a href="/func/vote/3000/?act_code=' + actCode + '">投票</a></span></h3>';
