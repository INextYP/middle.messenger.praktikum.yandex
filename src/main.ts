import { registerPartials, buildTemplates } from './helpers'
import { Routes } from './app/types'
import { appContainer, pageConfig } from './app/constants'
import './style.scss'

registerPartials()
buildTemplates()

let currentPage: `${Routes}`

function switchPage(newPage: `${Routes}`) {
    appContainer.innerHTML = pageConfig[newPage]
    currentPage = newPage
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
