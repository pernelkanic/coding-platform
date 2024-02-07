
const express = require('express')
const router = express.Router();
var {submitProblem} = require('../Controllers/SaveProblemController')

router.post('/' , submitProblem);
// router.delete('/:id' , deleteProblem);
// router.post('/', createProblem);
module.exports = router;