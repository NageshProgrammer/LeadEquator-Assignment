const request = require("supertest")
const express = require("express")

const app = express()
app.use(express.json())
app.use("/api", require("../src/routes/api"))

test("health check", async () => {
  const res = await request(app).get("/api/health")
  expect(res.body.status).toBe("ok")
})

test("score high intent", async () => {
  const res = await request(app).post("/api/score").send({ text: "looking for best saas tool" })
  expect(res.body.intent).toBe("high")
})

test("score low intent", async () => {
  const res = await request(app).post("/api/score").send({ text: "hello world" })
  expect(res.body.intent).toBe("low")
})