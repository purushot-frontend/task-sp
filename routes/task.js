const router = require("express").Router();
const fs = require("fs");
const cookieMiddlware = require("./../utils/cookieMiddleware");

router.route("/cookie").get(cookieMiddlware, (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Cookie is present",
  });
});

router.route("/json").get((req, res) => {
  const data = JSON.parse(fs.readFileSync("./../public/sample.json", "utf8"));

  res.status(200).json({
    status: "success",
    data,
  });
});

router.route("/pdf").get((req, res) => {
  let data = fs.readFileSync("./../public/sample.pdf");
  res.contentType("application/pdf");
  res.send(data);
});

router.route("/csv").get((req, res) => {
  //inspired by example from https://www.geeksforgeeks.org/how-to-convert-csv-to-json-file-having-comma-separated-values-in-node-js/

  csv = fs.readFileSync("./../public/result.csv");
  var array = csv.toString().split("\r");

  let result = [];

  let headers = array[0].split(", ");

  for (let i = 1; i < array.length - 1; i++) {
    let obj = {};

    let str = array[i];
    let s = "";

    let flag = 0;
    for (let ch of str) {
      if (ch === '"' && flag === 0) {
        flag = 1;
      } else if (ch === '"' && flag == 1) flag = 0;
      if (ch === ", " && flag === 0) ch = "|";
      if (ch !== '"') s += ch;
    }

    let properties = s.split("|");

    for (let j in headers) {
      if (properties[j].includes(", ")) {
        obj[headers[j]] = properties[j].split(", ").map((item) => item.trim());
      } else obj[headers[j]] = properties[j];
    }

    result.push(obj);
  }

  let json = JSON.stringify(result);

  res.status(200).json({
    status: "success",
    data: json,
  });
});

module.exports = router;
