const mineflayer = require("mineflayer")
require('dotenv').config();
const translator = require("mineflayer-cloud-translate")

const bot = mineflayer.createBot({
    host: process.env.HOST,
    port: process.env.PORT,
    username: "Translator"
});

bot.loadPlugin(translator);

bot.once("spawn", () => {
    bot.translator.settings = {
        op: "Your Minecraft Nickname", 
        op_lang: "en", //Operator language
        server_lang: "jpn", //Server language
        translate_all: false
      };

    bot.translator.enable();
});