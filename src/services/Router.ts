import { Route } from './Route.ts'
import Block from './block.ts'
import { appContainer } from '../app/constants'

export class Router {
    private routes: Route[] = []
    private _currentRoute: Route | null = null
    private readonly history = window.history
    private readonly _rootQuery: Element

    constructor(rootQuery: Element) {
        this._rootQuery = rootQuery
    }

    use(pathname: string, block: typeof Block) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const route = new Route(pathname, block, { rootQuery: this._rootQuery })

        this.routes.push(route)

        return this
    }

    start() {
        window.onpopstate = ((event: PopStateEvent) => {
            const currentTarget = event.currentTarget as Window
            this._onRoute(currentTarget.location.pathname)
        }).bind(this)

        this._onRoute(window.location.pathname)
    }

    _onRoute(pathname: string) {
        const route = this.getRoute(pathname)
        if (!route) {
            return
        }

        if (this._currentRoute && this._currentRoute !== route) {
            this._currentRoute.leave()
        }

        this._currentRoute = route
        route.render()
    }

    public go(pathname: string) {
        this.history.pushState({}, '', pathname)
        this._onRoute(pathname)
    }

    getRoute(pathname: string) {
        return this.routes.find((route) => route.match(pathname))
    }
}

export const router = new Router(appContainer)
