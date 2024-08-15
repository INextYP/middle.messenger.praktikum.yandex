import Block, { AttributesType } from '../../services/block'
import {
    InputType,
    ValidationReturnType,
    validator,
} from '../../services/valdator.ts'
import { Routes } from '../../app/types'
import { EditPasswordPageKeys, EditPasswordPageProps } from './types'

import editPasswordPageTemplate from './edit-password-page.html?raw'

export class EditPasswordPage extends Block<
    EditPasswordPageProps,
    EditPasswordPageKeys
> {
    constructor(props: EditPasswordPageProps) {
        super({
            ...props,
            onBlur: (e: Event) => {
                const { id, value } = e.currentTarget as HTMLInputElement

                const key = id as keyof EditPasswordPageKeys
                const currentAttribute = this.attributes?.[
                    key
                ] as AttributesType

                const [isValid, message] = validator.validate(
                    'password',
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
                            id: oldPasswordInputId,
                            value: oldPasswordInputValue,
                        } = this.getInputValue(
                            'old_password',
                        ) as unknown as HTMLInputElement
                        const {
                            id: newPasswordInputId,
                            value: newPasswordInputValue,
                        } = this.getInputValue(
                            'new_password',
                        ) as unknown as HTMLInputElement
                        const {
                            id: checkNewPasswordInputId,
                            value: checkNewPasswordInputValue,
                        } = this.getInputValue(
                            'check_new_password',
                        ) as unknown as HTMLInputElement

                        const [
                            isValidOldPasswordInput,
                            oldPasswordInputErrorMessage,
                        ] = validator.validate(
                            'password' as InputType,
                            oldPasswordInputValue,
                        ) as ValidationReturnType

                        const [
                            isValidNewPasswordInput,
                            newPasswordInputErrorMessage,
                        ] = validator.validate(
                            'password' as InputType,
                            newPasswordInputValue,
                        ) as ValidationReturnType

                        const [
                            isValidCheckNewPasswordInput,
                            checkNewPasswordInputErrorMessage,
                        ] = validator.validate(
                            'password' as InputType,
                            checkNewPasswordInputValue,
                        ) as ValidationReturnType

                        if (!isValidOldPasswordInput) {
                            const key =
                                oldPasswordInputId as keyof EditPasswordPageKeys
                            ;(
                                this.attributes?.[key] as AttributesType
                            ).attributes.errorText.setProps({
                                errorText: oldPasswordInputErrorMessage,
                            })
                        }

                        if (!isValidCheckNewPasswordInput) {
                            const key =
                                newPasswordInputId as keyof EditPasswordPageKeys
                            ;(
                                this.attributes?.[key] as AttributesType
                            ).attributes.errorText.setProps({
                                errorText: newPasswordInputErrorMessage,
                            })
                        }

                        if (!isValidNewPasswordInput) {
                            const key =
                                checkNewPasswordInputId as keyof EditPasswordPageKeys
                            ;(
                                this.attributes?.[key] as AttributesType
                            ).attributes.errorText.setProps({
                                errorText: checkNewPasswordInputErrorMessage,
                            })
                        }

                        if (
                            isValidOldPasswordInput &&
                            isValidCheckNewPasswordInput &&
                            isValidNewPasswordInput
                        ) {
                            ;(
                                this.attributes as EditPasswordPageKeys
                            ).submitButton.setProps({
                                to: Routes.profile,
                            })
                        }

                        console.log(
                            'submitData',
                            oldPasswordInputValue,
                            newPasswordInputValue,
                            checkNewPasswordInputValue,
                        )
                    },
                },
            },
        })
    }

    getInputValue(key: keyof EditPasswordPageKeys) {
        return (this.attributes?.[key] as AttributesType).attributes.input
    }

    render() {
        return this.compile(editPasswordPageTemplate, this.props)
    }
}
