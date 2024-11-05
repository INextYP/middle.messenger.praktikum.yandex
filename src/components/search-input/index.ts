import Block from '../../services/block'
import { SearchInputProps } from './types'

import { template } from './search-input.hbs.ts'

export class SearchInput extends Block<SearchInputProps> {
    static name = 'SearchInput'

    constructor(props: SearchInputProps) {
        super(props)
    }

    render() {
        return this.compile(template, this.props)
    }
}
