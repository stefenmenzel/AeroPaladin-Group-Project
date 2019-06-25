import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Header, Table, Rating, Button} from 'semantic-ui-react'

import './PassengerInfo.css'




class PassengerInfo extends Component {


    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_PASSENGER' })
    }

    addPassenger = ()=>{
        console.log('YOOOO');
        this.props.history.push("/addpassenger")
    }
    render() {
        return (
            <div>
            <div>
                    <Button onClick ={this.addPassenger}>Add New Passenger</Button>
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
                        <Table.HeaderCell>Edit</Table.HeaderCell>
                        <Table.HeaderCell>Delete</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                    {this.props.passenger.map(person =>{
                        return(
                            <Table.Body key={person.id}>
                            <Table.Row>
                                <Table.Cell>
                                    <Header  textAlign='center'>
                                        {person.firstname} {person.lastname} 
                                    </Header>
                                </Table.Cell>
                                <Table.Cell singleLine>
                                    {person.birthdate}
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
                                <Table.Cell>
                                    <button>Edit</button>
                                </Table.Cell>
                                <Table.Cell>
                                    <button>Delete</button>
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
