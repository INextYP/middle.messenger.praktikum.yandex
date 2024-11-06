// eslint-disable-next-line @typescript-eslint/no-var-requires,no-undef
const jsdom = require('jsdom')

const { JSDOM } = jsdom

const { window } = new JSDOM('<div id="app"></div>', {
    url: 'http://localhost:555',
})

// eslint-disable-next-line no-undef
global.window = window
// eslint-disable-next-line no-undef
global.document = window.document
// eslint-disable-next-line no-undef
global.DocumentFragment = window.DocumentFragment
// eslint-disable-next-line no-undef
global.window.history = window.history
