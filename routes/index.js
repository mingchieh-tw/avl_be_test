const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const { error } = validateEmailData(req.body);
  res.send("<h1>helloworld</h1>");
});

module.exports = router;
