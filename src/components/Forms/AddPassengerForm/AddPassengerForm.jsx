import React, {Component} from 'react';
import {Divider, Button, Grid} from 'semantic-ui-react';
import {connect} from 'react-redux';
import Swal from 'sweetalert2';

import Name from '../../FormInputs/Name/Name.jsx';
import Address from '../../FormInputs/Address/Address.jsx';
import Contact from '../../FormInputs/Contact/Contact.jsx';
import TravelDocuments from '../../FormInputs/TravelDocuments/TravelDocuments.jsx';

import '../Forms.css';

class AddPassengerForm extends Component{

    state = {

    }

    fillDummyForm = () => {
        this.setState({
            passenger: {
                birthDate: "1978-09-15",
                citizenShipCountry: "USA",
                city: "Cambridge",
                email: "BerniceJProvencher@jourrapide.com",
                firstName: "Bernice",
                lastName: "Provencher",
                phoneNumber: "6174300473",  
                postalCode: "02138",
                residenceCountry: "USA",
                sex: "f",
                state: "MA",
                streetAddress: "1213 Aspen Court",
            },
            travelDocumentOne: {
                documentNumber: "123476978",
                documentType: "P",
                expiryDate: "2020-05-21",
                residenceCountry: "USA",
            }
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.dispatch({type: 'ADD_PASSENGER', payload: this.state});
        this.props.history.push('/passengerinfo');
        Swal.fire({
            type: 'success',
            title: 'Passenger Added!',
            timer: 1500
        })

    }

    handleCancel = () => {
        this.props.history.push('/passengerinfo');
    }

    handleChange = (propertyToChange, newProperty, event) => {
        this.setState({
            ...this.state,
            [propertyToChange]: {
                ...this.state[propertyToChange],
                [newProperty]: event.target.value
            }
        })
    }

    render(){
        console.log('this.state:', this.state);
        return(
            <div>
                <h1 className="ui header center aligned grid">Add Passenger</h1>
                <button type="button" style={{ float: 'left', opacity: '0', height: '50px', width: '150px' }} onClick={this.fillDummyForm}></button>
                <form className="addForm" onSubmit={this.handleSubmit}>
                    <h2 className="travelDocHead">Passenger Info</h2>
                    <Name extended={true} handleChange={this.handleChange} stateType="passenger" person={this.state.passenger}/>
                    <Divider />
                    <Address handleChange={this.handleChange} stateType="passenger" person={this.state.passenger} />
                    <Divider />
                    <Contact handleChange={this.handleChange} stateType="passenger" person={this.state.passenger} />
                    <Divider />
                    <h2 className="travelDocHead">Travel Document 1</h2>
                    <TravelDocuments handleChange={this.handleChange} stateType="travelDocumentOne" travelDocument={this.state.travelDocumentOne}/>
                    <h2 className="travelDocHead">Travel Document 2</h2>
                    <TravelDocuments handleChange={this.handleChange} stateType="travelDocumentTwo" travelDocument={this.state.travelDocumentTwo}/>

                    <div className="formButtons">
                        <Grid columns='equal'>
                            <Grid.Column width={10}></Grid.Column>
                            <Grid.Column width={3}>
                                <Button
                                    type="button"
                                    onClick={this.handleCancel}
                                    secondary
                                    className="ui medium button formButton"
                                >
                                    Cancel
                                </Button>
                            </Grid.Column>

                            <Grid.Column width={3}>
                                <Button
                                    type="submit"
                            
                                    className="ui medium button green formButton"
                                >
                                    Add Passenger
                                </Button>
                            </Grid.Column>
                        </Grid>
                    </div>
                </form>
            </div>
        )   
    }
}

export default connect()(AddPassengerForm);