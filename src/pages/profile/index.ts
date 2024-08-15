import Block from '../../services/block'
import { ProfilePageKeys, ProfilePageProps } from './types'

import profilePageTemplate from './profile-page.html?raw'

export class ProfilePage extends Block<ProfilePageProps, ProfilePageKeys> {
    constructor(props: ProfilePageProps) {
        super(props)
    }

    render() {
        return this.compile(profilePageTemplate, this.props)
    }
}
