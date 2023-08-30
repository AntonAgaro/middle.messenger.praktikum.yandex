import jsdom from 'jsdom'

const { JSDOM } = jsdom

const jsDom = new JSDOM(`<!DOCTYPE html><body></body>`, {
  url: 'https://example.com/',
})

global.window = jsDom.window
global.document = jsDom.window.document
global.FormData = jsDom.window.FormData
global.XMLHttpRequest = jsDom.window.XMLHttpRequest
