//TODO: add exception handlers

const commands = require("./lib/commands/index")
const translateText = require("./lib/utils/translate_text")

function init(bot, op) {
  var disabled = true;

  bot.translator = {};

  bot.translator.enable = function enable(){
    disabled = false;
  };

  bot.translator.disable = function disable(){
    disabled = false;
  };

  bot.translator.players = [];

  bot.translator.settings = {
    op: op, 
    op_lang: "en", 
    server_lang: "es", 
    translate_all: false
  };

  bot.translator.commandPrefix = ".";


  bot.on("chat", (username, message, msg_translate, jsonMsg) => {

    settings = bot.translator.settings

    //Handles incoming /tell messages
    if (msg_translate == "commands.message.display.incoming") {
      username = jsonMsg["with"][0]["text"]
    }
    
    //This line makes "bot.whisper()" work without recursions
    if (msg_translate == "commands.message.display.outgoing") {return;}

    if (disabled) return;

    function getParams(text, error = "Parameter error!") {
      if (!text.includes(" ")) {
        return [];
      }
      return text.split(" ").slice(1);
    }

    //Non-chat phrases start with "]"
    if (username == bot.username || message.substr(-1) == "]") {return;}

    //Commands
    if (message.startsWith(bot.translator.commandPrefix) && 
    (username == bot.translator.settings.op)) {
      const userCommand = message.replace(bot.translator.commandPrefix, "").split(" ")[0];
      const params = getParams(message)

      if (!(userCommand in commands)) return
      commands[userCommand](bot, username, params)
      }

    else {
      //If OP is speaking, bot will traduce message to server's language
      if (username == bot.translator.settings.op) {
        sendText = (text) => {bot.chat(text)}
        language = bot.translator.settings.server_lang;}

      else {
        language = bot.translator.settings.op_lang;
        //Returns if translate_all is false and player is not in translatelist
        if (!(bot.translator.settings.translate_all || 
          bot.translator.players.includes(username))) {return;}
        sendText = (text) => {bot.whisper(bot.translator.settings.op,text)}
      }

      translateText(message.toString(), language).then((res) => {
        sendText(res.toString());
      })
        .catch((err) => {
          bot.whisper(bot.translator.settings.op, err.toString());
        });
    }
  })
}

module.exports = function (op) {
  return function (bot) {
    init(bot, op);
  }
}
