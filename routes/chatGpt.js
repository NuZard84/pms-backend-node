router = require("express").Router();
const OpenAI = require("openai").OpenAI;
const API_KEY = "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";

router.post("/", async (req, res) => {
  try {
    const { userInput } = req.body;
    console.log("userInput: ", userInput);
    const openai = new OpenAI({ apiKey: API_KEY });
    const customPrompt = `You are helpfull assistent for doctors. and wants you to help them with their queries. The following will be query provided by doctor and response carefully. = ${userInput}`;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: customPrompt }],
      model: "gpt-3.5-turbo",
    });
    console.log(completion.choices[0]);
    res.status(200).json({
      message: "ChatGPT route hit!",
      response: completion.choices[0].message.content,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error!" });
  }
});

module.exports = router;
