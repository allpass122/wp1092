import { Router } from 'express';
import ScoreCard from '../../models/ScoreCard';

const router = Router();

router.post('/create-card', async function (req, res) {
  	try {
	//const card = true
		const { name, subject, score } = req.body
		const scoreCard = new ScoreCard({name,subject,score})
		//await scoreCard.save();
		//res.json({ message: name+subject+score ,card:true});
		//const flagname = ScoreCard.find({name:name})
		//console.log(flagname)
		//ScoreCard.findOneAndUpdate({name:name},{score:100})
		const flagname = await ScoreCard.find({name : name });
		const flagsubject = await ScoreCard.find({subject : subject });
		const flag = await ScoreCard.find({subject : subject, name:name });
		console.log(flag.length)
		if (flag.length !==0 ){
			console.log('already exist')
			let doc = ScoreCard.findOneAndUpdate({name:name,subject:subject},{score:score},null,
				function (err, docs) { 
					if (err){ 
						console.log(err) 
					} 
					else{ 
						console.log("Original Doc:",docs); 
					} })
			console.log(doc.score)
			res.send({ message:'Updating'+'-'+ name +'-'+ subject +'-'+ score , card:true});
		}
		else{

			await scoreCard.save();
			res.send({ message:'Adding'+'-'+name+'-'+subject+'-'+ score , card:true});

		}
		//const update = await ScoreCard.findOneAndUpdate({name : 'jimmy'},{score : 100})
		console.log(flagname.length)
		//const flagsubject = ScoreCard.collection.find( { subject: {subject} } ,{name,subject})
		// if( flagname ){
		// 	//await scoreCard.save();
		// 	await console.log(exist)
		// }
		// else{
		// 	await scoreCard.save();
		// 	res.json({ message: 'Adding'+name,subject,score , card:true});
		// }
		

    
    // TODO:
    // - Create card based on { name, subject, score } of req.xxx
    // - If {name, subject} exists,
    //     update score of that card in DB
    //     res.send({card, message}), where message is the text to print
    //   Else
    //     create a new card, save it to DB
    //     res.send({card, message}), where message is the text to print
	} catch (e) {
		res.json({ message: 'Something went wrong...'});
	}
	}
);

// TODO: delete the collection of the DB
// router.delete(...)
router.post('/deleted', async function (req, res) {
	await ScoreCard.deleteMany({},()=>{console.log('deleted')})
	res.json({ message: 'Database cleared'});
})
// TODO: implement the DB query
// route.xx(xxxx)
router.post('/query', async function (req, res) {
	const { queryType , queryString } = req.body
	if(queryType === 'name'){
		console.log(11)
		await ScoreCard.find({name:queryString},{score:1,subject:1,_id:0},(err,data)=>{
			if(err){
				console.log(err)
			}else{
				console.log({data})
				if(data.length !== 0){
					res.send( {messages : JSON.stringify(data) , message:'exist'})
					console.log('exist')
				}else{
					console.log('isnot exist')
					res.send( {messages:null, message: queryString +'is not exist'})
				}
			}
		})
	
	}
	else{
		console.log(222)
		await ScoreCard.find({subject:queryString},{name:1,score:1,_id:0},(err,data)=>{
			if(err){
				console.log(err)
			}else{
				console.log({data})
				if(data.length !== 0){
					res.json( {messages : JSON.stringify(data) , message:'exist'})
					console.log('exist')
				}else{
					console.log('isnot exist')
					res.send( { messages:null, message:queryString +'is not exist'})
				}
			}
		})
		//await ScoreCard.find({subject:queryString})
	}
	//await res.send( {messages : queryType , message:queryType})

})
export default router;
