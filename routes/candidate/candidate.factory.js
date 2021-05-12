module.exports = ({
    Candidate
}) => {


//================Add candidates==========================================
// This api will add candidates by their name and email
async function addCandidate(req,res){
    var return_response = { "status": null, "message": null, "data": {} } 
    try {
        let opt = req.body;
        const candidate = new Candidate(opt);
        const doc = await candidate.save();
        return_response.status = 200;
        return_response.message = "Candidate added successfully";
        return_response.data = doc;
    } catch (error) {
        return_response.status = 400;
        return_response.message = String(error);
    }
    res.json(return_response);
}

//=================get All candidates=====================================
//This api will get all the registered candidates
async function getCandidate(req,res){
    var return_response = { "status": null, "message": null, "data": {} } 
    try {
        const doc = await Candidate.find({});
        return_response.status = 200;
        return_response.message = "Success";
        return_response.data = doc;
    } catch (error) {
        return_response.status = 400;
        return_response.message = String(error);
    }
    res.json(return_response);
}

//============delete candidate by their id================================
//This api will delete any particular candidate by their id
async function deleteCandidate(req,res){
    var return_response = { "status": null, "message": null, "data": {} } 
    try {
        const doc = await Candidate.findByIdAndDelete({_id:req.params.id})
        return_response.status = 200;
        return_response.message = "Candidate deleted successfully";
        return_response.data = doc;
    } catch (error) {
        return_response.status = 400;
        return_response.message = String(error);
    }
    res.json(return_response);
 }

return {
    addCandidate,
    getCandidate,
    deleteCandidate
}

}