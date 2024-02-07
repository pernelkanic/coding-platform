var mongoose = require('mongoose')
const models = require('../Models/User');
const submitprob = models.Users;
const submitProblem =async (req,res)=>{
    const {name,code,status} = req.body;
    try{
        const updateDoc = {
            $set: {
                "problems.Name": `${name}`,
            },
            $set: {
                "problems.Code":`${code}`,
            },
            $set: {
                "problems.$[].Status":`${status}`
            }
          };

        const problemscreate  = await submitprob.updateOne(updateDoc);
       
        res.status(200).json(problemscreate);
    
 }
 catch(err){
     res.status(400).json({message:err.message})
 
 }
 }
module.exports ={

    submitProblem
}