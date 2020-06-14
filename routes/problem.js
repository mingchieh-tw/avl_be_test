const Joi = require("joi");
const express = require("express");
const router = express.Router();
const firebase = require("firebase");

const app = firebase.initializeApp({
  databaseURL: "https://nodejs1-jackie.firebaseio.com/",
});

const database = app.database();

router.get("/:question_id", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Request-Method", "*");
  res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET");
  res.setHeader("Access-Control-Allow-Headers", "*");

  database
    .ref("/")
    .once("value", (e) => {
      let dataObj = e.val();
      let html = "";
      for (let i in dataObj) {
        html = `${html}<div>${dataObj[i]}</div>`;
      }
      console.log(e.val());
      res.end(html);
    })
    .then(() => {
      firebase.app().delete();
    });
});

//把Google Sheet的資料輸入到Firebase資料庫。
router.put("import"),
  async (req, res) => {
    /*
    var ss = SpreadsheetApp.openById(
      "1EmWraWzyvxt7km7MiPxU6PDTXzy05_jUyvwUqHc5nP0"
    );
    var sheet = ss.getSheets()[0];
    var data = sheet.getDataRange().getValues();
    var dataToImport = {};
    for (var i = 1; i < data.length; i++) {
      var question_id = data[i][0];
      dataToImport[question_id] = {
        question_id: question_id,
        question_text: data[i][2],
        answer: data[i][3],
        question_title: data[i][4],
        department: data[i][5],
        hashtags: data[i][6],
        topics_algebra: data[i][7],
        topics_geometry: data[i][8],
        topics_trignometry: data[i][9],
        topics_arithmetic: data[i][10],
        calculator: data[i][11],
        answer_type: data[i][12],
        chart: data[i][13],
        length: data[i][14],
      };
    }
    var firebaseUrl = "https://nodejs1-jackie.firebaseio.com/";
    var base = FirebaseApp.getDatabaseByUrl(firebaseUrl);
    base.setData("", dataToImport);
*/
    console.log("in");
    res.send("success");
  };

router.get("/preview", async (req, res) => {
  //const { error } = validateEmailData(req.body);
  //if (error) return res.status(400).send(error.details[0].message);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Request-Method", "*");
  res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET");
  res.setHeader("Access-Control-Allow-Headers", "*");

  database
    .ref("/")
    .once("value", (e) => {
      let dataObj = e.val();
      let html = "";
      for (let i in dataObj) {
        html = `${html}<div>${dataObj[i]}</div>`;
      }
      console.log(e.val());
      res.end(html);
    })
    .then(() => {
      firebase.app().delete(); // 讀取完成後刪除 firebase 宣告
    });

  res.send("<h1>helloworld</h1>");
});

module.exports = router;
