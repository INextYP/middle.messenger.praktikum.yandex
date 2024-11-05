import Handlebars, { HelperOptions } from 'handlebars'
import Block from './block'

const { compile } = Handlebars

export type ComponentType = new (
    hash: Record<string, unknown>,
) => Block<unknown>

export class Hbs {
    public static compile(
        template: string,
        options: Record<string, unknown> = {},
    ) {
        const context = {
            ...options,
            _attr: {},
            _children: [] as unknown[],
        }

        return {
            compiledTemplate: compile(template)(context),
            attr: context._attr,
            children: context._children,
        }
    }

    public static registerHelper(Component: ComponentType) {
        Handlebars.registerHelper(
            Component.name,
            function (this: unknown, { fn, hash, data }: HelperOptions) {
                const instance = new Component(hash)

                data.root._children = data.root._children || []
                data.root_attr = data.root._attr || {}

                if ('key' in hash) {
                    data.root_attr[hash.key] = instance
                }

                data.root._children.push(instance)

                const content = fn ? fn(this) : ''

                return `<div data-id="${instance._id}">${content}</div>`
            },
        )
    }
}
