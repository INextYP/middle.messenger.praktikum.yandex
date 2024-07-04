import { registerPartials, buildTemplates } from './helpers'
import { Routes } from './app/types'
import { appContainer, pageConfig } from './app/constants'
import './style.scss'

registerPartials()
buildTemplates()

function switchPage(newPage: `${Routes}`) {
    appContainer.innerHTML = pageConfig[newPage]
}

document.addEventListener('DOMContentLoaded', () => {
    switchPage(Routes.login)
})

document.addEventListener('click', (e) => {
    e.preventDefault()
    const to = (e.target as HTMLButtonElement).getAttribute('to')
    const href = (e.target as HTMLLinkElement).getAttribute('href')

    if (to || href) {
        switchPage((to || href) as `${Routes}`)
    }
})
