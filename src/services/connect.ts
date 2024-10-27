import Block from './block'
import Store, { State, StoreEvents } from './Store'

export function connect(mapStateToProps: (state: State) => State) {
    return function (Component: typeof Block) {
        return class extends Component<unknown> {
            constructor(props: Record<string, unknown>) {
                let state = mapStateToProps(Store.getState() as State)

                super({ ...props, ...state })

                Store.on(StoreEvents.Updated, () => {
                    const newState = mapStateToProps(Store.getState() as State)

                    this.setProps({ ...newState })

                    state = newState
                })

                this.render()
            }
        }
    }
}
