const { sources } = require("webpack");

module.exports = sources => {
    console.log('========= Loader Demo is excuted! ==========')
    return sources
}