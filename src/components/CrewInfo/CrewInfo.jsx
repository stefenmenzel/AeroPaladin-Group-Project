import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react'

import { Header, Table, Button } from 'semantic-ui-react'

import './CrewInfo.css'

const moment = require('moment');



class PassengerInfo extends Component {


    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_CREW' })
    }

    addCreww = () => {
        this.props.history.push("/addcrew")
    }

    handleDelete = (event) => {
        console.log('delete', event);

    }

    render() {
        return (
            <div>
                <div className="addPassengerBtn">
                    <Button onClick={this.addCreww}>Add New Crew</Button>
                </div>
                <div>
                    <Table className="table" celled padded>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell singleLine>Name</Table.HeaderCell>
                                <Table.HeaderCell>Birth Date</Table.HeaderCell>
                                <Table.HeaderCell>Sex</Table.HeaderCell>
                                <Table.HeaderCell>Residence Country Code</Table.HeaderCell>
                                <Table.HeaderCell>Citizenship Country Code</Table.HeaderCell>
                                <Table.HeaderCell>Address</Table.HeaderCell>
                                <Table.HeaderCell>Document</Table.HeaderCell>
                                <Table.HeaderCell>Edit</Table.HeaderCell>
                                <Table.HeaderCell>Delete</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        {this.props.crew.map(crew => {
                            return (
                                <Table.Body key={crew.id}>
                                    <Table.Row>
                                        <Table.Cell singleLine>
                                            <Header textAlign='center'>
                                                {crew.firstname} {crew.lastname}
                                            </Header>
                                        </Table.Cell>
                                        <Table.Cell singleLine>
                                            {moment(crew.birthdate).format("MM/DD/YYYY")}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {crew.sex}
                                        </Table.Cell>
                                        <Table.Cell textAlign='right'>
                                            {crew.residencecntry}
                                        </Table.Cell>
                                        <Table.Cell >
                                            {crew.citizenshipcntry}
                                        </Table.Cell>
                                        <Table.Cell singleLine>
                                            {crew.streetaddr}, {crew.city}, {crew.state} {crew.postalcode}, {crew.countrycode}
                                        </Table.Cell>
                                        <Table.Cell singleLine>
                                            Document#: {crew.documentnbr} Expiry Date: {moment(crew.expirydate).format("MM/DD/YYYY")}
                                        </Table.Cell>
                                        <Table.Cell>
                                            <button><Icon name="edit" /></button>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <button onClick={() => this.handleDelete(crew.id)}><Icon name="trash" /></button>
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
        crew: reduxState.crewReducer
    }
}

export default connect(mapStateToProps)(PassengerInfo)
