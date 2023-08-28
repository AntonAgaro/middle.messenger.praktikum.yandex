import { describe, it } from 'mocha'
import { assert } from 'chai'
import { render, isEqual, merge, set, trimAny, routeRender } from './functions.ts'
import Button from '../components/button/Button'

describe('Test render', () => {
  it('Should return correct text content', () => {
    const modalBtn = new Button({
      text: 'Добавить чат',
      attrs: {
        class: 'button',
        type: 'submit',
      },
    })

    render('body', modalBtn)
    const res = document.querySelector('button') as HTMLElement
    assert.equal(res.textContent, '\nДобавить чат\n')
  })
})

describe('Test isEqual', () => {
  it('Should return true for equal strings', () => {
    const result = isEqual('abc', 'abc')
    assert.equal(result, true)
  })

  it('Should return false for not equal strings', () => {
    const result = isEqual('abc', 'abc123')
    assert.equal(result, false)
  })
})

describe('Test set', () => {
  const testObj = {
    a: 1,
    b: 2,
    user: {
      name: '',
    },
  }

  it('Should create fields according to params', () => {
    set(testObj, 'user.name', 'Test')
    assert.equal(testObj.user.name, 'Test')
  })
})

describe('Test routeRender', () => {
  it('Should return correct text content', () => {
    const modalBtn = new Button({
      text: 'Добавить чат',
      attrs: {
        class: 'button',
        type: 'submit',
      },
    })

    routeRender('body', modalBtn)
    const res = document.querySelector('button') as HTMLElement
    assert.equal(res.textContent, '\nДобавить чат\n')
  })
})

describe('Test trimAny', () => {
  it('Should return string without !', () => {
    const result = trimAny('!!!test!!!!!', '!')
    assert.equal(result, 'test')
  })

  it('Should return string without spaces without arg', () => {
    const result = trimAny('    test   ')
    assert.equal(result, 'test')
  })
})

describe('Test merge', () => {
  it('Should return merged object', () => {
    const result = merge({ a: 1 }, { b: 2 })
    assert.equal(result.a, 1)
    assert.equal(result.b, 2)
  })
})
