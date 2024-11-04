import Block from '../../services/block'
import { validator } from '../../services/valdator'
import { router } from '../../services/Router'
import { RegisterBody, Routes } from '../../app/types'

import { RegisterPageProps, RegisterPageKeys } from './types'

import registerPageTemplate from './register-page.html?raw'
import { AuthController } from '../../controllers/auth'

const authController = new AuthController()

export class RegisterPage extends Block<RegisterPageProps, RegisterPageKeys> {
    constructor(props: RegisterPageProps) {
        super({
            ...props,
            onValidate: {
                first_name: validator.checkName,
                second_name: validator.checkName,
                email: validator.checkEmail,
                login: validator.checkLogin,
                phone: validator.checkPhone,
                password: validator.checkPassword,
                password_check: (value: string) => {
                    const passwordInput = this.attributes
                        .password as RegisterPageKeys['password']

                    if (value !== passwordInput.getInputData('value')) {
                        return [false, 'Пароли не совпадают']
                    }

                    return [true, null]
                },
            },
            onRoute: (e: Event) => {
                e.preventDefault()
                router.go(Routes.login)
            },
            events: {
                form: {
                    submit: (e: Event) => {
                        e.preventDefault()

                        const attributes = this.attributes as RegisterPageKeys

                        const firstNameInput = attributes.first_name
                        const secondNameInput = attributes.second_name
                        const emailInput = attributes.email
                        const loginInput = attributes.login
                        const phoneInput = attributes.phone
                        const passwordInput = attributes.password
                        const passwordCheckInput = attributes.password_check

                        const validationResult = {
                            first_name: firstNameInput.handleValidation(),
                            second_name: secondNameInput.handleValidation(),
                            email: emailInput.handleValidation(),
                            login: loginInput.handleValidation(),
                            phone: phoneInput.handleValidation(),
                            password: passwordInput.handleValidation(),
                            password_check:
                                passwordCheckInput.handleValidation(),
                        }

                        const isValid =
                            Object.values(validationResult).filter(Boolean)
                                .length !== 0

                        if (isValid) {
                            const data = {
                                first_name:
                                    firstNameInput.getInputData('value'),
                                second_name:
                                    secondNameInput.getInputData('value'),
                                email: emailInput.getInputData('value'),
                                login: loginInput.getInputData('value'),
                                phone: phoneInput.getInputData('value'),
                                password: passwordInput.getInputData('value'),
                                password_check:
                                    passwordCheckInput.getInputData('value'),
                            } as RegisterBody

                            authController.register(data).catch((error) => {
                                console.error(error)
                            })
                        }
                    },
                },
            },
        })
    }

    render() {
        return this.compile(registerPageTemplate, this.props)
    }
}
