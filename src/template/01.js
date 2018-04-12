const GotoFlow = require('../flow/goto')
const WaitForFlow = require('../flow/waitFor')
const HoverAction = require('../action/hover')
const ClickAction = require('../action/click')
const TypeAction = require('../action/type')
const QueryFlow = require('../flow/query')
const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: false
    })

    const page = await browser.newPage()
    await page.setViewport({ width: 1366, height: 768 })

    [CONTENT]
})()