const mineflayer = require("mineflayer")
require('dotenv').config();
const translator = require("../index.js")("Buomdax")

const translator_bot = mineflayer.createBot({
  host: process.env.HOST,
  port: process.env.PORT,
  username: "Translator"
});

const speaker_bot = mineflayer.createBot({
  host: process.env.HOST,
  port: process.env.PORT,
  username: "Speaker"
});

translator_bot.loadPlugin(translator);

translator_bot.once("spawn", () => {
  translator_bot.translator.enable();
});

speaker_bot.on("chat", (username, message) => {
  if (username == speaker_bot.username) return;

  if (message == ".speak") {
    speaker_bot.chat(`¡Buenos días, ${username}!`) 
  }
});