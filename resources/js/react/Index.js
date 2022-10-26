import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'

//  Toast
import { ToastContainer } from 'react-toastify'

//  Components
import App from './App.js'

function Index () {
    return (
        <BrowserRouter>
            <App />
            <ToastContainer />
        </BrowserRouter>
    )
}

export default Index

if (document.getElementById('app')) {
    ReactDOM.render(<Index />, document.getElementById('app'))
}
