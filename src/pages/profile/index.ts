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

    render() {
        return this.compile(profilePageTemplate, this.props)
    }
}
