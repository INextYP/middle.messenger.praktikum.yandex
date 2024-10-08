import { Block } from '../../services/block'
import { TitleProps } from './types'

import titleTemplate from './title.html?raw'

export class Title extends Block<TitleProps> {
    static name = 'Title'

    constructor(props: TitleProps) {
        super(props)
    }

    render() {
        return this.compile(titleTemplate, this.props)
    }
}
