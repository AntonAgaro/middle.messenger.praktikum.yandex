import { describe, it } from 'mocha'
import { assert } from 'chai'
import { isEqual } from './functions.ts'

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
