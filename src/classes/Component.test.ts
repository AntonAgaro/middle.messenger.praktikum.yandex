import { describe, it } from 'mocha'
import { assert } from 'chai'
import Component from './Component.ts'

describe('Test Component', () => {
  const component = new Component('div')

  it('Should create passed tag', () => {
    const res = component.getContent()
    assert.equal(res?.tagName, 'DIV')
  })

  it('Should hide element', () => {
    component.hide()
    const el = component.getContent()
    assert.equal(el?.style.display, 'none')
  })

  it('Should show element', () => {
    component.hide()
    component.show()
    const el = component.getContent()
    assert.equal(el?.style.display, 'flex')
  })

  it('Should change props', () => {
    component.setProps({
      attrs: {
        class: 'test-class',
      },
    })

    const el = component.getContent()
    assert.equal(el?.className, 'test-class')
  })

  it('Should compile template with props', () => {
    const template = '<h1>{{title}}</h1>'
    const res = component.compile(template, { title: 'Test Title' })
    const title = res.querySelector('h1')
    assert.equal(title?.textContent, 'Test Title')
  })
})
