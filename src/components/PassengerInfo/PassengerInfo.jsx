import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react'

import { Header, Table, Button} from 'semantic-ui-react'

import './PassengerInfo.css'

const moment = require('moment');



class PassengerInfo extends Component {


    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_PASSENGER' })
    }

    addPassenger = ()=>{
        this.props.history.push("/addpassenger")
    }

    handleDelete = (event) =>{
        console.log('delete', event);
        
    }

    render() {
        return (
            <div>
                <div className="addPassengerBtn">
                    <Button  onClick ={this.addPassenger}>Add New Passenger</Button>
            </div>
            <div>
            <Table className ="table" celled padded>
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

                    {this.props.passenger.map(person =>{
                        return(
                            <Table.Body key={person.id}>
                            <Table.Row>
                                    <Table.Cell singleLine>
                                    <Header  textAlign='center'>
                                        {person.firstname} {person.lastname} 
                                    </Header>
                                </Table.Cell>
                                <Table.Cell singleLine>
                                        {moment(person.birthdate).format("MM/DD/YYYY")}
                                </Table.Cell>
                                <Table.Cell>
                                    {person.sex}
                                </Table.Cell>
                                <Table.Cell textAlign='right'>
                                    {person.residencecntry}
                        </Table.Cell>
                                <Table.Cell >
                                    {person.citizenshipcntry}
                        </Table.Cell>
                                <Table.Cell singleLine>
                                    {person.streetaddr}, {person.city}, {person.state} {person.postalcode}, {person.countrycode}
                        </Table.Cell>
                                    <Table.Cell singleLine>
                                        Document#: {person.documentnbr} Expiry Date: {moment(person.expirydate).format("MM/DD/YYYY")}
                                    </Table.Cell>
                                <Table.Cell>
                                        <button><Icon name="edit" /></button>
                                </Table.Cell>
                                <Table.Cell>
                                    <button onClick={()=> this.handleDelete(person.id)}><Icon name="trash" /></button>
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
        passenger: reduxState.passengerReducer
    }
}

export default connect(mapStateToProps)(PassengerInfo)
