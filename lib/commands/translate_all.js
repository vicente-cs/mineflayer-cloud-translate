function translate_all(bot, username, params) {
    const bool = params[0]
    const rules = { //TODO: optimize this spaghetti
      "true": true,
      "false": false
    };

    if (!(bool in rules)) {
      bot.whisper(username, "Invalid parameter!");
      return;
    }

    bot.whisper(username, `Sucessfully changed to ${bool}`);
    bot.translator.settings.translate_all = rules[bool];
}

module.exports = translate_all