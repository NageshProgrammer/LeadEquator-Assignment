Leadequator – MVP Backend

This repository contains a Node.js + Express + MongoDB backend built as part of the
Leadequator MVP Backend Assignment.

The purpose of this backend is to ingest scraped social posts (Reddit, Quora, LinkedIn style),
analyze buying intent using simple keyword-based logic, store the data, and return
high-intent leads with a suggested reply.

The implementation is intentionally kept simple, readable, and production-ready
for an MVP use case.


TECH STACK

- Node.js (18+)
- Express.js
- MongoDB
- Mongoose
- dotenv
- express-validator
- Jest (basic tests)


PROJECT STRUCTURE

leadequator-backend/
|
|-- server.js
|-- .env
|-- package.json
|-- README.md
|
|-- src/
|   |-- config/
|   |   |-- db.js
|   |
|   |-- models/
|   |   |-- Post.js
|   |
|   |-- routes/
|   |   |-- api.js
|   |
|   |-- utils/
|   |   |-- scorer.js
|
|-- tests/
    |-- api.test.js



SETUP INSTRUCTIONS

1. Clone the repository

git clone https://github.com/NageshProgrammer/LeadEquator-Assignment
cd leadequator-backend

2. Install dependencies

npm install

3. Create environment file

Create a file named .env in the project root and add:

PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/leadequator

Make sure MongoDB is running locally.

4. Start the server

npm start

You should see:
Server running on port 5000

5. Run tests (optional)

npm test

API ENDPOINTS


1. Health Check

GET /api/health

Response:
{
  "status": "ok"
}


2. Ingest Social Posts

POST /api/ingest

Accepts an array of scraped social posts and stores them after scoring intent.

Request Body:
[
  { "platform": "reddit", "text": "Looking for best SaaS CRM tool with pricing" },
  { "platform": "linkedin", "text": "Any good alternatives to HubSpot?" },
  { "platform": "quora", "text": "Hello everyone" }
]

Response:
{
  "saved": 3
}


3. Score Intent (On-Demand)

POST /api/score

Scores a single text input without storing it in the database.

Request Body:
{
  "text": "Looking for best SaaS CRM tool with pricing"
}

Response:
{
  "intent": "high",
  "confidence": 0.9,
  "reply": "Thanks for the post! We help exactly with this – mind if I DM you a quick suggestion?"
}


4. Get High-Intent Leads

GET /api/leads

Returns the latest high-intent posts (maximum 20).

Response:
[
  {
    "platform": "reddit",
    "text": "Looking for best SaaS CRM tool with pricing",
    "intent": "high",
    "confidence": 0.9,
    "reply": "Thanks for the post! We help exactly with this – mind if I DM you a quick suggestion?",
    "createdAt": "2025-12-15T10:30:00.000Z"
  }
]


5. Dashboard Stats (Bonus)

GET /api/dashboard

Response:
{
  "totalPosts": 124,
  "highIntent": 18,
  "todayHigh": 7
}


INTENT SCORING LOGIC

The intent scoring logic is rule-based and designed for MVP simplicity.

High Intent Keywords:
- recommend
- looking for
- best saas
- alternative to
- need tool
- budget
- pricing
- switching from

Medium Intent Keywords:
- how to
- any good
- suggestions

Low Intent:
Any post that does not match the above keywords.

Confidence Scores:
- High intent: approximately 0.9
- Medium intent: approximately 0.6
- Low intent: approximately 0.3

For high-intent posts, an automatic reply is generated to simulate lead engagement.


NOTES

- The backend avoids heavy machine learning to keep the MVP simple and explainable.
- The logic is modular and easy to extend.
- The dashboard endpoint is API-based only (no frontend UI required).


AUTHOR

Nagesh Yalparatte
Leadequator MVP Backend Assignment
December 2025
