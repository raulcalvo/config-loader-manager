'use strict';
const fs = require('fs');
const path = require('path');
const mergeJSON = require('merge-json');

function normalizeConfig( moduleName, config ){
    if (config.hasOwnProperty(moduleName))
        return config;
    var result = {};
    result[moduleName] = config;
    return result;
}

module.exports.load = function (dirname, config = {}, defaultConfig = {}){
    var moduleName = dirname.split(path.sep).slice(-1)[0];
    defaultConfig = normalizeConfig(moduleName, defaultConfig);
    var configFile = "./config/" + moduleName + ".json";
    if ( fs.existsSync(configFile)){
        var fileConfig = normalizeConfig(moduleName, JSON.parse(fs.readFileSync(configFile)));
        defaultConfig = mergeJSON.merge(defaultConfig, fileConfig);
    }
    return mergeJSON.merge(defaultConfig, normalizeConfig(moduleName, config));
};
