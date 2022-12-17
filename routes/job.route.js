const express = require("express");
const jobRouter=express.Router()
const fs=require("fs")
const dotenv=require("dotenv");

const { time } = require("console");
const { JobModel } = require("../models/JobModel");



jobRouter.get("/",async(req,res)=>{
    const data=await JobModel.find().limit(10)
    res.send({"data":data,"msg":"hi"})
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