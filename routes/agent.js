var express = require("express");
require("dotenv").config();
var router = express.Router();

/* GET open ai module home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/getWeather", async function (req, res, next) {
  try {
    const searchCriteria = req.body.searchCriteria;
    const classObj = new Agent();
    const serviceData = await classObj.getWeather(searchCriteria);
    if (serviceData) {
      res.json({ data: serviceData });
    }
  } catch (e) {
    res.json({ data: "Error Found" });
  }
});

module.exports = router;

const { OpenAI } = require("langchain/llms/openai");

const { initializeAgentExecutorWithOptions } = require("langchain/agents");
const { ChatOpenAI } = require("langchain/chat_models/openai");
const { SerpAPI } = require("langchain/tools");
const { Calculator } = require("langchain/tools/calculator");

require("dotenv").config();

class Agent {

  openai;
  constructor() {
    this.openai = new OpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
      temperature: 0.9
    });
  }

  /**
   * Get Weather
   * * @param text search criteria
   * @returns weather information
   */
  async getWeather(text) {
    const tools = [new Calculator(), new SerpAPI()];
    const chat = new ChatOpenAI({ modelName: "gpt-3.5-turbo", temperature: 0 });

    const executor = await initializeAgentExecutorWithOptions(tools, chat, {
      agentType: "openai-functions",
      verbose: true,
    });
    const result = await executor.run(text);
    return result;
  }
}
