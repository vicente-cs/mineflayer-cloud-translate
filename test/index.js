const mineflayer = require("mineflayer")
require('dotenv').config();
const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);
const translator = require("../index.js")(CREDENTIALS, "Buomdax")

const bot = mineflayer.createBot({
    host: process.env.HOST,
    port: process.env.PORT,
    username: "Translator"
  });

bot.loadPlugin(translator);

bot.once("spawn", () => {
    bot.translator.enable();
    console.log(bot.translator)
})