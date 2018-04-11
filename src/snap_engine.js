const GotoFlow = require('./flow/goto')
const WaitForFlow = require('./flow/waitFor')
const HoverAction = require('./action/hover')
const ClickAction = require('./action/click')
const TypeAction = require('./action/type')
const QueryFlow = require('./flow/query')

const readFilePromise = require('fs-readfile-promise'),
    puppeteer = require('puppeteer'),
    url = '',
    userName = '',
    pwd = '';

(async () => {
    const browser = await puppeteer.launch({
        headless: false
    })

    let configText = await readFilePromise('./src/data/config.json', { encoding: 'utf8' }),
        configJson = JSON.parse(configText)

    const page = await browser.newPage()
    await page.setViewport({ width: 1366, height: 768 })

    //await page.goto(url)
    let flow1 = new GotoFlow(page)
    await flow1.doExecute([url])

    //await page.waitForSelector('.header-wrapper .loading.finish')
    let flow2 = new WaitForFlow(page, 'selector')
    await flow2.doExecute(['.header-wrapper .loading.finish'])

    //let btnExpand = await page.waitForSelector('.flight-action .btn.btn-book')
    let flow3 = new WaitForFlow(page, 'selector')
    let btnExpand = await flow3.doExecute(['.flight-action .btn.btn-book'])

    //await btnExpand.click()
    let action4 = new ClickAction(btnExpand)
    await action4.doExecute()

    //let btnBook = await page.waitForSelector('.flight-seats .btn.btn-book')
    let flow5 = new WaitForFlow(page, 'selector')
    let btnBook = await flow5.doExecute(['.flight-seats .btn.btn-book'])

    //await btnBook.click()
    let action6 = new ClickAction(btnBook)
    await action6.doExecute()

    //await page.waitForFunction(() => document.querySelector('.login_popup'))
    let flow7 = new WaitForFlow(page, 'func')
    await flow7.doExecute([`document.querySelector('.login_popup')`])

    //let inputUid = await page.waitForFunction(() => document.querySelector('#sso_txtUid'))
    let flow8 = new WaitForFlow(page, 'func')
    let inputUid = await flow8.doExecute([`document.querySelector('#sso_txtUid')`])

    //await inputUid.click()
    let action9 = new ClickAction(inputUid)
    await action9.doExecute()

    //await inputUid.type(userName)
    let action10 = new TypeAction(inputUid)
    await action10.doExecute([userName])


    //let inputPwd = await page.waitForFunction(() => document.querySelector('#sso_txtPwd'))
    let flow11 = new WaitForFlow(page, 'func')
    let inputPwd = await flow11.doExecute([`document.querySelector('#sso_txtPwd')`])

    //await inputPwd.click()
    let action12 = new ClickAction(inputPwd)
    await action12.doExecute()

    //await inputPwd.type(pwd)
    let action13 = new TypeAction(inputPwd)
    await action13.doExecute([pwd])

    //let btnLogin = await page.$('#sso_btnSubmit')
    let flow14 = new QueryFlow(page)
    let btnLogin = await flow14.doExecute(['#sso_btnSubmit'])

    //await btnLogin.click()
    let action15 = new ClickAction(btnLogin)
    await action15.doExecute()
})();