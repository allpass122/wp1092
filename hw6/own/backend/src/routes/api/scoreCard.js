import { Router } from "express";
import ScoreCard from "../../models/ScoreCard";

const router = Router();

router.post("/create-card", async function (req, res) {
  try {
    // TODO:
    // - Create card based on { name, subject, score } of req.xxx
    // - If {name, subject} exists,
    //     update score of that card in DB
    //     res.send({card, message}), where message is the text to print
    //   Else
    //     create a new card, save it to DB
    //     res.send({card, message}), where message is the text to print
    const name = req.body.name;
    const subject = req.body.subject;
    const score = req.body.score;

    const existing = await ScoreCard.findOne({ name, subject });
    const newScoreCard = new ScoreCard({ name, subject, score });
    if (existing) {
      //ScoreCard.updateOne({ name: name }, { score: score });
      const R = await ScoreCard.updateOne(
        { name: name, subject: subject },
        { score: score }
      );
      console.log(R);
      console.log(`ScoreCard update ${newScoreCard}\n`);
      const msg = `Updating (${name}, ${subject}, ${score})`;
      res.send({ newScoreCard, msg });
    } else {
      await newScoreCard.save();

      console.log(`Created ScoreCard ${newScoreCard}`);
      const msg = `Adding (${name}, ${subject}, ${score})`;
      res.send({ newScoreCard, msg });
    }
  } catch (e) {
    console.log(`error: ${e}`);
    res.json({ msg: "Something went wrong..." });
  }
});

// TODO: delete the collection of the DB
// router.delete(...)
router.delete("/clear", async function (req, res) {
  try {
    await ScoreCard.deleteMany({});
    console.log("Database cleared");
    res.send({ message: `Database cleared` });
  } catch (e) {
    res.json({ message: "Delete fail..." });
  }
});
// TODO: implement the DB query
// route.xx(xxxx)
router.post("/query-card", async function (req, res) {
  try {
    const queryString = req.body.queryString;
    const queryType = req.body.queryType;
    const cmp = req.body.cmp;
    var queryParam = {};

    if (queryType == "score") {
      var queryParam2 = {};
      queryParam2["$" + cmp] = queryString;
      queryParam[queryType] = queryParam2;
    } else {
      queryParam[queryType] = queryString;
    }
    const existing = await ScoreCard.find(queryParam).exec(function (
      error,
      result
    ) {
      console.log("error: " + error);
      console.log("result: " + result);
      console.log(`res:${result}end${typeof result}`);
      if (!result.length) {
        console.log(`Not found { ${queryType}: ${queryString} }\n`);
        res.send({
          messages: undefined,
          message: `${queryType} (${queryString}) not found!`,
        });
      } else {
        console.log(`Find`);
        //const results = result.toString();
        console.log(result);
        const results = result.map(
          (m) =>
            `Name: ${m["name"]}, Subject: ${m["subject"]}, Score: ${m["score"]}`
        );
        res.send({ messages: results, message: results });
      }
    });
  } catch (e) {
    res.json({ message: "Something went wrong..." });
  }
});
export default router;
