const puppeteer = require('puppeteer'),
    url = '',
    userName = '',
    pwd = '';

(async () => {
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage()
    await page.setViewport({ width: 1366, height: 768 })
    await page.goto(url);

    await page.waitForSelector('.header-wrapper .loading.finish')

    let filter_depTime = await page.waitForSelector('ul.filter-bd>li:nth-child(3)')
    await filter_depTime.hover()

    let firstOpt = await filter_depTime.$('li:nth-child(2)')
    await firstOpt.click()

    let btnExpand = await page.waitForSelector('.flight-action .btn.btn-book')
    await btnExpand.click()

    let btnBook = await page.waitForSelector('.flight-seats .btn.btn-book')
    await btnBook.click()

    await page.waitForFunction(() => document.querySelector('.login_popup'), { timeout: 3000 })

    let inputUid = await page.waitForFunction(() => document.querySelector('#sso_txtUid'))
    let inputPwd = await page.waitForFunction(() => document.querySelector('#sso_txtPwd'))

    await inputUid.click()
    await inputUid.type(userName)

    await inputPwd.click()
    await inputPwd.type(pwd)

    let btnLogin = await page.$('#sso_btnSubmit')
    await btnLogin.click()
})();