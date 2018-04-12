// const GotoFlow = require('../flow/goto')
// const WaitForFlow = require('../flow/waitFor')
// const QueryFlow = require('../flow/query')
// const HoverAction = require('../action/hover')
// const ClickAction = require('../action/click')
// const TypeAction = require('../action/type')

const SUB_GROUP_FLOW_MAP = {
    goto: 'GotoFlow',
    wait: 'WaitForFlow',
    query: 'QueryFlow'
}

const SUB_GROUP_ACTION_MAP = {
    hover: 'HoverAction',
    click: 'ClickAction',
    type: 'TypeAction'
}

const GROUP_MAP = {
    flow: SUB_GROUP_FLOW_MAP,
    action: SUB_GROUP_ACTION_MAP
}

module.exports = GROUP_MAP