import React, {Component} from 'react'

let Excel = React.createClass({
    displayName: 'Excel',
    _preSearchData: null,
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
            edit: null,
            search: false
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
    _toogleSearch () {
        if (this.state.search) {
            this.setState({
                data: this._preSearchData,
                search: false
            });
            this._preSearchData = null;
        } else {
            this._preSearchData = this.state.data;
            this.setState({
                search: true
            })
        }
    },
    _search (e) {
        let needle = e.target.value.toLowerCase();
        if (!needle) {
            this.setState({
                data: this._preSearchData
            });
            return
        }
        let idx = e.target.dataset.idx;
        let searchData = this._preSearchData.filter( (row) => {
            return row[idx].toString().toLowerCase().indexOf(needle) > -1;
        });
        this.setState({
            data: searchData
        })
    },
    _download (format, ev) {
        let contents = format === 'json' ? JSON.stringify(this.state.data) :
            this.state.data.reduce( (result, row) => {
                return result + row.reduce( (rowresult, cell, idx) => {
                    return rowresult + '"' + cell.replace(/"/g, '""') + '"' + (idx < row.length -1 ? ',' : '');
                }, '') + '\n';
            }, '');
        let URL = window.URL || window.webkitURL;
        let blob = new Blob([contents], {type: 'text/' + format});
        ev.target.href = URL.createObjectURL(blob);
        ev.target.download = 'data.' + format;
    },
    _renderSearch () {
        if (!this.state.search) {
            return null
        }
        return (
            React.DOM.tr(
                {onChange: this._search},
                this.props.headers.map( (_ignore, idx) => {
                    return React.DOM.td({key: idx},
                        React.DOM.input({type: 'text', 'data-idx': idx})
                    )
                })
            )
        )
    },
    _renderToolbar () {
        return (
            React.DOM.div({className: 'toolbar'},
                React.DOM.button(
                    {
                        onClick: this._toogleSearch
                    },
                    'Search'
                ),
                React.DOM.a(
                    {
                        onClick: this._download.bind(this, 'json'),
                        href: 'data.json'
                    },
                    'Export JSON'
                ),
                React.DOM.a(
                    {
                        onClick: this._download.bind(this, 'csv'),
                        href: 'data.csv'
                    },
                    'Export CSV'
                )
            )
            /*React.DOM.button(
                {
                    onClick: this._toogleSearch,
                    className: 'toolbar'
                },
                'search'
            )*/
        )
    },
    _renderTable () {
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
                    this._renderSearch(),
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
    },
    render () {
        return (
            React.DOM.div(
                null,
                this._renderToolbar(),
                this._renderTable()
            )
        )
    }
});

export default Excel