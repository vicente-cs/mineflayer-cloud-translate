function translateList(bot, username, params) {
    const action = params[0];
    const player = params[1];

    switch (action) {
        case "add":
            bot.translator.players.push(player);
            bot.whisper(username, "Sucess!");
            break;

        case "remove":
            if (!bot.translator.players.includes(player)) {
                bot.whisper(username, `Error: ${player} not in player list!`);
                return;
            }
            bot.translator.players = bot.translator.players.filter(item => item !== player);
            bot.whisper(username, `${player} removed from list!`);
            break;

        default:
            bot.whisper(username, "Undefined parameter!");
            break;
    }
}

module.exports = translateList
