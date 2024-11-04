import Block from '../../services/block'
import { AuthController } from '../../controllers/auth'
import { UserController } from '../../controllers/user'
import { validator } from '../../services/valdator'
import { ProfilePageKeys, ProfilePageProps } from './types'

import profilePageTemplate from './profile-page.html?raw'

const authController = new AuthController()
const userController = new UserController()

export class ProfilePage extends Block<ProfilePageProps, ProfilePageKeys> {
    constructor(props: ProfilePageProps) {
        super({
            ...props,
            events: {
                form: {
                    submit: (e: Event) => {
                        e.preventDefault()

                        if (this.props.isEditPassword) {
                            const {
                                old_password,
                                new_password,
                                check_new_password,
                            } = this.attributes as ProfilePageKeys

                            const isValidOldPassword =
                                old_password.handleValidation()
                            const isValidNewPassword =
                                new_password.handleValidation()
                            const passwordsIsEqual =
                                check_new_password.handleValidation()

                            if (
                                isValidOldPassword &&
                                isValidNewPassword &&
                                passwordsIsEqual
                            ) {
                                const oldPassword = old_password.getInputData(
                                    'value',
                                ) as string
                                const newPassword = old_password.getInputData(
                                    'value',
                                ) as string

                                userController
                                    .updateUserPassword({
                                        newPassword,
                                        oldPassword,
                                    })
                                    .catch((error) => console.log(error))
                                    .finally(() => {
                                        this.setProps({ isEditPassword: false })
                                    })
                            }
                        } else {
                            const {
                                phone,
                                email,
                                login,
                                first_name,
                                display_name,
                                second_name,
                            } = this.attributes as ProfilePageKeys

                            const isValidPhone = phone.handleValidation()
                            const isValidEmail = email.handleValidation()
                            const isValidLogin = login.handleValidation()
                            const isValidFirstName =
                                first_name.handleValidation()
                            const isValidDisplayName =
                                display_name.handleValidation()
                            const isValidSecondName =
                                second_name.handleValidation()

                            if (
                                isValidPhone &&
                                isValidEmail &&
                                isValidLogin &&
                                isValidFirstName &&
                                isValidDisplayName &&
                                isValidSecondName
                            ) {
                                const phoneValue = phone.getInputData(
                                    'value',
                                ) as string
                                const emailValue = email.getInputData(
                                    'value',
                                ) as string
                                const loginValue = login.getInputData(
                                    'value',
                                ) as string
                                const firstNameValue = first_name.getInputData(
                                    'value',
                                ) as string
                                const displayNameValue =
                                    display_name.getInputData('value') as string
                                const secondNameValue =
                                    second_name.getInputData('value') as string

                                userController
                                    .updateUserData({
                                        email: emailValue,
                                        phone: phoneValue,
                                        login: loginValue,
                                        second_name: secondNameValue,
                                        display_name: displayNameValue,
                                        first_name: firstNameValue,
                                    })
                                    .catch((e) => console.error(e))
                                    .finally(() => {
                                        this.setProps({ isEdit: false })
                                    })
                            }
                        }
                    },
                },
            },
            onValidate: {
                first_name: validator.checkName,
                second_name: validator.checkName,
                email: validator.checkEmail,
                login: validator.checkLogin,
                phone: validator.checkPhone,
                password: validator.checkPassword,
                check_new_password: (value: string) => {
                    const passwordInput = this.attributes
                        .new_password as ProfilePageKeys['new_password']

                    if (value !== (passwordInput.getInputData('value') || '')) {
                        return [false, 'Пароли не совпадают']
                    }

                    return [true, null]
                },
            },
            onLogout: (e: Event) => {
                e.preventDefault()

                authController.logout().catch((error) => {
                    console.error(error)
                })
            },
            onEditData: (e: Event) => {
                e.preventDefault()
                this.setProps({ isEdit: true })
            },
            onEditPassword: (e: Event) => {
                e.preventDefault()
                this.setProps({ isEditPassword: true })
            },
            onChangeAvatar: (e: Event) => {
                e.preventDefault()
                this.setProps({ isOpenModal: true })
            },
            onSubmit: (avatar: File) => {
                userController.updateUserAvatar(avatar).then(() => {
                    this.setProps({ isOpenModal: false })
                })
            },
        })
    }

    componentDidMount() {
        authController.getUserData().catch((error) => console.error(error))
    }

    render() {
        return this.compile(profilePageTemplate, this.props)
    }
}
