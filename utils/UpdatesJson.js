require("path");

const fs = require('fs');

const updatesJSON = __dirname +'/../public/updates.json';

const updatesJSONString = fs.readFileSync(updatesJSON, 'utf-8');

class Converter {
    static fromJSONString(jsonString) {
        return JSON.parse(jsonString);
    }

    static toJSONString(jsonObject) {
        return JSON.stringify(jsonObject);
    }
}

class UpdatesJson {

    constructor(jsonString, fileName) {
        this.fileName = fileName;
        this.jsonObject = Converter.fromJSONString(jsonString);
    }

    saveToFile(json) {
        fs.writeFileSync(this.fileName, json);
        this.jsonObject = Converter.fromJSONString(this.readJSONString());
    }

    readJSONString() {
        return fs.readFileSync(updatesJSON, 'utf-8');
    }
}

const Updates = new UpdatesJson(updatesJSONString, updatesJSON);

function GetUpdates() {
    return Updates;
}

module.exports = GetUpdates();