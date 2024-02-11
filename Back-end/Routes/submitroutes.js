
const express = require('express')
const router = express.Router();
var {submitProblem,getProblem} = require('../Controllers/SaveProblemController')
router.get('/:id' , getProblem);
router.post('/:id' , submitProblem);
// router.delete('/:id' , deleteProblem);
// router.post('/', createProblem);


module.exports = router;
