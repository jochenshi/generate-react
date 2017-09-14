import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import './index.styl'

import Home from './module/home/home'

const About = React.createClass({
    propTypes: {
        name: React.PropTypes.string.isRequired
    },
    render() {
        return (
            React.DOM.h3(null, 'About' + this.props.name)
        )
    }
})

const Index = React.createClass({
    render() {
        console.log(this.props.location)
        return (
            <h3>Index</h3>
        )
    }
})

class App extends Component {
    render() {
        return (
            <div>
                <div className="test">Test page111</div>
                <ul>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/index">Index</Link>
                    </li>
                </ul>
                <div>
                    <Route path = "/about" render = { () => {
                        return React.createElement(About, {name: 'asd'})
                    }}/>
                    <Route path = "/index" component={Index}/>
                </div>
                <Home />
            </div>
        )
    }
}

export default App