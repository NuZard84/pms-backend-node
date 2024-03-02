router = require("express").Router();
const OpenAI = require("openai").OpenAI;
const API_KEY = "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";
const API_KEY_ORG = "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";

router.post("/", async (req, res) => {
  try {
    const { userInput, isEnable = false } = req.body;
    console.log("userInput: ", userInput);
    const openai = new OpenAI({ apiKey: API_KEY });

    // const cat = {
    //   cardiologist: "chest pain, heat attack, high blood pressuur",
    //   dermatologist: "skin, hair, nails, skin cancer, external infection",
    //   dentist: "teeth, gums, mouth, oral cavity, dental cavity",
    //   nurologist:
    //     "brain, spinal cord, nerves, headache, migraine, stroke, nerve disorder",
    //   orthopedic:
    //     "bone, joint, muscle, ligament, tendon, fracture, dislocation",
    //   gastroligist:
    //     "stomach, intestine, liver, gallbladder, pancreas, ulcer, jaundice, hepatitis",
    // };

    const category_ = req.body.category || "general";
    const age = req.body.age || "";
    const gender = req.body.gender || "";
    const bp = req.body.bp || "";
    const hr = req.body.hr || "";
    const ol = req.body.ol || "";
    const temp = req.body.temp || "";

    let additionalPrompt = `assume you are master in medical science and your name is Medcare AI assistant .they having conversation between you and doctor for particular patient.every time you reply, first sentence shuold be hey i am medcare ai. after these doctor is sending patient data show reply according to it.\n\n Please assume role of an experienced interventional ${category_} with over 20 experience in treating. \n\n patient external data :\n gender : ${gender} \n age:${age}\n\n  Four vitals parameter of patient : \n Blood Pressure : ${bp} \n Heart Rate : ${hr} \n Oxygen Level : ${ol} \n Temperature : ${temp} \n\n ${userInput} \n\n Guidlines for how to output for you(chatgpt):\n provide proper/accurate treatment/ diagnosis according to current symptoms , medical history  , patient external data , test reports(if provided) of patient data.\n suggest medicine for patient according to diagnosis.\n suggest test for patient according to diagnosis.\n suggest lifestyle changes for patient according to diagnosis.\n suggest diet plan for patient according to diagnosis.\n suggest exercise plan for patient according to diagnosis.\n suggest follow up plan for patient according to diagnosis.\n on basis of symptoms which type of disease can be?.\n safe range of vitals parameter according to age , gender and compare with patient vitals parameter.\n\n`;

    if (!isEnable) {
      additionalPrompt = "";
    }

    const customPrompt = `You are helpfull assistent for doctors. and wants you to help them with their queries. The following will be query provided by doctor and response carefully also if additonalPrompt is given then answer based upon that else just anser normally as instructed. userInput = ${userInput}, additionalPrompt = ${additionalPrompt}`;

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
