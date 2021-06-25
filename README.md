<h1 align="center">Welcome to mineflayer-cloud-translate 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/vicente-cs/mineflayer-cloud-translate#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/vicente-cs/mineflayer-cloud-translate/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/vicente-cs/mineflayer-cloud-translate/blob/master/LICENSE" target="_blank">
    <img alt="License: ISC" src="https://img.shields.io/github/license/vicente-cs/mineflayer-cloud-translate" />
  </a>
  <a href="https://twitter.com/vicnetecardoso" target="_blank">
    <img alt="Twitter: vicnetecardoso" src="https://img.shields.io/twitter/follow/vicnetecardoso.svg?style=social" />
  </a>
</p>

> A mineflayer plugin for chat text translation with Google Cloud API

### 🏠 [Homepage](https://github.com/vicente-cs/mineflayer-cloud-translate#readme)

## Quick start

In order to use the Cloud Translation API, A Google Application Credentials file is needed.<br/>
You can acquire it by following [this tutorial](https://cloud.google.com/translate/docs/setup).

### On .env

```
GOOGLE_APPLICATION_CREDENTIALS = <CREDENTIALS FILEPATH>
```

## Simple Bot

```js
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
    op: "<Your Minecraft username>",
    op_lang: "en", 
    server_lang: "pt", 
    translate_all: false
  };

  bot.translator.enable();
});
```

## Commands

The bot listens to Minecraft chat messages to receive commands.<br/>
Cloud Translation uses [ISO 639-1 codes](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) to determine which language the text should be translated to.

- `.setlanguage (server/op) <language>` sets server or op language
- `.translateall (true/false)` if true, translates all incoming text
- `.translatelist (add/remove) <player>` If ".translateall" is false, only players on translatelist will have their messages translated to op's language

Once the bot is on, every op message, except commands, will be translated to the server language.

## Test

### On .env

```
MINECRAFT_USERNAME = <YOUR MINECRAFT USERNAME >
```

## Author

👤 **Vicente Cardoso dos Santos**

* Website: https://vicente-cs.github.io/
* Twitter: [@vicnetecardoso](https://twitter.com/vicnetecardoso)
* Github: [@vicente-cs](https://github.com/vicente-cs)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/vicente-cs/mineflayer-cloud-translate/issues). You can also take a look at the [contributing guide](https://github.com/vicente-cs/mineflayer-cloud-translate/blob/master/CONTRIBUTING.md).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2021 [Vicente Cardoso dos Santos](https://github.com/vicente-cs).<br />
This project is [ISC](https://github.com/vicente-cs/mineflayer-cloud-translate/blob/master/LICENSE) licensed.

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
