import './App.css'
import { Provider } from 'react-redux'
import { store } from '~/Config/ReduxConfig/Store'
import { BrowserRouter } from 'react-router-dom'
import Navigation from '~/Navigation/Navigation'
import GlobalLoading, { globalLoadingRef } from '~/Components/GlobalLoading'
import { I18nextProvider } from 'react-i18next'
import i18n from '~/Config/i18n.js'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <>
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <BrowserRouter>
            <Navigation />
          </BrowserRouter>
          <GlobalLoading ref={globalLoadingRef} />
          <ToastContainer />
        </Provider>
      </I18nextProvider>
    </>
  )
}

export default App
