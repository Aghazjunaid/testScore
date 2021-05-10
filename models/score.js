const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TestScoreSchema = new Schema({
    candidate: {type: Schema.Types.ObjectId, ref:"candidate"},
    round: {type: String, enum: ["first_round", "second_round", "third_round"], default: "first_round" },
    score: {type: Number, required: true }
},{ timestamps:true })


TestScore = mongoose.model("testScore", TestScoreSchema); 
// testScore will be fields in our database

module.exports={ 
    TestScore
}