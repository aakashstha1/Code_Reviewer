import aiService from "../services/ai.service.js";

export const getReview = async (req, res) => {
  const code = req.body.code;
  if (!code) {
    return res.status(400).json({ message: "Code is required" });
  }

  const response = await aiService(code);
  // Send response to frontend
  res.send(response);
};
