import React, {Component} from 'react'

let Excel = React.createClass({
    displayName: 'Excel',
    propTypes: {
        headers: React.PropTypes.arrayOf(React.PropTypes.string)
    },
    getInitialState () {
        return {
            data: this.props.datas
        }
    },
    _sort (event) {
        console.log(event.target.cellIndex)
    },
    render () {
        return (
            React.DOM.table(null,
                React.DOM.thead(null,
                    React.DOM.tr(null,
                        this.props.headers.map( (title, idx) => {
                            return React.DOM.th({key: idx, onClick: this._sort},title)
                        })
                    )
                ),
                React.DOM.tbody(null,
                    this.state.data.map( (row, idx) => {
                        return (
                            React.DOM.tr({key: idx},
                                row.map( (cell, idx) => {
                                    return (
                                        React.DOM.td({key: idx}, cell)
                                    )
                                })
                            )
                        )
                    })
                )
            )
        )
    }
});

export default Excel