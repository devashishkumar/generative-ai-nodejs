var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/getSearchCriteria/:criteria', async function (req, res, next) {
  try {
    const classObj = new OpenAiClass();
    const langChainData = await classObj.generateText(req.params.criteria);
    if (langChainData) {
      res.json({ data: langChainData });
    }
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;

const OpenAI = require("openai");
require("dotenv").config();

class OpenAiClass {
  openai;
  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
  }
  async generateText(text) {
    const response = await this.openai.completions.create({
      model: "text-davinci-003",
      prompt: text,
      temperature: 1,
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
    console.log(response.choices);
  }
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
}
