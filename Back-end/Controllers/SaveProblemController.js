var mongoose = require('mongoose')
const models = require('../Models/User');
const index = require('../index');
const submitprob = models.Users;

const submitProblem =async (req,res)=>{
    const {Name,Code,Status} = req.body;
  
    try{
     if(Name && Code && Status){
        const problemscreate  = await submitprob.updateOne({clerkUserId:`${req.params.id}` },
        {
            $push:{
                "problems":{
                    "Name":`${Name}`,
                    "Code":`${Code}`,
                    "Status":`${Status}`
                }
            },
            $currentDate: { lastUpdated: true }
          }
        );
        res.status(200).json(problemscreate);
    }
    else{
        const err = "write some code";
        res.status(400).json(err);
    }
        
    
 }
 catch(err){
     res.status(400).json({message:err.message})
 
 }
 }
 const getProblem = async(req,res)=>{
    
    try{
        const getProblem = await submitprob.findOne({clerkUserId:`${req.params.id}` })
        const problemtitle = getProblem.problems;
        res.status(200).json({problemtitle});

    }
    catch(err){
        res.status(400).json({message:err.message})
    }
 }
module.exports ={
    getProblem,
    submitProblem
}