const fs = require('fs');
const path = require('path');

const serverJSONFileName = __dirname +'/../public/information.json';

class Converter {
    static fromJSONString(jsonString) {
        return JSON.parse(jsonString);
    }

    static toJSONString(jsonObject) {
        return JSON.stringify(jsonObject);
    }

    static createServer(name, version, maxOnline, tags, description) {
        return {
            "servername": name,
            "version": version,
            "max_online": maxOnline,
            "server_tags": tags,
            "description": description
        };
    }

    static createJSON(server) {
        return {
            "server": server
        };
    }
}

class ServerJSON {
    constructor(jsonString, fileName) {
        this.fileName = fileName;
        this.jsonObject = Converter.fromJSONString(jsonString);
    }

    setServerName(name) {
        this.jsonObject.servername = name;
    }

    setVersion(version) {
        this.jsonObject.version = version;
    }

    setMaxOnline(maxOnline) {
        this.jsonObject.max_online = maxOnline;
    }

    setTags(tags) {
        this.jsonObject.server_tags = tags;
    }

    setDescription(description) {
        this.jsonObject.description = description;
    }

    getServer() {
        return this.jsonObject.server;
    }

    getName() {
        return this.jsonObject.servername;
    }

    getVersion() {
        return this.jsonObject.version;
    }

    getMaxOnline() {
        return this.jsonObject.max_online;
    }

    getTags() {
        return this.jsonObject.server_tags;
    }

    getDescription() {
        return this.jsonObject.description;
    }

    getJSONString() {
        return Converter.toJSONString(this.jsonObject);
    }

    saveToFile() {
        const jsonString = this.getJSONString();
        fs.writeFileSync(this.fileName, jsonString);
    }
}

function getServerJSON() {
    const serverJSONString = fs.readFileSync(serverJSONFileName, 'utf-8');
    return new ServerJSON(serverJSONString, serverJSONFileName);
}

module.exports = getServerJSON();
