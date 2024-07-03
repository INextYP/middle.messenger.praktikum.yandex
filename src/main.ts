import { registerPartials, buildTemplates, pageConfig } from './helpers'
import './style.scss'

const appContainer = document.querySelector<HTMLDivElement>(
    '#app',
) as HTMLDivElement

registerPartials()
buildTemplates()

function switchPage(newPage: string) {
    appContainer.innerHTML = pageConfig[newPage]
}

document.addEventListener('DOMContentLoaded', () => switchPage('login'))
