import React, { Component } from 'react'
import { connect } from 'react-redux'
import InputForm from './InputForm'
import TableStu from './TableStu'
import Search from './Search'

class FormStudent extends Component {
    render() {
        return (
            <div>
                <InputForm />
                <Search />
                <TableStu />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({})

export default connect(mapStateToProps)(FormStudent)