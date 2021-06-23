const mineflayer = require("mineflayer")
require('dotenv').config();
const translator = require("../index.js")

HOST = process.env.HOST
PORT = process.env.PORT

const translator_bot = mineflayer.createBot({
  host: HOST,
  port: PORT,
  username: "Translator"
});

const speaker_bot = mineflayer.createBot({
  host: HOST,
  port: PORT,
  username: "Speaker"
});

translator_bot.loadPlugin(translator);

translator_bot.once("spawn", () => {
  translator_bot.translator.enable(process.env.MINECRAFT_USERNAME);
});

speaker_bot.on("chat", (username, message) => {
  if (username == speaker_bot.username) return;

  if (message == ".speak") {
    speaker_bot.chat(`¡Buenos días, ${username}!`) 
  }
});