import * as Components from '../components'
import { ComponentType, Hbs } from '../services/handlebars'

export const buildTemplates = () => {
    const componentsArray = Object.entries(Components)
    for (let i = 0; i < componentsArray.length; i++) {
        const [, Component] = componentsArray[i]

        Hbs.registerHelper(Component as ComponentType)
    }
}
