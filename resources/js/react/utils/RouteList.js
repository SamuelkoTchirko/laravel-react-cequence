import React from 'react'
import ReactDOM from 'react-dom'
import { Routes, Route } from 'react-router-dom'

//  Components
import Home from '../pages/Home'

function RouteList () {
    return (
        <Routes>
            <Route path="/" element={ <Home /> }/>
        </Routes>
    )
}

export default RouteList
