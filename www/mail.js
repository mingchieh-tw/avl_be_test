const Joi = require("joi");
const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "mingchieh.tw@gmail.com",
    pass: "hnbdaajacqxnppgx",
    //user: process.env.EMAIL,
    //pass: process.env.PASSWORD,
  },
});

router.get("/", async (req, res) => {
  const { error } = validateEmailData(req.body);
  //if (error) return res.status(400).send(error.details[0].message);

  res.send("<h1>helloworld</h1>");
});

router.post("/", async (req, res) => {
  const { error } = validateEmailData(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  console.log(req.body);

  let mailOptions = {
    from: "mingchieh.tw@gmail.com",
    to: "hr@avancevl.com",
    //to: "mingchieh.cs94g@g2.nctu.edu.tw",
    subject: req.body.topic,
    text: req.body.content,
  };

  transporter
    .sendMail(mailOptions)
    .then(() => {
      return res.send("success: " + req.body);
    })
    .catch((error) => {
      console.log("Email sent: " + JSON.stringify(error));
      return res.status(500).send("send email failed");
    });

  //res.send("<h1>helloworld</h1>" + req.body);
});

function validateEmailData(mailData) {
  const schema = {
    topic: Joi.string().required(),
    content: Joi.string(),
  };

  return Joi.validate(mailData, schema);
}

module.exports = router;
