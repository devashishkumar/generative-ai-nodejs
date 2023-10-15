var express = require("express");
require("dotenv").config();
var router = express.Router();

/* GET open ai module home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/getSearchCriteria", async function (req, res, next) {
  try {
    const classObj = new LangChainRouteModule();
    const restaurantData = await classObj.callMethod(req.body.searchCriteria);
    if (restaurantData) {
      res.json({ data: restaurantData });
    }
  } catch (e) {
    console.log(e);
    res.json({ data: "Error Found" });
  }
});

router.post("/llmChainGetSearchCriteria", async function (req, res, next) {
  try {
    const classObj = new LangChainRouteModule();
    const restaurantData = await classObj.llmChainMethod(req.body.llmChainSearchCriteria);
    if (restaurantData) {
      res.json({ data: restaurantData });
    }
  } catch (e) {
    console.log(e);
    res.json({ data: "Error Found" });
  }
});

router.post("/llmSequentialChain", async function (req, res, next) {
  try {
    const searchCriteria = req.body.llmChainSearchCriteria
    const restaurantTemplate = "I want to open a restaurant for {productType} Food. Please suggest some good names for restaurant.";
    const foodItemsTemplate = "Suggest some menu items for {restaurant_name}.";
    const llm = new OpenAI({ openAIApiKey: process.env.OPENAI_API_KEY, temperature: 0 });
    const promptTemplate = new PromptTemplate({
      template: restaurantTemplate,
      inputVariables: ["productType"]
    });
    const restaurantNamesChain = new LLMChain({
      llm,
      prompt: promptTemplate,
      outputKey: "restaurantNames",
    });

    // const menuLlm = new OpenAI({ openAIApiKey: process.env.OPENAI_API_KEY, temperature: 0 });
    const menuTemplate = new PromptTemplate({
      template: foodItemsTemplate,
      inputVariables: ["restaurant_name"]
    });
    const restaurantNamesChain2 = new LLMChain({
      llm,
      prompt: menuTemplate,
      outputKey: "menus",
    });

    // sequential chain

    const sequentialChainObject = new SequentialChain({
      chains: [restaurantNamesChain, restaurantNamesChain2],
      inputVariables: ["productType", "restaurant_name"],
      // Here we return multiple variables
      outputVariables: ["restaurantNames", "menus"],
      verbose: true,
    });
    const chainResult = await sequentialChainObject.call({
      productType: searchCriteria,
      restaurant_name: searchCriteria,
    });
    console.log(chainResult);
    if (chainResult) {
      res.json({ data: chainResult });
    }
  } catch (e) {
    console.log(e);
    res.json({ data: "Error Found" });
  }
});

router.get("/searchImage/:criteria", async function (req, res, next) {
  try {
    // req.params.criteria
  } catch (e) {
    res.json({ data: "Error Found" });
  }
});

module.exports = router;

const { OpenAI } = require("langchain/llms/openai");
const { PromptTemplate } = require("langchain/prompts");
const { LLMChain, SimpleSequentialChain, SequentialChain } = require("langchain/chains");

require("dotenv").config();

class LangChainRouteModule {

  openai;
  promptTemplate;
  restaurantChain;
  restaurantTemplate = "I want to open a restaurant for {product} Food. Please suggest a good names for restaurant.";
  menuItemsTemplate;
  foodItemsChain;
  foodItemsTemplate = "Suggest some menu items for {restaurant_name}.";
  constructor() {
    this.openai = new OpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
      temperature: 0.9
    });

    // restaurant prompt template
    this.promptTemplate = new PromptTemplate({
      template: this.restaurantTemplate,
      inputVariables: ["product"]
    });
    this.restaurantChain = new LLMChain({
      llm: this.openai,
      prompt: this.promptTemplate,
      outputKey: "product"
    });

    // food items prompt template
    this.menuItemsTemplate = new PromptTemplate({
      template: this.foodItemsTemplate,
      inputVariables: ["restaurant_name"]
    });
    this.foodItemsChain = new LLMChain({
      llm: this.openai,
      prompt: this.menuItemsTemplate,
      outputKey: "restaurant_name"
    });

  }

  /**
   * return user input result
   * @param text user input 
   */
  async callMethod(text) {
    const res = await this.openai.call(text);
    console.log(res);
    return res;
  }

  /**
   * lang chain prompt
   */
  async promptMethod(text) {
    const formattedPrompt = await this.promptTemplate.format({
      product: text
    });
    console.log(formattedPrompt);
    return formattedPrompt;
  }

  /**
   * llm chain method
   */
  async llmChainMethod(text) {
    // return chain
    // const response = await this.restaurantChain.call({
    //     product: text
    // });
    // console.log(response);
    // return response;

    // simple sequential chain
    const response1 = new SimpleSequentialChain({ verbose: true, chains: [this.restaurantChain, this.foodItemsChain] });
    const chainResponse = await response1.run(text);
    return { text: chainResponse };
  }
}
