import { v4 as generateUUID } from 'uuid'
import { EventBus } from './event-bus'
import { Hbs } from './handlebars'

export type AttributesType = Record<string, Record<string, Block<unknown>>>

export abstract class Block<TProps, TAttributes = Record<string, unknown>> {
    static EVENTS = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_CDU: 'flow:component-did-update',
        FLOW_RENDER: 'flow:render',
    }

    props: TProps | Record<string, unknown>
    attributes: Record<string, unknown> | TAttributes
    eventBus
    children: unknown[] | TProps[] | Record<string, unknown>
    _element: HTMLElement | undefined
    _id: string

    constructor(propsAndChildren = {}) {
        const eventBus = new EventBus()

        const { children, props } = this._getChildren(propsAndChildren)

        this._id = generateUUID()

        this.children = children

        this.attributes = {}

        this.props = this._makePropsProxy({ ...props, __id: this._id })

        this.eventBus = () => eventBus

        this._registerEvents(eventBus)

        eventBus.emit(Block.EVENTS.INIT)
    }

    _registerEvents(eventBus: EventBus) {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this))
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this))
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this))
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this))
    }

    public init() {
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER)
    }

    _addAttribute(
        attributesArray: HTMLElement[],
        attr: Record<string, unknown>,
    ) {
        this.attributes = Array.from(attributesArray).reduce((acc, item) => {
            const key = item.getAttribute('key') as string
            acc[key] = item
            item.removeAttribute('key')
            return acc
        }, attr)
    }

    _insertChildren(instance: Block<unknown>, fragment: DocumentFragment) {
        const targetPlaceholder = fragment.querySelector(
            `[data-id="${instance._id}"]`,
        )
        if (targetPlaceholder) {
            const contentElement = instance.getContent() as HTMLElement
            contentElement.append(...Array.from(targetPlaceholder.childNodes))
            targetPlaceholder.replaceWith(contentElement)
        }
    }

    compile(template: string, props: TProps) {
        const propsAndStubs = { ...props } as Record<string, string>

        const fragment = this._createDocumentElement(
            'template',
        ) as HTMLDivElement

        const { attr, compiledTemplate, children } = Hbs.compile(
            template,
            propsAndStubs,
        )

        this.children = children.map((item) => item)

        fragment.innerHTML = compiledTemplate

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const content = fragment.content
        const attributesArray = content.querySelectorAll('[key]')

        this._addAttribute(attributesArray, attr)

        children.forEach((item) =>
            this._insertChildren(item as Block<unknown>, content),
        )

        return content.firstElementChild
    }

    _getChildren(propsAndChildren: Record<string, unknown>) {
        const children = {} as Record<string, unknown>
        const props = {} as Record<string, unknown>

        Object.entries(propsAndChildren).forEach(([key, value]) => {
            if (value instanceof Block) {
                children[key] = value
            } else {
                props[key] = value
            }
        })

        return { children, props }
    }

    _addEvents() {
        this._handleEvents('addEvent')
    }

    _removeEvents() {
        this._handleEvents('removeEvent')
    }

    _handleEvents(key: 'addEvent' | 'removeEvent') {
        const { events = {} } = this.props as Record<string, unknown>

        Object.keys(events as Record<string, unknown>).forEach((event) => {
            const currentEvent = (events as Record<string, unknown>)[event]

            if (typeof currentEvent == 'function') {
                if (key === 'addEvent') {
                    ;(this._element as HTMLElement).addEventListener(
                        event,
                        currentEvent as () => void,
                    )
                } else {
                    ;(this._element as HTMLElement).removeEventListener(
                        event,
                        currentEvent as () => void,
                    )
                }
            } else {
                const eventsObject = currentEvent as Record<string, () => void>
                for (const childrenEvent in eventsObject) {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    const element = this.attributes[event] as HTMLElement

                    if (element) {
                        if (key === 'addEvent') {
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-expect-error
                            element.addEventListener(
                                childrenEvent,
                                (currentEvent as Record<string, unknown>)[
                                    childrenEvent
                                ],
                            )
                        } else {
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-expect-error
                            element.removeEventListener(
                                childrenEvent,
                                (currentEvent as Record<string, unknown>)[
                                    childrenEvent
                                ],
                            )
                        }
                    }
                }
            }
        })
    }

    _componentDidMount() {
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER)
        this.componentDidMount()

        Object.values(this.children).forEach((child) => {
            ;(child as Block<unknown>).dispatchComponentDidMount()
        })
    }

    componentDidMount() {}

    dispatchComponentDidMount() {
        this.eventBus().emit(Block.EVENTS.FLOW_CDM)
    }

    _componentDidUpdate() {
        const response = this.componentDidUpdate()
        if (!response) {
            return
        }
        this._render()
    }

    componentDidUpdate() {
        return true
    }

    setProps = (nextProps: Record<string, unknown>) => {
        if (!nextProps) {
            return
        }

        Object.assign(this.props as Record<string, unknown>, nextProps)
    }

    get element() {
        return this._element
    }

    _render() {
        const template = this.render() as unknown as HTMLElement

        this._removeEvents()

        if (this._element) {
            this._element.replaceWith(template)
        }

        this._element = template

        this._addEvents()
    }

    render() {}

    getContent() {
        return this.element
    }

    _makePropsProxy(props: Record<string, unknown>) {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const self = this

        return new Proxy(props, {
            get(target, prop) {
                const value = target[prop as string]
                return typeof value === 'function' ? value.bind(target) : value
            },
            set(target, prop, value) {
                target[prop as string] = value
                self.eventBus().emit(
                    Block.EVENTS.FLOW_CDU,
                    { ...target },
                    target,
                )
                return true
            },
            deleteProperty() {
                throw new Error('Нет доступа')
            },
        })
    }

    _createDocumentElement(tagName: string) {
        const element = document.createElement(tagName)
        element.setAttribute('data-id', this._id)
        return element
    }

    show() {
        ;(this.getContent() as HTMLElement).style.display = 'block'
    }

    hide() {
        ;(this.getContent() as HTMLElement).style.display = 'none'
    }
}

export default Block
