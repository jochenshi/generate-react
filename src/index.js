import React from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'
import App from './App'


ReactDom.render(
    (
        <Router>
            <App/>
        </Router>
    ), document.getElementById('root')
)
