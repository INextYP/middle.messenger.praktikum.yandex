import Block, { AttributesType } from '../../services/block'
import {
    InputType,
    ValidationReturnType,
    validator,
} from '../../services/valdator'

import { RegisterPageProps, RegisterPageKeys } from './types'

import registerPageTemplate from './register-page.html?raw'

export class RegisterPage extends Block<RegisterPageProps, RegisterPageKeys> {
    constructor(props: RegisterPageProps) {
        super({
            ...props,
            onBlur: (e: Event) => {
                const { id, value } = e.currentTarget as HTMLInputElement

                const key = id as keyof RegisterPageKeys
                const currentAttribute = this.attributes?.[
                    key
                ] as AttributesType

                if (key === 'password_check' && !value) {
                    currentAttribute.attributes.errorText.setProps({
                        errorText: 'Повторите пароль',
                    })

                    return false
                }

                const [isValid, message] = validator.validate(
                    id as InputType,
                    value,
                ) as ValidationReturnType

                if (!isValid) {
                    currentAttribute.attributes.errorText.setProps({
                        errorText: message,
                    })

                    return false
                }

                currentAttribute.attributes.errorText.setProps({
                    errorText: undefined,
                })

                return true
            },
            events: {
                form: {
                    submit: (e: Event) => {
                        e.preventDefault()

                        const {
                            id: firstNameInputId,
                            value: firstNameInputValue,
                        } = this.getInputValue(
                            'first_name',
                        ) as unknown as HTMLInputElement
                        const {
                            id: secondNameInputId,
                            value: secondNameInputValue,
                        } = this.getInputValue(
                            'second_name',
                        ) as unknown as HTMLInputElement
                        const { id: loginInputId, value: loginInputValue } =
                            this.getInputValue(
                                'login',
                            ) as unknown as HTMLInputElement
                        const { id: phoneInputId, value: phoneInputValue } =
                            this.getInputValue(
                                'phone',
                            ) as unknown as HTMLInputElement
                        const {
                            id: passwordInputId,
                            value: passwordInputValue,
                        } = this.getInputValue(
                            'password',
                        ) as unknown as HTMLInputElement
                        const {
                            id: passwordCheckInputId,
                            value: passwordCheckInputValue,
                        } = this.getInputValue(
                            'password_check',
                        ) as unknown as HTMLInputElement

                        const validatedFields = [
                            [
                                ...(validator.validate(
                                    firstNameInputId as InputType,
                                    firstNameInputValue,
                                ) as ValidationReturnType),
                                firstNameInputId,
                            ],
                            [
                                ...(validator.validate(
                                    secondNameInputId as InputType,
                                    secondNameInputValue,
                                ) as ValidationReturnType),
                                secondNameInputId,
                            ],
                            [
                                ...(validator.validate(
                                    loginInputId as InputType,
                                    loginInputValue,
                                ) as ValidationReturnType),
                                loginInputId,
                            ],
                            [
                                ...(validator.validate(
                                    phoneInputId as InputType,
                                    phoneInputValue,
                                ) as ValidationReturnType),
                                phoneInputId,
                            ],
                            [
                                ...(validator.validate(
                                    passwordInputId as InputType,
                                    passwordInputValue,
                                ) as ValidationReturnType),
                                passwordInputId,
                            ],
                        ]

                        for (const [
                            hasError,
                            errorText,
                            fieldId,
                        ] of validatedFields) {
                            if (!hasError) {
                                const key = fieldId as keyof RegisterPageKeys
                                ;(
                                    this.attributes?.[key] as AttributesType
                                ).attributes.errorText.setProps({
                                    errorText,
                                })
                            }
                        }

                        if (passwordCheckInputValue !== passwordInputValue) {
                            const key =
                                passwordCheckInputId as keyof RegisterPageKeys

                            ;(
                                this.attributes?.[key] as AttributesType
                            ).attributes.errorText.setProps({
                                errorText: 'Пароли не совпадают',
                            })
                        }

                        console.log(
                            'submitData',
                            firstNameInputValue,
                            secondNameInputValue,
                            loginInputValue,
                            phoneInputValue,
                            passwordInputValue,
                            passwordCheckInputValue,
                        )
                    },
                },
            },
        })
    }

    getInputValue(key: keyof RegisterPageKeys) {
        return (this.attributes?.[key] as AttributesType).attributes.input
    }

    render() {
        return this.compile(registerPageTemplate, this.props)
    }
}
