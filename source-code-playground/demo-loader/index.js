const { sources } = require("webpack");

module.exports = (sources, map, meta)=> {
    console.log('======= demo loader =======', meta)
    return sources
}