var puppeteer = require('puppeteer')
var common = require('./common')

module.exports.fetchMainCategories = async (url, callback) => {
    const browser = await puppeteer.launch({headless: false})
    const page = await browser.newPage()

    await page.goto(url, {waitUntil: 'domcontentloaded'})
    await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.5.1.min.js'})

    const result = await page.evaluate((common) => {
        var categories = []


        $(".c-navi-new-list__inner-categories a").each(function (i, item) {
            var obj = {
                id: $(item).data('index'),
                text: $(item).text()
            }
            categories.push(obj)
        });

        return categories;

    }, common);

    await page.close()
    await browser.close()
    callback(result, true)
}


module.exports.fetchAliExpressItems = async (url, callback) => {
    const browser = await puppeteer.launch({headless: false})
    const page = await browser.newPage()

    await page.goto(url, {waitUntil: 'domcontentloaded'})
    await page.waitForSelector('.list-wrap.product-list', {
        visible: true,
    });

    await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.5.1.min.js'})
    await autoScroll(page);
    // await delay(4000);

    const result = await page.evaluate(() => {
        var items = []
        // <script type="text/javascript" async="" src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
        $(".list-wrap.product-list ul.list-items li.list-item").each(function (i, item) {
            var obj = {}
            obj.id = $(item).find('div.list.product-card').first().data('product-id')
            obj.imageAddress = $(item).find('div.product-img img').first().attr('src')
            obj.title = $(item).find('div.product-info a.item-title').first().html()
            obj.itemLink = $(item).find('div.product-info a.item-title a').first().attr('href')
            obj.price = $(item).find('div.product-info .price-current').first().html()
            // console.log(obj);
            items.push(obj)
        });


        return items;

    });

    // await delay(12000);

    await page.close()
    await browser.close()
    callback(result, true)
}

async function autoScroll(page){
    await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
            var totalHeight = 0;
            var distance = 100;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if(totalHeight >= scrollHeight){
                    clearInterval(timer);
                    resolve();
                }
            }, 50);
        });
    });
}