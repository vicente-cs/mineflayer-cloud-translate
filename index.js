const {Translate} = require('@google-cloud/translate').v2;
const commands = require("./lib/commands/index")


function init(bot, credentials, op) {
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

  // //That holds support for special character commands
  // bot.translator.commands.commandList = {
  //   set_language: "setlanguage",
  //   "translate_list": "playerlist",
  //   translate_all: "translateall"
  // };


  bot.on("chat", (username, message, msg_translate, jsonMsg) => {

    //Handles incoming /tell messages
    if (msg_translate == "commands.message.display.incoming") {
      username = jsonMsg["with"][0]["text"]
    }
    
    //This line makes "bot.whisper()" work without recursions
    if (msg_translate == "commands.message.display.outgoing") {return;}

    if (disabled) return;

    const translate = new Translate({
      credentials: credentials,
      projectId: credentials.project_id
    });

    const translateText = async (text, targetLanguage) => {
      try {
        let [response] = await translate.translate(text, targetLanguage);
        return response;
      } catch (error) {
        console.log(`Error at translateText --> ${error}`);
        return 0;
      }
    };

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
      // const commandList = bot.translator.commands.commandList;
      console.log(userCommand)
      commands[userCommand](bot, username, params)
      console.log(bot.translator.settings.translate_all)

      // if (command.startsWith(commandList.translate_all)) {
      //   const param = getParams(command)[0];
      //   const rules = { //TODO: optimize this spaghetti
      //     "true": true,
      //     "false": false
      //   };
  
      //   if (!(param in rules)) {
      //     bot.whisper(username, "Invalid Parameter");
      //     return;
      //   }
  
      //   bot.whisper(username, `Sucessfully changed to ${param}`);
      //   bot.translator.settings.translate_all = rules[param];
      // }


      // if (command.startsWith(commandList.set_language)) {
      //   const params = getParams(command);
      //   const target = params[0];
      //   const lang_param = params[1];

      //   translateText(".".toString(), lang_param).then((res) => {
      //     if (typeof (res) == "number") bot.whisper(username, "Error! Invalid Language")
      //     else {
      //       switch(target) {
      //         case "server":
      //           bot.translator.settings.server_lang = lang_param;
      //           break;
              
      //         case "op":
      //           bot.translator.settings.server_lang = lang_param;
      //           break;

      //         default:
      //           bot.whisper(username, "Error! Target not defined");
      //           return;
      //       }
      //       bot.whisper(username, `Language set to ${lang_param}!`);
      //     }
      //   })
      //     .catch((err) => {
      //       bot.whisper(username, `Error: ${err}`);
      //     });
      // }


      // if (command.startsWith(commandList.translate_list)) {
      //   //First param: "add" or "remove", second param is the player
      //   const params = getParams(command);
      //   const second_param = params[0];
      //   const player = params[1];

      //   switch (second_param) {
      //     case "add":
      //       bot.translator.players.push(player);
      //       bot.whisper(username, "Sucess!");
      //       break;

      //     case "remove":
      //       if (!bot.translator.players.includes(player)) {
      //         bot.whisper(username, "Error: player not in player list!");
      //         return;
      //       }
      //       bot.translator.players = bot.translator.players.filter(item => item !== player);
      //       bot.whisper(username, `${player} removed from list!`);
      //       break;

      //     default:
      //       bot.whisper(username, "Undefined parameter!");
      //       break;
      //   }
      // }
    }

    else {
      //If OP is speaking, bot will traduce message to server's language
      if (username == bot.translator.settings.op) {
        sendText = (text) => {bot.chat(text)}
        language = bot.translator.settings.server_lang;}

      else {
        language = bot.translator.settings.op_lang;
        if (!(bot.translator.settings.translate_all || 
          bot.translator.players.includes(username))) {return;}
        sendText = (text) => {bot.whisper(bot.translator.settings.op,text)}
      }

      translateText(message.toString(), language).then((res) => {
        sendText(res.toString());
      })
        .catch((err) => {
          bot.whisper(username, err.toString());
        });
    }
  })
}

module.exports = function (credentials, op) {
  return function (bot) {
    init(bot, credentials, op);
  }
}