'use strict';
const fs = require('fs');
const path = require('path');
const mergeJSON = require('merge-json');

function getParentFolderName(){
    return path.dirname(__filename).split(path.sep).slice(-1)[0];
}

function normalizeConfig( config ){
    var moduleName = getParentFolderName();
    if (config.hasOwnProperty(moduleName))
        return config;
    return { moduleName : config };
}

module.exports.load = function (config = {}, defaultConfig = {}){
    var resultConfig = {};
    var moduleName = path.dirname(__filename).split(path.sep).slice(-1)[0];
    var configFile = "./config/" + moduleName + ".js";
    if ( fs.existsSync(configFile)){
        var fileConfig = normalizeConfig(JSON.parse(fs.readFileSync(configFile)));
        resultConfig = mergeJSON.merge(normalizeConfig(defaultConfig), fileConfig);
    }
    return mergeJSON.merge(resultConfig, normalizeConfig(config));
};
