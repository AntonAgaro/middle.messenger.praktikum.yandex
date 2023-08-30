import { afterEach, beforeEach, describe } from 'mocha'
import * as sinonChai from 'sinon-chai'
import { expect, use } from 'chai'
import { createSandbox, SinonStub } from 'sinon'
import HTTPTransport from './HTTPTransort.ts'

describe('HTTPTransport Test', () => {
  use(sinonChai.default)
  const sandbox = createSandbox()

  let http: HTTPTransport
  let request: SinonStub<any>

  beforeEach(() => {
    http = new HTTPTransport()
    request = sandbox.stub(http, 'request').callsFake(() => Promise.resolve())
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('Should stringify query object', () => {
    http.get('', { data: { a: '1', b: 2 } })
    expect(request).calledWithMatch('?a=1&b=2')
  })
})
