var puppeteer = require('puppeteer')
var common = require('./common')

module.exports.fetchMainCategories = async (url, callback) => {
    const browser= await puppeteer.launch({headless:false})
    const page= await browser.newPage()

    await page.goto(url,{waitUntil:'domcontentloaded'})
    await page.addScriptTag({url:'https://code.jquery.com/jquery-3.5.1.min.js'})

    const result = await page.evaluate((common)=>{
        var data = {
            categories:[]
        }

        $(".c-navi-new-list__inner-categories a").each(function(i,item){
            var obj = {
                id:$(item).data('index'),
                text:$(item).text()
            }
            data.categories.push(obj)
        });

        return data;

    },common);

    await page.close()
    await  browser.close()
    callback(result,true)
}