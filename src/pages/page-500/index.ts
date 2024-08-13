import Block from '../../services/block'
import { Page500Props } from './types'

import page500Template from './page-500.html?raw'

export class Page500 extends Block<Page500Props> {
    constructor(props: Page500Props) {
        super(props)
    }

    render() {
        return this.compile(page500Template, this.props)
    }
}
