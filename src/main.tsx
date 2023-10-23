import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { store } from "./store/store.ts"
import { Provider } from "react-redux"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css'
import "../public/assets/css/main.css"
ReactDOM.createRoot(document.getElementById('root')!).render(

    <Provider store={store}>
      <App />
      <ToastContainer autoClose={2000}/>
    </Provider>

)
