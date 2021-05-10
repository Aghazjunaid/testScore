const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CandidateSchema = new Schema({
    name: {type: String, required: true, },
    email: {type: String, unique: true, required: true },
},{ timestamps:true })


Candidate = mongoose.model("candidate", CandidateSchema); 
// candidate will be fields in our database

module.exports={ 
    Candidate
}