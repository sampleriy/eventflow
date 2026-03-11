const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static("public"));

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));

const Event = require("./models/Event");

let bookings = [];

/* LOGIN */
app.post("/api/login",(req,res)=>{
const {username,password}=req.body;

if(username===process.env.ADMIN_USER && password===process.env.ADMIN_PASS){
res.json({success:true});
}else{
res.json({success:false});
}
});

/* GET EVENTS */
app.get("/api/events",async(req,res)=>{
const events = await Event.find();
res.json(events);
});

/* CREATE EVENT */
app.post("/api/events",async(req,res)=>{
const event = new Event(req.body);
await event.save();
res.json(event);
});

/* DELETE EVENT */
app.delete("/api/events/:id",async(req,res)=>{
await Event.findByIdAndDelete(req.params.id);
res.json({message:"Event deleted"});
});

/* BOOKINGS */
app.get("/api/bookings",(req,res)=>{
res.json(bookings);
});

app.post("/api/bookings",(req,res)=>{
const booking = {id:Date.now(),...req.body};
bookings.push(booking);
res.json(booking);
});

app.listen(process.env.PORT,()=>{
console.log("Server running on http://localhost:3000");
});
app.post("/api/events", async (req, res) => {

const event = new Event({
title: req.body.title,
date: req.body.date,
desc: req.body.desc
});

await event.save();

res.json(event);

});