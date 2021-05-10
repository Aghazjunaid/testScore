module.exports = ({
    TestScore
}) => {

//================post score based on each round============================
//This api will add score of any particular round
async function postTestScore(req,res){
    var return_response = { "status": null, "message": null, "data": {} } 
    try {
        let opt = req.body;
        const score = new TestScore(opt);
        const doc = await score.save();
        return_response.status = 200;
        return_response.message = "Test Score added successfully";
        return_response.data = doc;
    } catch (error) {
        return_response.status = 400;
        return_response.message = String(error);
    }
    res.json(return_response);
}

//=============get all test score details=================================
//This api will get all the test score of candidate
async function getTestScore(req,res){
    var return_response = { "status": null, "message": null, "data": {} } 
    try {
        const doc = await TestScore.find({}).populate("candidate");
        return_response.status = 200;
        return_response.message = "Success";
        return_response.data = doc;
    } catch (error) {
        return_response.status = 400;
        return_response.message = String(error);
    }
    res.json(return_response);
}

//===========get highest scoring candidate by selecting round==================
async function getHighestScore(req,res){
    var return_response = { "status": null, "message": null, "data": {} } 
    try {
        let opt = req.body
        let max = 0
        //doc contain all the test score data of opt.round 
        const doc = await TestScore.find({round:opt.round}).populate("candidate");
        //This for loop will work upto doc length and it will compare every doc score data 
        //and finally return maxm score data
        for( var i = 0, length = doc.length; i < length; i++ ) {
            if (doc[i]._doc.score > max){
                max = doc[i]._doc.score 
            }
        }
        //Now again serach in our doc whose score matches with maxm score from above loop
        const highestMarksScorer = doc.find(el => el.score === max) 
        //Now collect related information from highestMarksScorer and manipulate it accoring to 
        //our output needs
        const highestMarksScorerDetails = {
            Candidate : highestMarksScorer._doc.candidate._doc.name,
            Round_number : opt.round,
            Test_score : highestMarksScorer._doc.score
        }
        return_response.status = 200;
        return_response.message = "Success";
        return_response.data = highestMarksScorerDetails;
    } catch (error) {
        return_response.status = 400;
        return_response.message = String(error);
    }
    res.json(return_response);
}

//==============get average score per round for all candidates============
async function getAverageTestScore(req,res){
    var return_response = { "status": null, "message": null, "data": {} } 
    try {
        let opt = req.body;
        let sum = 0;
        //doc contain all the test score data of opt.round 
        const doc = await TestScore.find({round:opt.round});
        //This for loop will work upto doc length and it will add every doc score data 
        //and finally return total score sum 
        for( var i = 0, length = doc.length; i < length; i++ ) {
            sum += doc[i]._doc.score 
        }
        //find the average by dividing the sum by doc length
        const averageScoreDetails = {
            round : opt.round,
            Average_score : (sum/doc.length)
        }
        return_response.status = 200;
        return_response.message = "Success";
        return_response.data = averageScoreDetails;
    } catch (error) {
        return_response.status = 400;
        return_response.message = String(error);
    }
    res.json(return_response);
}
  


return {
    postTestScore,
    getTestScore,
    getHighestScore,
    getAverageTestScore
}

}