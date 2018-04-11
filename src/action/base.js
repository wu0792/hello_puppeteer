module.exports = class {
    constructor(element) {
        this.element = element
    }

    setElement(element) {
        this.element = element
    }

    async doExecute(params) {
    }

    async execute(...params) {
        return await this.doExecute(params)
    }
}