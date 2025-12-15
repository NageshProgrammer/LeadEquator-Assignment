const express = require("express")
const { body, validationResult } = require("express-validator")
const Post = require("../models/Post")
const score = require("../utils/scorer")

const router = express.Router()

router.get("/health", (req,res) => {
  res.json({ status: "ok" })
})

router.post("/ingest", body().isArray(), async (req,res) => {
  const posts = req.body
  let saved = 0
  for (const p of posts) {
    const s = score(p.text)
    await Post.create({ ...p, ...s })
    saved++
  }
  res.json({ saved })
})

router.post("/score", body("text").notEmpty(), (req,res) => {
  const result = score(req.body.text)
  res.json(result)
})

router.get("/leads", async (req,res) => {
  const leads = await Post.find({ intent: "high" }).sort({ createdAt: -1 }).limit(20)
  res.json(leads)
})

router.get("/dashboard", async (req,res) => {
  const totalPosts = await Post.countDocuments()
  const highIntent = await Post.countDocuments({ intent: "high" })
  const today = new Date()
  today.setHours(0,0,0,0)
  const todayHigh = await Post.countDocuments({ intent: "high", createdAt: { $gte: today } })
  res.json({ totalPosts, highIntent, todayHigh })
})

module.exports = router