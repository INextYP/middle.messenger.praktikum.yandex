import Block from '../../services/block'
import { AvatarProps } from './types'

import { template } from './avatar.hbs.ts'

export class Avatar extends Block<AvatarProps> {
    static name = 'Avatar'

    constructor(props: AvatarProps) {
        super({
            ...props,
            events: {
                overlay: {
                    click: props.onClick,
                },
            },
        })
    }

    render() {
        return this.compile(template, this.props)
    }
}
