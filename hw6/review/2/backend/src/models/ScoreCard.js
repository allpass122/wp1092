// TODO: Define ScoreCardSchema
//   name   : String
//   subject: String
//   score  : Number
// export default model('ScoreCard', scoreCardSchema);
import mongoose from 'mongoose';

const Schema = mongoose.Schema
const scoreCardSchema = new Schema({
    name:{
        type: String,
        required: [true, "Please fill the name."]
    },
    subject:{
        type: String,
        required: [true, "Please fill the subject."]
    },
    score:{
        type: Number,
        required:[true, "Please fill the score."]
    },
})

const ScoreCard = mongoose.model("ScoreCard", scoreCardSchema)

export default ScoreCard;