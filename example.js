const mineflayer = require("mineflayer")
require('dotenv').config();
const translator = require("../index.js")("Your minecraft nickname")


const bot = mineflayer.createBot({
  host: process.env.HOST,
  port: process.env.PORT,
  username: "Translator"
});

bot.loadPlugin(translator);

bot.once("spawn", () => {
  bot.translator.enable();
});