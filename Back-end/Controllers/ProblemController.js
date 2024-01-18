
var mongoose = require('mongoose')
const models = require('../Models/Problem');

const newproblem = models.problems;

 const getProblems =async (req,res)=>{
   try{
    const newProblem = await newproblem.find({}).sort({createdAt:-1});
    
    return res.status(200).json(newProblem);
   
}
catch(err){
    res.status(404).json({message:err.message})

}
}
const setProblems =async (req,res)=>{
    const {title,description,examples} = req.body;
    try{
        const problemscreate  = await newproblem.create({title,description,examples});
        res.status(200).json(problemscreate);
    
 }
 catch(err){
     res.status(400).json({message:err.message})
 
 }
 }
module.exports ={
    getProblems,
    setProblems
}