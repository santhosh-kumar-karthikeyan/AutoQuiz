import { InferenceClient } from "@huggingface/inference";
import dotenv from "dotenv";
dotenv.config();

function extractJSONFromLLMResponse(response) {
    const cleaned = response
        .replace(/```json|```/g, '')
        .trim();
    try {
        const parsed = JSON.parse(cleaned);
        return parsed;
    }
    catch(error) {
        console.error(error);
        return null;
    }
}

async function getQuiz(topicList,numQuestions,numMCQs) {
    const client = new InferenceClient(process.env.HF_TOKEN);
    const prompt = `
        You are a quiz-generating assistant. Generate a Multiple Choice quiz in JSON format based on the following parameters:

        - Topics: [${topicList.join(', ')}]
        - Total Number of Questions: ${numQuestions} of which, 
        - Total Number of Multiple Select Questions are: ${numMCQs}
        - Language: English
        Your output must strictly follow this JSON structure:
        {
        "quiz": [
            {
            "qId" : 0,
            "question": "...",
            "type": "mcq",
            "options": ["...", "...", "...", "..."],
            "answerIndex": 0
            },
            {
            "qId" : 1,
            "question": "...",
            "type": "msq",
            "options": ["...","...","...","..."],
            "answerIndex": [... , ... , ...]
            }
            ...
        ]
        }
        Return only the JSON. Do not include any commentary, code blocks, or explanation.
    `;
    const chatCompletion = await client.chatCompletion({
        provider: "novita",
        model: "deepseek-ai/DeepSeek-V3-0324",
        messages: [
            {
                role: "user",
                content: prompt,
            },
        ],
    });
    return extractJSONFromLLMResponse(chatCompletion.choices[0].message.content);
}

(async () => {
    console.log(await getQuiz(["Operating Systems", "Kernel", "Deadlock"],10,2));
})();

