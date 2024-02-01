const fs = require('fs');

const puppeteer = require('puppeteer');
(async () => {
    try {
        // Launch the browser and open a new blank page
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });
        const page = await browser.newPage();
        // Enable request interception
        await page.setRequestInterception(true);
        page.on('request', request => {
            if (request.resourceType() === 'image') {
                request.abort();
            } else {
                request.continue();
            }
        });
        const url = 'https://nhanlucnhatban.com/danh-sach-cong-ty-xkld-co-giay-phep-hoat-dong/';
        page.setDefaultNavigationTimeout(0);
        await page.goto(url);
        // Use page.evaluate to extract the data from the DOM
        const trs = [];
        // // Select all tr elements within the structure you described
        const topLevelTrs = await page.$$('table > tbody > tr');
        for (const topLevelTr of topLevelTrs) {
            // Navigate to the second td within the top-level tr
            const secondTd = await topLevelTr.$('td:nth-child(2)');
            // Check if there's a table within the second td
            if (secondTd) {
                const innerTable = await secondTd.$('table');
                if (innerTable) {
                    // Select all tr elements within the inner table
                    const innerTrs = await innerTable.$$('tbody > tr');
                    // Add inner tr elements to the array
                    let index = 0;
                    for (const innerTr of innerTrs) {
                        index++;
                        const label = await page.evaluate((el) => el.innerText, innerTr);
                        trs.push({ label, row: index });
                        if (index === 5) index = 0;
                    };
                }
            }

        };
        const formatData = [];
        let item = {};
        for (let i = 0; i < trs.length; i++) {
            const getValidText = (str) => {
                const parts = str.split('\t');
                return parts[2] || parts[1];
            }
            if (trs[i].row === 1) {
                item = {};
                item.companyName = trs[i].label;
            }
            if (trs[i].row === 2) item.companyCode = getValidText(trs[i].label);
            if (trs[i].row === 3) item.phoneNumber = getValidText(trs[i].label);
            if (trs[i].row === 4) item.address = getValidText(trs[i].label);
            if (trs[i].row === 5) {
                item.status = getValidText(trs[i].label);
                formatData.push(item);
            }
        }
        const jsonData = JSON.stringify(formatData, null, 2); // The '2' parameter is for indentation
        // Specify the file path
        const filePath = 'dataXKLDCompany.json';
        // Write the JSON data to the file
        fs.writeFileSync(filePath, jsonData, 'utf-8');
        console.log(formatData)
        console.log('done')
        return;
    } catch (errors) {
        // await browser.close();
        console.log(errors)
    }

})();