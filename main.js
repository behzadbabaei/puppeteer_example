var common = require('./common')
var lodash = require('lodash')
var scrapper = require('./scrapper')


scrapper.fetchMainCategories(common.mainUrl, (data, response) => {
    if (response) {
        console.log("response:", response);
        console.log("data:", data);
    }

});