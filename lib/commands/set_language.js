const translateText = require("../utils/translate_text");


function setLanguage(bot, username, params) {
    const target = params[0];
    const lang = params[1];

    translateText(".".toString(), lang).then((res) => {
        if (typeof (res) == "number") bot.whisper(username, "Error! Invalid Language")
        else {
            switch (target) {
                case "server":
                    bot.translator.settings.server_lang = lang;
                    break;

                case "op":
                    bot.translator.settings.op_lang = lang;
                    break;

                default:
                    bot.whisper(username, "Error! Target not defined");
                    return;
            }
            bot.whisper(username, `Language set to ${lang}!`);
        }
    })
        .catch((err) => {
            bot.whisper(username, `Error: ${err}`);
        });
}

module.exports = setLanguage
