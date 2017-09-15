import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import './index.styl'

import Home from './module/home/home'

const About = React.createClass({
    propTypes: {
        name: React.PropTypes.string.isRequired,
        age: React.PropTypes.number
    },
    getDefaultProps () {
        return {
            age: 20
        }
    },
    render() {
        return (
            React.DOM.h3(null, 'About' + this.props.name + this.props.age)
        )
    }
})

const TextCounter = React.createClass({
    PropTypes: {
        text: React.PropTypes.string
    },
    getDefaultProps () {
        return {
            text: ''
        }
    },
    getInitialState () {
        return {
            text: this.props.text
        }
    },
    _textChange (ev) {
        this.setState({
            text: ev.target.value
        })
    },
    render () {
        return React.DOM.div(null,
            React.DOM.textarea({
                defaultValue: this.props.text,
                onChange: this._textChange
            }),
            React.DOM.span(null, this.state.text.length)
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
                    <li>
                        <Link to="/text">Text</Link>
                    </li>
                </ul>
                <div>
                    <Route path = "/about" render = { () => {
                        return React.createElement(About, {name: 'asd'})
                    }}/>
                    <Route path = "/index" component={Index}/>
                    <Route path="/text" render = { () => {
                        return React.createElement(TextCounter, {text: 'tom'})
                    }}/>
                </div>
                <Home />
            </div>
        )
    }
}

export default App