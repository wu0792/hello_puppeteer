const Action = require('./base')

module.exports = class extends Action {
    constructor(element) {
        super(element)
    }

    async doExecute(params) {
        return await this.element.type(...params)
    }
}