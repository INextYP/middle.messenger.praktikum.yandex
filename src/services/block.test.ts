import { assert } from 'chai'
import Block from './block'

class BlockForTest extends Block<object> {
    constructor(props: Record<string, unknown>) {
        super({ ...props, message: 'Hello World!' })
    }

    render() {
        return this.compile(`<div>{{message}}</div>`, this.props)
    }
}

const tesForTest = new BlockForTest({})

describe('Block class', () => {
    it('check content after call render', () => {
        const currentElement = tesForTest.getContent()?.innerHTML

        assert.equal(currentElement, 'Hello World!')
    })

    it('check setProps method', () => {
        tesForTest.setProps({
            message: 'Hello',
        })

        const currentElement = tesForTest.getContent()?.innerHTML

        assert.equal(currentElement, 'Hello')
    })
})
