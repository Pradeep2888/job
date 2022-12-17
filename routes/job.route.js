const express = require("express");
const jobRouter=express.Router()
const fs=require("fs")
const dotenv=require("dotenv");

const { time } = require("console");
const { JobModel } = require("../models/JobModel");



jobRouter.get("/",async(req,res)=>{
    const {page,filter}=req.query
   
    if( filter==="" && Number(page)>1){
        const data=await JobModel.find().limit(10).skip(Number(page)*10)
        console.log(data)
        res.send({"data":data,"msg":"hi"})
    }
    else if(filter!=="" && Number(page)){
        const data=await JobModel.find({"role":filter}).limit(10).skip(Number(page)*10)
        console.log(data)
        res.send({"data":data,"msg":"hi"})
    }
    else{
        const data=await JobModel.find().limit(10)
        res.send({"data":data,"msg":"hi"})
    }
   
})

jobRouter.post("/addjob",async(req,res)=>{
    const {company,postedAt,city,location,role,level,contract,position,language}=req.body
    
    const new_job= new JobModel({
       company,
       postedAt,
       city,
       location,
       role,
       level,
       contract,
       position,
       language
    })
    await new_job.save()

    res.send({new_job})
})


module.exports={jobRouter}