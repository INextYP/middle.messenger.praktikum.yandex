import Block from '../services/block'

export const renderDOM = (root: Element, block: Block<unknown>) => {
    root.append(block.getContent() as never) // TODO: need fix

    block.dispatchComponentDidMount()

    return root
}
