const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({

title:String,
date:String,
desc:String,
image:String

});

module.exports = mongoose.model("Event",EventSchema);