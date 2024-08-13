import Block from '../../services/block'
import { Page404Props } from './types'

import page404Template from './page-404.html?raw'

export class Page404 extends Block<Page404Props> {
    constructor(props: Page404Props) {
        super(props)
    }

    render() {
        return this.compile(page404Template, this.props)
    }
}
