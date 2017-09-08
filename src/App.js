import React, {Component} from 'react'
import './index.styl'

import Home from './module/home/home'

class App extends Component {
    render() {
        return (
            <div>
                <div className="test">Test page1</div>
                <Home />
            </div>
        )
    }
}

export default App