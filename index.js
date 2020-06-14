const errorMiddleware = require("./middleware/error");

const mail = require("./www/mail");
const index = require("./routes/index");
const problem = require("./routes/problem");
var domain = require("domain");
const express = require("express");
const app = express();

app.use(express.json());

//app.use("/index.html", index);
app.use("/aaa", index);
app.use(express.static("www"));

app.use("/api/mail", mail);
app.use("/problem", problem);

//put in the last one
app.use(errorMiddleware);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));

process.on("uncaughtException", function (err) {
  console.log(err);
  try {
    var killTimer = setTimeout(function () {
      process.exit(1);
    }, 30000);
    killTimer.unref();
    server.close();
  } catch (e) {
    console.log("error when exit", e.stack);
  }
});
