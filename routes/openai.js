var express = require('express');
const OpenAI = require("openai");
require("dotenv").config();
var router = express.Router();

/* GET open ai module home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/getSearchCriteria', async function (req, res, next) {
  try {
    const classObj = new OpenAiClass();
    const langChainData = await classObj.generateText(req.body.searchCriteria);
    if (langChainData) {
      res.json({ data: langChainData });
    }
  } catch (e) {
    res.json({ data: "Error Found" });
  }
});

router.get('/searchImage/:criteria', async function (req, res, next) {
  try {
    const classObj = new OpenAiClass();
    const image = await classObj.generateImage(req.params.criteria);
    if (image) {
      res.json({ data: image });
    }
  } catch (e) {
    res.json({ data: "Error Found" });
  }
});

module.exports = router;

class OpenAiClass {
  openai;
  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
  }

  /**
   * generate description
   * @param text search text
   */
  async generateText(text) {
    const response = await this.openai.completions.create({
      model: "text-davinci-003",
      prompt: text,
      temperature: 0,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    return response;
  }
  async generateChatText(text) {
    const response = await this.openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: text }]
    });
  }

  /**
   * generate stream
   * @param text search text
   */
  async streamResponses(text) {
    const stream = await this.openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: text }],
      stream: true,
    });
    for await (const part of stream) {
      process.stdout.write(part.choices[0]?.delta?.content || "");
    }
  }

  /**
   * generate image
   * @param text search text
   */
  async generateImage(text) {
    return await this.openai.images.generate({ prompt: text });
  }
}
