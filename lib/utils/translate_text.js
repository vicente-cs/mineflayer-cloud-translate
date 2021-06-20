const {Translate} = require('@google-cloud/translate').v2;
const translate = new Translate();

const translateText = async (text, targetLanguage) => {
    try {
        let [response] = await translate.translate(text, targetLanguage);
        return response;
    } catch (error) {
        return `Error at translateText --> ${error}`;
    }
};

module.exports = translateText