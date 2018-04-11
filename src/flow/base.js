module.exports = class {
    constructor(page) {
        this.page = page
    }

    async doExecute(params) {
    }

    async execute(...params) {
        return await this.doExecute(params)
    }
}