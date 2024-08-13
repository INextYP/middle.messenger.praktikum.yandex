import { buildTemplates, registerPartials, renderDOM } from './helpers'
import { Routes } from './app/types'
import Block from './services/block'
import { appContainer, pageConfig } from './app/constants'
import './style.scss'

document.addEventListener('DOMContentLoaded', () => {
    buildTemplates()

    registerPartials()

    switchPage(Routes.login)
})

let currentPage: `${Routes}`
function switchPage(newPage: `${Routes}`) {
    currentPage = newPage
    appContainer.innerHTML = ''
    return renderDOM(
        appContainer,
        new pageConfig[newPage]({}) as Block<unknown>,
    )
}
function showModal() {
    const modalOverlay = document.getElementById(
        'modal-overlay',
    ) as HTMLDivElement
    modalOverlay.classList.add('visible')
}
function closeModal() {
    const modalOverlay = document.getElementById(
        'modal-overlay',
    ) as HTMLDivElement
    modalOverlay.classList.remove('visible')
}

document.addEventListener('click', (e) => {
    const to = (e.target as HTMLButtonElement).getAttribute('to')
    const href = (e.target as HTMLLinkElement).getAttribute('href')

    if (to || href) {
        e.preventDefault()
        switchPage((to || href) as `${Routes}`)
    }

    if (
        currentPage === Routes.profile ||
        currentPage === Routes.editProfile ||
        currentPage === Routes.editPassword
    ) {
        const imagePicker = document.querySelector('.overlay') as HTMLDivElement
        const closeButton = document.querySelector(
            '.modal-close-button',
        ) as HTMLButtonElement

        imagePicker.addEventListener('click', showModal)
        closeButton.addEventListener('click', closeModal)
    }
})
