// TODO: Define ScoreCardSchema
//   name   : String
//   subject: String
//   score  : Number
// export default model('ScoreCard', scoreCardSchema);
import mongoose from 'mongoose'
const Schema = mongoose.Schema;
// Creating a schema, sort of like working with an ORM
const ScoreCardSchema = new Schema({
    name   : String,
   	subject: String,
    score  : Number,

})
//creating a table within database with the defined schema
const ScoreCard = mongoose.model('ScoreCard', ScoreCardSchema )
export default ScoreCard;


