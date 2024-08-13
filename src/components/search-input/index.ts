import Block from '../../services/block'
import { SearchInputProps } from './types'

import searchInputTemplate from './search-input.html?raw'

export class SearchInput extends Block<SearchInputProps> {
    static name = 'SearchInput'

    constructor(props: SearchInputProps) {
        super(props)
    }

    render() {
        return this.compile(searchInputTemplate, this.props)
    }
}
