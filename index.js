'use strict';
const fs = require('fs');
const path = require('path');
const mergeJSON = require('merge-json');

module.exports.load = function (dirname, config = {}, defaultConfig = {}){
    var resultConfig = {};
    var moduleName = dirname.split(path.sep).slice(-1)[0];
    var configFile = path.join( dirname, "config" + moduleName + ".json");
    if ( fs.existsSync(configFile)){
        var fileConfig = JSON.parse(fs.readFileSync(configFile));
        resultConfig = mergeJSON.merge(defaultConfig, fileConfig);
    } else
        resultConfig = defaultConfig;
    return mergeJSON.merge(resultConfig, config);
};
