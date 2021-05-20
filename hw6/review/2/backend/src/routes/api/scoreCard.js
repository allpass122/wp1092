import { Router } from 'express';
import ScoreCard from '../../models/ScoreCard';

const router = Router();

router.post('/create-card', async function (req, res) {
  try {
    // TODO:
    // - Create card based on { name, subject, score } of req.xxx
    // - If {name, subject} exists,
    //     update score of that card in DB
    //     res.send({card, message}), where message is the text to print
    //   Else
    //     create a new card, save it to DB
    //     res.send({card, message}), where message is the text to print
    const {name, subject, score} = req.body
    const card = {name, subject, score}
    const exist = await ScoreCard.exists({name, subject});
    console.log("exist:", exist)
    if(exist){
      await ScoreCard.findOne({name, subject}).then(
        aCard =>{
          aCard.score = score
          aCard.save()
          // try{
          //   aCard.save();
          // }catch(e){
          //     throw new Error("DB save error: "+ e)
          // }
        }
      )
      // const message = "Updating" + JSON.stringify((name, subject, score))
      const message = "Updating ("+ String(name) +", "+ String(subject) +", "+ String(score)+")"
      console.log("message:", message)
      res.send({card, message})
    }
    else{
      const newCard = new ScoreCard(card)
      try{
        await newCard.save();
      }catch(e){
          throw new Error("DB save error: "+ e)
      }
      const message = "Adding ("+ String(name) +", "+ String(subject) +", "+ String(score)+")"
      console.log("message:", message)
      res.send({card, message})
    }

    ScoreCard.find({}, function(err, result){
      console.log("DB",result)
    })
   
  } catch (e) {
    res.json({ message: 'Something went wrong...' });
  }
});

// TODO: delete the collection of the DB
// router.delete(...)
router.delete('/clear', async function(req, res){
  try{
    await ScoreCard.deleteMany({})
  }catch(e){
    throw new Error("DB remove error: ", e)
  }
  const message = "Database cleared"
  console.log("message:", message)
  res.send({message})

  await ScoreCard.find({}, function(err, result){
    console.log("DB",result)
  })
});

// TODO: implement the DB query
// route.xx(xxxx)
router.get('/query', async function(req, res){
  // console.log(req.query)
  const { queryType, queryString} = req.query
  switch(queryType){
    case 'name': {
      await ScoreCard.find({name: queryString},'-__v -_id', function(err, result){
        if(err){ throw new Error('DB query error: ', err)}
        else{
          // console.log(result)
          if(result.length === 0){
            const msg = "Name ("+queryString+") not found!"
            res.send({message:msg})
          }
          else{
            const msg = "Query success."
            res.send({messages:result})
            // res.send({messages:result, message:messages})
          }
        }
      })
      break;
    }
    case 'subject':{
      await ScoreCard.find({subject: queryString},'-__v -_id', function(err, result){
        if(err){ throw new Error('DB query error: ', err)}
        else{
          if(result.length === 0){
            const msg = "Subject ("+queryString+") not found!"
            res.send({message:msg})
          }
          else{
            const msg = "Query success."
            res.send({messages:result})
          }
        }
      })
      break
    }
    default:
      break;
  }
})

router.get('/logic-query', async function(req, res){
  // console.log(req.query)
  const { queryLogic, queryName, querySubject} = req.query
  switch(queryLogic){
    case 'and':{
      await ScoreCard.find({name: queryName, subject:querySubject},'-__v -_id', function(err, result){
        if(err){ throw new Error('DB query error: ', err)}
        else{
          // console.log(result)
          if(result.length === 0){
            const msg = "{Name ("+queryString+"), subject ("+querySubject+")} not found!"
            res.send({message:msg})
          }
          else{
            const msg = "Query success."
            res.send({data:result})
          }
        }
      })
      break;
    }
    case 'or':{
      await ScoreCard.find().or([{ name: queryName }, { subject: querySubject }]).select('-__v -_id')
      .then(result => {
        if(result.length === 0){
          const msg = "{Name ("+queryString+") or subject ("+querySubject+")} not found!"
          res.send({message:msg})
        }
        else{
          const msg = "Query success."
          res.send({data:result})
        }
      })
      .catch(err => { throw new Error('DB query error: ', err) })
      break;
    }
    default:
      break;
  }

})

export default router;
