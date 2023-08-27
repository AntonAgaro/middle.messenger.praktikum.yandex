import jsdom from 'jsdom'

const { JSDOM } = jsdom

const jsDom = new JSDOM(`<!DOCTYPE html><body></body>`)

global.window = jsDom.window
global.document = jsDom.window.document
global.FormData = jsDom.window.FormData
