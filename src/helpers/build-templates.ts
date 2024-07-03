import Handlebars from 'handlebars'
import * as Pages from '../pages'

export const pageConfig: Record<string, string> = {
    login: '',
}

export const buildTemplates = () => {
    const pagesArray = Object.entries(Pages)

    for (let i = 0; i < pagesArray.length; i++) {
        const [pageName, pageComponent] = pagesArray[i]

        const template = Handlebars.compile(pageComponent)({})

        pageConfig[pageName] = template
    }
}
