import { afterEach, describe } from 'mocha'
import { expect, use } from 'chai'
import * as sinonChai from 'sinon-chai'
import { createSandbox, SinonStub } from 'sinon'
import RouterClass, { Router, routes } from './Router'
import Component from '../Component.ts'
import { Routes } from '../../enums/Routes.ts'

describe('Test Router', () => {
  use(sinonChai.default)
  const sandbox = createSandbox()
  let router: Router
  let pushState: SinonStub<any>
  let onRoute: SinonStub<any>

  beforeEach(() => {
    router = new Router('#app')
    routes.forEach((route) => {
      RouterClass.use(route.path, <typeof Component>(<unknown>route.component), route.params ?? {})
    })
    pushState = sandbox.stub(window.history, 'pushState').callsFake(() => null)
    onRoute = sandbox.stub(router, <any>'onRoute').callsFake(() => null)
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('Should use pushState one time', () => {
    router.go(Routes.User)
    expect(pushState).calledOnce
  })

  it('Should call onRoute with path param', () => {
    router.go('/sign-up')
    expect(onRoute).calledWith('/sign-up')
  })
})
