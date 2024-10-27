import Block from './block.ts'
import { renderDOM } from '../helpers'

export class Route {
    private pathname: string
    private readonly blockClass: new (
        props: Record<string, unknown>,
    ) => Block<Record<string, unknown>>
    private block: typeof Block | null = null
    private _props: Record<string, unknown> = {}

    constructor(
        pathname: string,
        view: new (
            props: Record<string, unknown>,
        ) => Block<Record<string, unknown>>,
        props: Record<string, unknown>,
    ) {
        this.pathname = pathname
        this.blockClass = view
        this._props = props
    }

    navigate(pathname: string) {
        if (this.match(pathname)) {
            this.pathname = pathname
            this.render()
        }
    }

    leave() {
        if (this.block) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            this.block.hide()
        }
    }

    match(pathname: string) {
        return this.pathname == pathname
    }

    render() {
        const appContainer = this._props.rootQuery as HTMLDivElement
        appContainer.innerHTML = ''

        if (!this.block) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            this.block = new this.blockClass()

            renderDOM(
                appContainer,
                this.block as unknown as Block<Record<string, unknown>>,
            )
            return
        }

        return renderDOM(
            appContainer,
            this.block as unknown as Block<Record<string, unknown>>,
        )
    }
}
