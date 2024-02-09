const {getProblems,setProblems} = require('../Controllers/ProblemController')
const express = require('express')
const router = express.Router();

router.get('/' , getProblems);
router.post('/' , setProblems);

// router.delete('/:id' , deleteProblem);
// router.post('/', createProblem);
module.exports = router;