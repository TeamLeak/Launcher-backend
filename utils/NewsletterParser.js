/* JSON UTILS */

require("path");

const fs = require('fs');

const newsJSONFileName = __dirname +'/../public/news.json';

const newsJSONString = fs.readFileSync(newsJSONFileName, 'utf-8');

class Converter {
    static fromJSONString(jsonString) {
        return JSON.parse(jsonString);
    }

    static toJSONString(jsonObject) {
        return JSON.stringify(jsonObject);
    }

    static createNews(title, date, tags, body) {
        return {
            "title": title,
            "date": date,
            "tags": tags,
            "body": body
        };
    }

    static createJSON(news) {
        return {
            "news": news
        };
    }
}

class NewsJSON {
    constructor(jsonString, fileName) {
        this.fileName = fileName;
        this.jsonObject = Converter.fromJSONString(jsonString);
    }

    getTitle() {
        return this.jsonObject.news[0].title;
    }

    getDate() {
        return this.jsonObject.news[0].date;
    }

    getTags() {
        return this.jsonObject.news[0].tags;
    }

    getBody() {
        return this.jsonObject.news[0].body;
    }

    getJSONString() {
        return Converter.toJSONString(this.jsonObject);
    }

    addNewsToTop(title, date, tags, body) {
        const news = Converter.createNews(title, date, tags, body);
        this.jsonObject.news.unshift(news);
        this.saveToFile();
    }

    saveToFile() {
        const jsonString = this.getJSONString();
        fs.writeFileSync(this.fileName, jsonString);
    }
}

const newsJSON = new NewsJSON(newsJSONString, newsJSONFileName);

function GetNews() {
    return newsJSON;
}

module.exports = GetNews();