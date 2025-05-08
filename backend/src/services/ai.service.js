import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  systemInstruction: `Review the code and provide feedback:

✅ if it's correct or good practice.

❌ if there's an issue, and explain what the issue is (bug, security, logic, etc.).

💡 Suggest how to fix the issue.

🧪 Provide example code if needed.

Keep it simple, concise, and easy to understand.`,
});

async function generateContent(prompt) {
  const result = await model.generateContent(prompt);
  return result.response.text();
}

export default generateContent;
