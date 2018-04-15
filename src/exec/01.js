const GotoFlow = require('../flow/goto')
const WaitForFlow = require('../flow/waitFor')
const HoverAction = require('../action/hover')
const ClickAction = require('../action/click')
const TypeAction = require('../action/type')
const QueryFlow = require('../flow/query')
const puppeteer = require('puppeteer')
const expect = require('expect-puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: true,
        slowMo: 10
    })

    const TIME_OUT = 10000

    const page = await browser.newPage()
    await page.setViewport({ width: 1366, height: 768 })

    const step0 = new GotoFlow(page)
    await step0.doExecute([''])
    console.log('step0:打开页面')

    // const step1 = new WaitForFlow(page, 'selector')
    // await step1.doExecute(['.header-wrapper .loading.finish'])
    // console.log('step1:等待加载完成')

    await expect(page).toMatchElement('.header-wrapper .loading.finish', { timeout: TIME_OUT })
    console.log('1')
    await expect(page).toClick('.flight-action .btn.btn-book', { timeout: TIME_OUT })
    console.log('2')
    await expect(page).toClick('.flight-seats .btn.btn-book', { timeout: TIME_OUT })
    console.log('3')
    await expect(page).toMatchElement('#sso_memberlogin', { timeout: TIME_OUT })
    console.log('4')
    await expect(page).toFill('#sso_txtUid', '', { timeout: TIME_OUT })
    console.log('5')
    await expect(page).toFill('#sso_txtPwd', '', { timeout: TIME_OUT })
    console.log('6')
    await expect(page).toClick('#sso_btnSubmit', { timeout: TIME_OUT })

    console.log('finish')

})()