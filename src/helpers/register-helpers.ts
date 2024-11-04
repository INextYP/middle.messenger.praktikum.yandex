import Handlebars from 'handlebars'

export function registerHelpers() {
    Handlebars.registerHelper('or', function (a, b, options) {
        if (a || b) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            return options.fn(this)
        } else {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            return options.inverse(this)
        }
    })

    Handlebars.registerHelper('not', function (value) {
        return !value
    })
}
