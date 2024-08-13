import Block, { AttributesType } from '../../services/block'
import {
    InputType,
    ValidationReturnType,
    validator,
} from '../../services/valdator'
import { EditProfilePageKeys, EditProfilePageProps } from './types'

import editProfilePageTemplate from './edit-profile-page.html?raw'

export class EditProfilePage extends Block<
    EditProfilePageProps,
    EditProfilePageKeys
> {
    constructor(props: EditProfilePageProps) {
        super({
            ...props,
            onBlur: (e: Event) => {
                const { id, value } = e.currentTarget as HTMLInputElement

                const key = id as keyof EditProfilePageKeys
                const currentAttribute = this.attributes?.[
                    key
                ] as AttributesType

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
        })
    }

    getInputValue(key: keyof EditProfilePageKeys) {
        return (this.attributes?.[key] as AttributesType).attributes.input
    }

    componentDidMount() {
        ;(this.attributes as EditProfilePageKeys).form.addEventListener(
            'submit',
            (e: Event) => {
                e.preventDefault()

                const { id: firstNameInputId, value: firstNameInputValue } =
                    this.getInputValue(
                        'first_name',
                    ) as unknown as HTMLInputElement
                const { id: secondNameInputId, value: secondNameInputValue } =
                    this.getInputValue(
                        'second_name',
                    ) as unknown as HTMLInputElement
                const { id: loginInputId, value: loginInputValue } =
                    this.getInputValue('login') as unknown as HTMLInputElement
                const { id: phoneInputId, value: phoneInputValue } =
                    this.getInputValue('phone') as unknown as HTMLInputElement
                const { id: chatNameInputId, value: chatNameInputValue } =
                    this.getInputValue(
                        'chat_name',
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
                            chatNameInputId as InputType,
                            chatNameInputValue,
                        ) as ValidationReturnType),
                        chatNameInputId,
                    ],
                ]

                for (const [hasError, errorText, fieldId] of validatedFields) {
                    if (!hasError) {
                        const key = fieldId as keyof EditProfilePageKeys
                        ;(
                            this.attributes?.[key] as AttributesType
                        ).attributes.errorText.setProps({
                            errorText,
                        })
                    }
                }

                console.log(
                    'submitData',
                    firstNameInputValue,
                    secondNameInputValue,
                    loginInputValue,
                    phoneInputValue,
                    chatNameInputValue,
                )
            },
        )
    }

    render() {
        return this.compile(editProfilePageTemplate, this.props)
    }
}
