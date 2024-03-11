var express = require('express');

var router = express.Router();
const bqgFetch = require("./bqg")
const mwFetch = require("./mw")
const zdFetch = require("./zd")
const jmFetch = require("./jm")
const { f1, f2 } = require("./OCR")

/* GET users listing. */
router.get('/bqg', async function (req, res, next) {
  img = await bqgFetch(req.query.url);
  //res.send(img);
  res.setHeader("Content-Type", "image/jpg");
  res.end(img);
});

//漫蛙
router.get('/mw', async function (req, res, next) {
  img = await mwFetch(req.query.url);
  //res.send(img);
  res.setHeader("Content-Type", "image/jpg");
  res.end(img);
});

//值得
router.get('/zd', async function (req, res, next) {
  let json = await zdFetch(req.query.key);
  res.send(json);
});


//OCR
router.get('/imgUrl', async function (req, res, next) {
  /*
  let aaa = await f1(req.query.url);
  //let aaa = await f2(url)
  let data = Buffer.from(aaa).toString('base64')
  console.log("base64完成");
  let aa = await f2("https://api.xhofe.top/ocr/b64/text", data)
  console.log('识别成功');
  */
  let b64 = await f1(req.query.url)
  let json = await f2('https://ocr-18675963263.koyeb.app/ocr/b64/text', b64);
  res.send(json);
});

//禁漫
router.get('/jm', async function (req, res, next) {
  let url = req.query.url;
  let aid = req.query.aid;
  let filename = req.query.filename;
  //console.log(url, aid ,filename);
  let img = await jmFetch(url, aid, filename);
  res.setHeader("Content-Type", "image/jpg");
  res.end(img);
});

module.exports = router;
