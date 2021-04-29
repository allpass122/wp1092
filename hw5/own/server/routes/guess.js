import express from "express";
import getNumber from "../core/getNumber";
import { writeFile } from "fs/promises";

const router = express.Router();

function roughScale(x, base) {
  const parsed = parseInt(x, base);
  if (isNaN(parsed)) {
    return 0;
  }
  return parsed;
}
// getDateString ref:https://gist.github.com/ntuaha/f4b16ad377505a8519c7
function pad(v) {
  return v < 10 ? "0" + v : v;
}
function getDateString(d) {
  var year = d.getFullYear();
  var month = pad(d.getMonth() + 1);
  var day = pad(d.getDate());
  var hour = pad(d.getHours());
  var min = pad(d.getMinutes());
  var sec = pad(d.getSeconds());
  return `${year}-${month}-${day}-${hour}-${min}-${sec}`;
}

var file;
function myWriteFile(txt) {
  var fs = require("fs");
  if (file === undefined) {
    const D = getDateString(new Date());
    file = `./server/log/${D}.log`;
    fs.open(file, "w", function (err, file) {
      if (err) throw err;
      console.log("Saved!");
    });
  }
  fs.appendFile(file, txt, function (err) {
    if (err) throw err;
    console.log("Replaced!");
  });
}
function myReadFile() {
  var fs = require("fs");
  return fs.readFileSync(file, "utf8");
  /*
  fs.readFile(file, function (err, data) {
    if (err) throw err;
    console.log(data);
    console.log(`DATA:${data.toString()}`);
    return data.toString();
  });
  */
}
// Just call getNumber(true) to generate a random number for guessing game
router.post("/start", (_, res) => {
  getNumber(true);
  myWriteFile(`Start number=${getNumber()} ${getDateString(new Date())}\n`);
  res.json({ msg: "The game has started." });
});

router.get("/guess", (req, res) => {
  var fs = require("fs");
  const number = getNumber();
  const guessed = roughScale(req.query.number, 10);

  console.log(`GUESS ${number}`);

  // check if NOT a num or not in range [1,100]
  if (!guessed || guessed < 1 || guessed > 100) {
    res.status(400).send({ msg: "Not a legal number." });
    myWriteFile(`Guess illegal number ${getDateString(new Date())}\n`);
  } else {
    myWriteFile(`Guess ${guessed} ${getDateString(new Date())}\n`);
    // TODO: check if number and guessed are the same,
    // and response with some hint "Equal", "Bigger", "Smaller"
    if (guessed === number) {
      myWriteFile(`End game ${getDateString(new Date())}\n`);
      res.status(200).send({
        msg: "Equal",
        msg2: fs.readFileSync(file, "utf8").toString().split("\\n"),
      });
    } else if (guessed < number) {
      res.status(200).send({
        msg: "Bigger",
        msg2: fs.readFileSync(file, "utf8").toString().split("\\n"),
      });
    } else {
      res.status(200).send({
        msg: "Smaller",
        msg2: fs.readFileSync(file, "utf8").toString().split("\\n"),
      });
    }
  }
});

// TODO: add router.post('/restart',...)
router.post("/restart", (req, res) => {
  getNumber(true);
  myWriteFile(`Restart number=${getNumber()} ${getDateString(new Date())}\n`);
  res.json({ msg: "The game has started." });
});

export default router;
