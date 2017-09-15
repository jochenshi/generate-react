import React from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'
import App from './App'
import Excel from './module/excel/excel'

const headers = ['Book', 'Auther', 'Language', 'Published', 'Sales'];
const data = [
    ['book1', 'authorddddddddd1', 'language1', 'published1', 'sales1'],
    ['book2', 'author2', 'language2', 'published2', 'sales2'],
    ['book3', 'authorddddd3', 'language3', 'published3', 'sales3'],
    ['book4', 'author4', 'language4', 'published4', 'sales4'],
    ['book5', 'author5', 'language5', 'published5', 'sales5'],
    ['book6', 'author6', 'language6', 'published6', 'sales6'],

];

ReactDom.render(
    (
        <div>
            <Excel headers = { headers } datas = { data }/>
            <Router>
                <App/>
            </Router>
        </div>
    ), document.getElementById('root')
)
