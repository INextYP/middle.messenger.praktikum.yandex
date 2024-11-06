import { createSandbox, SinonStub } from 'sinon'
import Block from './block.ts'
import { Router } from './Router.ts'
import { Route } from './Route.ts'
import { expect } from 'chai'

describe('Router', () => {
    let router: Router
    const sandbox = createSandbox()
    let renderStub: SinonStub

    class LoginPage extends Block<Record<string, unknown>> {
        render() {
            return this.compile('<div>test login page</div>', {})
        }
    }

    class ChatPage extends Block<Record<string, unknown>> {
        render() {
            return this.compile('<div>test chat page</div>', {})
        }
    }

    beforeEach(() => {
        router = new Router(document.createElement('div'))
        renderStub = sandbox
            .stub(Route.prototype, 'render')
            .callsFake(function (this: Route) {
                return this['block'] as unknown as Element
            })
    })

    afterEach(() => {
        sandbox.restore()
    })

    it('return Route instance after call use()', () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const result = router.use('/', LoginPage)
        expect(result).to.eq(router)
    })

    it('check call go() method', () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        router.use('/', LoginPage)
        router['go']('/')
        expect(renderStub.callCount).to.equal(1)
    })

    it('check multiple routes', () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        router.use('/', LoginPage).use('/chat', ChatPage)
        router['go']('/')
        expect(renderStub.callCount).to.equal(1)
        router['go']('/chat')
        expect(renderStub.callCount).to.equal(2)
    })
})
