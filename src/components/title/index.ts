import { Block } from '../../services/block'
import { TitleProps } from './types'

import { template } from './title.hbs.ts'

export class Title extends Block<TitleProps> {
    static name = 'Title'

    constructor(props: TitleProps) {
        super(props)
    }

    render() {
        return this.compile(template, this.props)
    }
}
