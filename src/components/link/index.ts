import Block from '../../services/block'
import { LinkProps } from './types'

import { template } from './link.hbs.ts'

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
        return this.compile(template, this.props)
    }
}
