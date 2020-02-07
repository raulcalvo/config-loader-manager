const c = require("./index.js");

var config = {
    "key3": "config"
};

var defaultConfig = {
    "key1": "defaultConfig",
    "key2": "defaultConfig",
    "key3": "defaultConfig"
};

var resultConfig = c.load(__dirname, config, defaultConfig);
console.log(JSON.stringify(resultConfig));
