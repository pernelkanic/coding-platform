var mongoose = require('mongoose')
const models = require('../Models/User');
const submitprob = models.Users;
const submitProblem =async (req,res)=>{
    const {Name,Code,Status} = req.body;
   console.log(Code);
    try{
     
        const problemscreate  = await submitprob.updateOne({ firstName:"Venkata" },
        {
            $set:{
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
 catch(err){
     res.status(400).json({message:err.message})
 
 }
 }
module.exports ={

    submitProblem
}