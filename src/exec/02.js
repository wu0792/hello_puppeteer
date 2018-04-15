const GotoFlow = require('../flow/goto')
const WaitForFlow = require('../flow/waitFor')
const HoverAction = require('../action/hover')
const ClickAction = require('../action/click')
const TypeAction = require('../action/type')
const QueryFlow = require('../flow/query')
const puppeteer = require('puppeteer')
const cp = require('child_process')
const shortid = require('shortid')
const readFilePromise = require('fs-readfile-promise')
const path = require('path')
const expect = require('expect-puppeteer');

(async () => {
    const configText = await readFilePromise('C:\\Src\\hello_puppeteer\\src\\pwd.json', { encoding: 'utf8' }),
        configJson = JSON.parse(configText),
        { url, userId, pwd } = configJson.social

    const browser = await puppeteer.launch({
        headless: true,
        slowMo: 20
    })

    const TIME_OUT = 10000

    const page = await browser.newPage()
    await page.setViewport({ width: 1366, height: 768 })

    //打开登录页面
    await page.goto(url)

    //填写登录用户名/密码
    await expect(page).toFill('.login-con .login-input[name="AAC002"]', userId, { timeout: TIME_OUT })
    await expect(page).toFill('.login-con .login-input[name="CAC222"]', pwd, { timeout: TIME_OUT })

    //保存校验码
    const codeImgName = shortid.generate(),
        codeImgFullPath = `C:\\Src\\hello_puppeteer\\src\\exec\\code_img\\${codeImgName}.png`,
        codeImgSelector = '.login-con img'

    const codeImg = await expect(page).toMatchElement(codeImgSelector, { timeout: TIME_OUT })
    await codeImg.screenshot({ path: codeImgFullPath })

    //识别验证码
    let regPromise = new Promise((resolve, reject) => {
        cp.exec(`python "C:\\Src\\hello_puppeteer\\src\\exec\\digital_reg.py" "${codeImgFullPath}"`,
            (err, stdout, stderr) => {
                if (err) {
                    console.log('stderr', err)
                }

                resolve(stdout.trim())
            })
    })

    //填写验证码
    const code = await regPromise
    await expect(page).toFill('.login-con .login-input1[name="PSINPUT"]', code, { timeout: TIME_OUT })

    //点击登录按钮，等待跳转
    await expect(page).toClick('.buttonBox3 [name="登录"]', { timeout: TIME_OUT })

    //等待页面跳转
    await page.waitForNavigation({ timeout: 5000 })

    //点击进入按钮
    await expect(page).toClick('a[href = "javascript: personSub()"]', { timeout: TIME_OUT })

    //等待页面跳转
    await page.waitForNavigation({ timeout: 5000 })
    await expect(page).toClick(`a[onclick="requestTabObjects('110000',2,'110002');"]`, { timeout: TIME_OUT })

    const mainFrame = page.mainFrame(),
        childFrames = mainFrame.childFrames(),
        firstFrame = childFrames[0]

    const personalBalanceSelector = 'table:nth-child(6) tr:nth-child(2) input'
    const personalBalanceElement = await firstFrame.waitForSelector(personalBalanceSelector)
    const personalBalanceValue = await firstFrame.$eval(personalBalanceSelector, el => el.value)

    console.log(`余额: ${personalBalanceValue}`)
})()