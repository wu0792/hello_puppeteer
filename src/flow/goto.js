const Flow = require('./base')

module.exports = class extends Flow {
    constructor(page) {
        super(page)
    }

    async doExecute(params) {
        return await this.page.goto(...params)
    }
}