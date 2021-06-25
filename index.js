//TODO: add exception handlers

const commands = require("./lib/commands/index")
const translateText = require("./lib/utils/translate_text")

function init(bot) {
  bot.translator = {};

  bot.translator.players = [];

  bot.translator.settings = {
    op: undefined, 
    op_lang: "en", 
    server_lang: "es", 
    translate_all: false
  };

  var disabled = true;

  bot.translator.enable = function enable(op){
    if(!!op && typeof op == "string") {
      bot.translator.settings.op = op
    }

    disabled = false;
  };

  bot.translator.disable = function disable(){
    disabled = false;
  };
  bot.translator.commandPrefix = ".";


  bot.on("chat", (username, message, msg_translate, jsonMsg) => {

    if (disabled) return;
  
    settings = bot.translator.settings
    players = bot.translator.players
    commandPrefix = bot.translator.commandPrefix

    //Handles incoming /tell messages
    if (msg_translate == "commands.message.display.incoming") {
      username = jsonMsg["with"][0]["text"]
    }
    
    //This line makes "bot.whisper()" work without recursions
    if (msg_translate == "commands.message.display.outgoing") {return;}

    function getParams(text, error = "Parameter error!") {
      if (!text.includes(" ")) {
        return [];
      }
      return text.split(" ").slice(1);
    }

    //Non-chat phrases start with "]"
    if (username == bot.username || message.substr(-1) == "]") {return;}

    //Verify if commmands were input
    if (message.startsWith(commandPrefix) && 
    (username == settings.op)) {
      const userCommand = message.replace(commandPrefix, "").split(" ")[0];
      const params = getParams(message)

      if (!(userCommand in commands)) return
      commands[userCommand](bot, username, params)
      }

    else {
      //If OP is speaking, bot will traduce message to server's language
      if (username == settings.op) {
        sendText = (text) => {
          bot.chat(text)
        }
        language = settings.server_lang;
      }

      else {
        language = settings.op_lang;

        //Returns if translate_all is false and player is not in translatelist
        if (!(settings.translate_all || 
          players.includes(username))) {return;}
  
        sendText = (text) => {
          bot.whisper(settings.op,`${username}: ${text}`)
        }
      }

      translateText(message.toString(), language).then((res) => {
        sendText(res.toString());
      })
        .catch((err) => {
          bot.whisper(settings.op, err.toString());
        });
    }
  })
}

module.exports = init
