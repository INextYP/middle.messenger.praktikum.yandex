import Handlebars from 'handlebars'
import * as Pages from '../pages'
import { Routes } from '../app/types'
import { pageConfig, pageContext } from '../app/constants'

export const buildTemplates = () => {
    const pagesArray = Object.entries(Pages)

    for (let i = 0; i < pagesArray.length; i++) {
        const [pageName, pageComponent] = pagesArray[i]

        const key = pageName as `${Routes}`

        const context = pageContext[key]

        const template = Handlebars.compile(pageComponent)(context)

        pageConfig[key] = template

        console.log(pageConfig)
    }
}
