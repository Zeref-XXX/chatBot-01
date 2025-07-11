import express from 'express';
import dotenv from 'dotenv';

import cors from "cors";
import main from './Neko.js';

dotenv.config();

const app = express();
app.use(express.json())
app.use(cors());
  
const Port = process.env.PORT | 4000; 
const Key = process.env.GEN; 

if (!Key) {
  console.warn("⚠️ GEN API key is missing. Check your .env file.");
}

app.get('/ping', (req, res) => {
  res.send("working");
});

app.get('/', (req, res) => {
  res.send("pong");
});
 

app.post('/api/chat', async (req, res) => {
  try {
    req.body.key=Key;
    const input = req.body;

    if (!input?.message) {
      return res.status(400).json({ message: "Missing 'message' in request body." });
    }

    // console.log(input.message);
    const response = await main(input);

    // console.log("🧠 Gemini response:", response);
    // res.send(response)
    res.json({ message: response });

  } catch (err) {
    console.error("❌ Error in /api/chat:", err.message);

    if (err.message.includes("model is overloaded")) {
      return res.status(503).json({
        message: "😿 Neko is overwhelmed... try again in a moment.",
      });
    }

    res.status(500).json({
      message: "Something went wrong on the server.",
      error: err.message,
    });
  }
});


app.listen(Port, () => {
  console.log(`🚀 Server is listening on ${Port}`);
});
