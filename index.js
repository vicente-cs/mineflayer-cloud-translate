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

  bot.translator.enable = function enable(op) {
    if (!!op && typeof op == "string") {
      bot.translator.settings.op = op
    }

    disabled = false;
  };

  bot.translator.disable = function disable() {
    disabled = false;
  };
  bot.translator.commandPrefix = ".";


  bot.on("chat", (username, message, msg_translate, jsonMsg) => {

    if (disabled) return;

    //This line makes "bot.whisper()" work without recursions
    if (msg_translate == "commands.message.display.outgoing") { return; }

    settings = bot.translator.settings
    players = bot.translator.players
    commandPrefix = bot.translator.commandPrefix

    //Handles incoming /tell messages
    if (msg_translate == "commands.message.display.incoming") {
      username = jsonMsg["with"][0]["text"]
    }

    function getParams(text, error = "Parameter error!") {
      if (!text.includes(" ")) {
        return [];
      }
      return text.split(" ").slice(1);
    }

    //Non-chat phrases start with "]"
    if (username == bot.username || message.substr(-1) == "]") { return; }

    //Verify if commmands were input
    if (message.startsWith(commandPrefix) &&
      (username == settings.op)) {

      const userCommand = message.replace(commandPrefix, "").split(" ")[0];
      if (!(userCommand in commands)) { return; }

      const params = getParams(message);

      commands[userCommand](bot, username, params)
    }

    else {
      //If OP is speaking, bot will traduce message to server's language
      function sendTranslation(language, func) {
        translateText(message.toString(), language).then((res) => func(res))
          .catch((err) => {
            bot.whisper(settings.op, err.toString());
          });
      }

      if (username == settings.op) {
        sendTranslation(settings.server_lang, (res) => bot.chat(res));
      }

      else if (settings.translate_all || players.includes(username)) {
        sendTranslation(settings.op_lang, (res) =>
          bot.whisper(settings.op, `${username}: ${res}`));
      }
    }
  })
}

module.exports = init
