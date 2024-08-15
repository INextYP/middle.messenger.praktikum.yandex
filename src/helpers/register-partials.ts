import Handlebars from 'handlebars'
import * as Partials from '../partials'

export const registerPartials = () => {
    const partialsArray = Object.entries(Partials)

    for (let i = 0; i < partialsArray.length; i++) {
        const [partialName, partialComponent] = partialsArray[i]

        Handlebars.registerPartial(partialName, partialComponent)
    }
}
