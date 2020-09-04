var common = require('./common')
var lodash = require('lodash')
var scrapper = require('./scrapper')
// console.log(process.argv);
// scrapper.fetchMainCategories(common.aliExpressUrl, (data, response) => {
//     if (response) {
//         console.log(JSON.stringify(data));
//     }
// });

// var newUrl = common.aliExpressUrl + 'wholesale?catId=0&SearchText=battery'
// var newUrl = common.aliExpressUrl + 'wholesale?catId=0&SearchText=battery'
scrapper.fetchAliExpressItems(common.aliExpressUrl, (data, response) => {
    if (response) {
        console.log(JSON.stringify(data));
    }
});



