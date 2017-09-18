import React, {Component} from 'react'

let Excel = React.createClass({
    displayName: 'Excel',
    propTypes: {
        headers: React.PropTypes.arrayOf(React.PropTypes.string)
    },
    getInitialState () {
        return {
            data: this.props.datas,
            sortBy: null,
            descending: false
        }
    },
    _sort (event) {
        let column = event.target.cellIndex;
        let descending = this.state.sortBy === column && !this.state.descending;
        let sortData = this.state.data.slice();
        sortData.sort( (a, b) => {
            return descending
                ? (a[column] < b[column] ? 1 : -1)
                : (a[column] > b[column] ? 1 : -1);
        });
        this.setState({
            data: sortData,
            sortBy: column,
            descending: descending,
            edit: null
        });
        //console.log(event.target.cellIndex)
    },
    _showEditor(event) {
        this.setState({
            edit: {
                row: parseInt(event.target.dataset.row, 10),
                cell: event.target.cellIndex
            }
        });
        console.log(event.target.dataset)
    },
    _save (e) {
        e.preventDefault();
        let data = this.state.data;
        let input = e.target.firstChild;
        data[this.state.edit.row][this.state.edit.cell] = input.value;
        console.log(e.target.firstChild);
        this.setState({
            edit: null,
            data: data
        })
    },
    render () {
        return (
            React.DOM.table(null,
                React.DOM.thead(null,
                    React.DOM.tr(null,
                        this.props.headers.map( (title, idx) => {
                            if (this.state.sortBy === idx) {
                                title += this.state.descending ? '\u2191' : '\u2193';
                            }
                            return React.DOM.th({key: idx, onClick: this._sort},title)
                        })
                    )
                ),
                React.DOM.tbody({onDoubleClick: this._showEditor},
                    this.state.data.map( (row, rowidx) => {
                        return (
                            React.DOM.tr({key: rowidx},
                                row.map( (cell, cellidx) => {
                                    let content = cell;
                                    let edit = this.state.edit;
                                    if (edit && edit.row === rowidx && edit.cell === cellidx) {
                                        content = React.DOM.form({onSubmit: this._save},
                                            React.DOM.input({
                                                type: 'text',
                                                defaultValue: content
                                            })
                                        )
                                    }
                                    return (
                                        React.DOM.td({
                                            key: cellidx,
                                            'data-row': rowidx
                                        }, content)
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