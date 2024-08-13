import Block from '../../services/block'
import { AvatarProps } from './types'

import avatarTemplate from './avatar.html?raw'

export class Avatar extends Block<AvatarProps> {
    static name = 'Avatar'

    constructor(props: AvatarProps) {
        super(props)
    }

    render() {
        return this.compile(avatarTemplate, this.props)
    }
}
