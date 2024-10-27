import Block from '../../services/block'
import { LinkProps } from './types'

import linkTemplate from './link.html?raw'

export class Link extends Block<LinkProps> {
    static name = 'Link'

    constructor(props: LinkProps) {
        super({
            ...props,
            events: {
                link: {
                    click: props?.onClick,
                },
            },
        })
    }

    render() {
        return this.compile(linkTemplate, this.props)
    }
}
