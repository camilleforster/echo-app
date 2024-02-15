const config = () => {
    const path = require('path'),
        filename = "config.json";

    // TODO: Validate this config file using a JSON schema!
    let file = path.normalize(path.join(process.cwd(), filename));
    try{
        global["getConfig"] = require(file);
        return true;
    }
    catch (e){
        // TODO: Expand this to look deeper

        console.log("Cannot find "+ filename + " in " + process.cwd() + ". Try running setup.");
        return false;
    }
};

if (config()){
    exports.html = require('./html');
    exports.less = require('./less');
    exports.sass = require('./sass');
    exports.ts = require('./ts');
}
