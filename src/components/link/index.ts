import Block from '../../services/block'
import { LinkProps } from './types'

import linkTemplate from './link.html?raw'

export class Link extends Block<LinkProps> {
    constructor(props: LinkProps) {
        super(props)
    }

    render() {
        return this.compile(linkTemplate, this.props)
    }
}
