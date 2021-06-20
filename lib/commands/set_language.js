function set_language(bot, username, command) {
    const params = getParams(command);
    const target = params[0];
    const lang_param = params[1];

    translateText(".".toString(), lang_param).then((res) => {
        if (typeof (res) == "number") bot.whisper(username, "Error! Invalid Language")
        else {
            switch (target) {
                case "server":
                    bot.translator.settings.server_lang = lang_param;
                    break;

                case "op":
                    bot.translator.settings.server_lang = lang_param;
                    break;

                default:
                    bot.whisper(username, "Error! Target not defined");
                    return;
            }
            bot.whisper(username, `Language set to ${lang_param}!`);
        }
    })
        .catch((err) => {
            bot.whisper(username, `Error: ${err}`);
        });
}