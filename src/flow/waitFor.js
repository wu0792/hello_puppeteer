const Flow = require('./base')

const WAIT_FOR_TYPE_ENUM = {
    selector: {
        func: 'waitForSelector'
    },
    func: {
        func: 'waitForFunction'
    }
}

module.exports = class extends Flow {
    constructor(page, type) {
        super(page)

        let waitTypeEnum = WAIT_FOR_TYPE_ENUM[type]
        if (waitTypeEnum) {
            this.waitForType = waitTypeEnum
        } else {
            throw new Error(`unknown type: ${type}`)
        }
    }

    async doExecute(params) {
        return await this.page[this.waitForType.func](...params)
    }
}