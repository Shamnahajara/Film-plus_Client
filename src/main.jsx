import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "aos";
import "aos/dist/aos.css";
import {Provider} from 'react-redux';
import {Store,persistor} from './store/store'
import {PersistGate} from 'redux-persist/integration/react'
// import {ThemeProvider} from '@material-tailwind/react'
// import { ChakraProvider } from '@chakra-ui/react'
// import ChatProvider from '../src/Context/ChatProvider'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={Store}>
      <PersistGate loading={null} persistor={persistor}>
        {/* <ChakraProvider> */}
         {/* <ChatProvider> */}
          <App/>
         {/* </ChatProvider> */}
        {/* </ChakraProvider> */}
      </PersistGate>
    </Provider>
  </React.StrictMode>
)