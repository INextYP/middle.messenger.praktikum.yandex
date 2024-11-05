import { expect } from 'chai'
import { createSandbox, SinonStub } from 'sinon'
import HTTPTransport from './httpTransport'

describe('HTTP Transport', () => {
    const sandbox = createSandbox()
    let httpInstance: HTTPTransport
    let request: SinonStub

    beforeEach(() => {
        httpInstance = new HTTPTransport()
        request = sandbox
            .stub(httpInstance, 'request')
            .callsFake(async () => Promise.resolve())
    })

    afterEach(() => {
        sandbox.restore()
    })

    const testGetRequest = async (
        data: Record<string, string | number>,
        expectedUrl: string,
    ) => {
        it(`should format ${JSON.stringify(data)} correctly`, async () => {
            await httpInstance.get('', {}, data)

            expect(request.calledWithMatch(expectedUrl, { method: 'GET' }))
            request.resetHistory()
        })
    }

    describe('Various query options', () => {
        testGetRequest(
            { name: 'John Doe', notes: 'hello world!' },
            '?name=John%20Doe&notes=hello%20world%21',
        )
        testGetRequest(
            { temp: '23.5', pressure: '1013.25' },
            '?temp=23.5&pressure=1013.25',
        )
        testGetRequest(
            { url: 'https://example.com/path?query=1' },
            '?url=https%3A%2F%2Fexample.com%2Fpath%3Fquery%3D1',
        )
        testGetRequest(
            { emoji: '😀', currency: '€' },
            '?emoji=%F0%9F%98%80&currency=%E2%82%AC',
        )
        testGetRequest(
            { quote: 'The "best" way' },
            '?quote=The%20%22best%22%20way',
        )
        testGetRequest({ 'user@domain': 'active' }, '?user%40domain=active')
        testGetRequest(
            { greeting: 'こんにちは', farewell: '再见' },
            '?greeting=%E3%81%93%E3%82%93%E3%81%AB%E3%81%A1%E3%81%AF&farewell=%E5%86%8D%E8%A7%81',
        )
        testGetRequest({ pipeline: 'cmd|awk|sed' }, '?pipeline=cmd%7Cawk%7Csed')
    })
})
