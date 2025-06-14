// File: api/getQuiz.js
import { InferenceClient } from "@huggingface/inference";

function extractJSONFromLLMResponse(response) {
    const cleaned = response.replace(/```json|```/g, '').trim();
    try {
        return JSON.parse(cleaned);
    } catch (error) {
        console.error("JSON parsing failed:", error);
        return null;
    }
}

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allow any origin
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }
    const { topics = "", numQuestions = 10, numMCQs = 3 } = req.query;

    const HF_TOKEN = process.env.VITE_HF_TOKEN; // backend env var (NOT prefixed with VITE_)
    if (!HF_TOKEN) {
        return res.status(500).json({ error: "Missing HuggingFace token" });
    }
    console.log("token ok");
    const client = new InferenceClient(HF_TOKEN);
    const prompt = `
    You are a quiz-generating assistant. Generate a Multiple Choice quiz in JSON format based on the following parameters:

    - Topics: [${topics}]
    - Total Number of Questions: ${numQuestions} of which,
    - Total Number of Multiple Select Questions are: ${numMCQs}
    - Language: English
    Your output must strictly follow this JSON structure:
    {
      "quiz": [
        {
          "qId": 0,
          "question": "...",
          "type": "mcq",
          "options": ["...", "...", "...", "..."],
          "answerIndex": 0
        },
        {
          "qId": 1,
          "question": "...",
          "type": "msq",
          "options": ["...","...","...","..."],
          "answerIndex": [0,1]
        }
        ...
      ]
    }
    Return only the JSON. Do not include any commentary, code blocks, or explanation.
  `;

    try {
        const response = await client.chatCompletion({
            provider: "novita",
            model: "deepseek-ai/DeepSeek-V3-0324",
            messages: [
                { role: "user", content: prompt }
            ],
        });

        const json = extractJSONFromLLMResponse(response.choices[0].message.content);
        if (!json || !json.quiz) {
            console.log("invlid response format");
            return res.status(500).json({ error: "Invalid response format from LLM" });
        }

        return res.status(200).json(json);
    } catch (error) {
        console.error("Quiz generation error:", error);
        return res.status(500).json({ error: "Failed to generate quiz" });
    }
}
