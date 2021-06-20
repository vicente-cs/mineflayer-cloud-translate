const mineflayer = require("mineflayer")
require('dotenv').config();

const bot = mineflayer.createBot({
    host: "localhost",
    port: 57755,
    username: "Test"
  });

bot.once("spawn", () => {
    bot.chat("Soy español nato")
})