import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react'

import { Header, Table, Button } from 'semantic-ui-react'

import './AircraftInfo.css'

const moment = require('moment');



class AircraftInfo extends Component {


    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_AIRCRAFT' })
    }

    addCreww = () => {
        this.props.history.push("/addaircraft")
    }

    handleDelete = (id) => {
        console.log('delete', id);
        this.props.dispatch({type: 'DELETE_AIRCRAFT', payload: id })

    }

    render() {
        return (
            <div>
                <div className="addPassengerBtn">
                    <Button onClick={this.addCreww}>Add New Aircraft</Button>
                </div>
                <div>
                    <Table className="table" celled padded>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell singleLine>Tail Number</Table.HeaderCell>
                                <Table.HeaderCell singleLine>Aircraft Type</Table.HeaderCell>
                                <Table.HeaderCell>Operator</Table.HeaderCell>
                                <Table.HeaderCell>Owner</Table.HeaderCell>
                                <Table.HeaderCell singleLine>CBP Decal Number</Table.HeaderCell>
                                <Table.HeaderCell>Edit</Table.HeaderCell>
                                <Table.HeaderCell>Delete</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        {this.props.aircraft.map(plane => {
                            return (
                                <Table.Body key={plane.id}>
                                    <Table.Row>
                                        <Table.Cell singleLine>
                                            <Header textAlign='center'>
                                                {plane.tailnumber}
                                            </Header>
                                        </Table.Cell>
                                        <Table.Cell singleLine>
                                            {plane.typeaircraft}
                                        </Table.Cell>
                                        <Table.Cell singleLine>
                                            {plane.operator_firstname} {plane.operator_lastname} 

                                        </Table.Cell>
                                        <Table.Cell singleLine textAlign='right'>
                                            {plane.owner_firstname} {plane.owner_lastname} 

                                        </Table.Cell>
                                        <Table.Cell singleLine textAlign='right'>
                                            {plane.cbpdecalnbr} 

                                        </Table.Cell>
                                        
                                        <Table.Cell>
                                            <button><Icon name="edit" /></button>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <button onClick={() => this.handleDelete(plane.id)}><Icon name="trash" /></button>
                                        </Table.Cell>
                                    </Table.Row>
                                </Table.Body>

                            )
                        })}

                    </Table>
                </div>
            </div>
        )
    }
}



const mapStateToProps = (reduxState) => {
    return {
        aircraft: reduxState.aircraftReducer
    }
}

export default connect(mapStateToProps)(AircraftInfo)
