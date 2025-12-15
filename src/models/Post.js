const mongoose = require("mongoose")

const PostSchema = new mongoose.Schema({
  platform: String,
  text: String,
  intent: String,
  confidence: Number,
  reply: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model("Post", PostSchema)