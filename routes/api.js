var express = require('express'),
apiRouter = express.Router();

candidate = require('./candidate/candidate')();
score = require('./testScore/testScore')();


apiRouter.get('', (req, res) => {
    res.status(200).send("Node api demo")
})

//=======================candidate api=====================
apiRouter.post('/registerCandidate', candidate.addCandidate);
apiRouter.get('/getCandidate', candidate.getCandidate);
apiRouter.delete('/candidate/:id', candidate.deleteCandidate);

//========================test score api===================
apiRouter.post('/testScore', score.postTestScore);
apiRouter.get('/testScore', score.getTestScore);
apiRouter.get('/highestTestScore', score.getHighestScore);
apiRouter.get('/averageTestScore', score.getAverageTestScore);




module.exports = apiRouter;
