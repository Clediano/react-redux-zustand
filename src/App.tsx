import { Player } from "./pages/Player";
import { store } from './store'
import { Provider } from 'react-redux'

export function App() {
  return (
    <Provider store={store}>
      <Player />
    </Provider>
  )
}

