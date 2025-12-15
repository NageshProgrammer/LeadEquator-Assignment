const high = ["recommend","looking for","best saas","alternative to","need tool","budget","pricing","switching"]
const medium = ["how to","any good","suggestions"]

module.exports = (text) => {
  const t = text.toLowerCase()
  let intent = "low"
  let confidence = 0.3
  let reply = ""

  if (high.some(w => t.includes(w))) {
    intent = "high"
    confidence = 0.9
    reply = "Thanks for the post! We help exactly with this – mind if I DM you a quick suggestion?"
  } else if (medium.some(w => t.includes(w))) {
    intent = "medium"
    confidence = 0.6
  }

  return { intent, confidence, reply }
}