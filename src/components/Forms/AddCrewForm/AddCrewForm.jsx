import React, {Component} from 'react';
import {Divider, Button, Grid} from 'semantic-ui-react';
import {connect} from 'react-redux';
import Name from '../../FormInputs/Name/Name';
import Address from '../../FormInputs/Address/Address';
import Contact from '../../FormInputs/Contact/Contact';
import EmergencyContact from '../../FormInputs/EmergencyContact/EmergencyContact.jsx';
import TravelDocuments from '../../FormInputs/TravelDocuments/TravelDocuments';


class AddCrewForm extends Component {
    state = {
        
    }

    fillDummyForm = () => {
        this.setState({
            crew: {
                birthDate: "1987-02-19",
                citizenShipCountry: "USA",
                city: "Minneapolis",
                email: "arealemail@gmail.com",
                firstName: "Stefen",
                lastName: "Menzel",
                phoneNumber: "1234567890",
                postalCode: "55345",
                residenceCountry: "USA",
                sex: "m",
                state: "MN",
                streetAddress: "123 Fake St.",
            },
            travelDocumentOne: {
                documentNumber: "089723146",
                documentType: "P",
                expiryDate: "2021-09-23",
                residenceCountry: "USA",
            },
            travelDocumentTwo: {
                documentNumber: "0980987346",
                documentType: "L",
                expiryDate: "2025-11-26",
                residenceCountry: "USA",
            }
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log('handleSubmit dispatch add crew', this.state)
        this.props.dispatch({type: 'ADD_CREW', payload: this.state})
        
    }

    handleCancel = () => {
        this.props.history.push('/crewinfo');
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

    render() {
        console.log("add crew state:", this.state);
        return (
            <div>
                <h1 className="ui header center aligned grid">Add Crew</h1>
                <button type="button" style={{ float: 'left', opacity: '0', height: '50px', width: '150px' }} onClick={this.fillDummyForm}></button>
                <form className="addForm" onSubmit={this.handleSubmit}>
                    <h2 className="travelDocHead">Crew Info</h2>
                    <Name extended={true} handleChange={this.handleChange} stateType="crew" person={this.state.crew} />
                    <Divider/>
                    <Address handleChange={this.handleChange} stateType="crew" person={this.state.crew}/>
                    <Divider />
                    <h2 className="travelDocHead">Contact Information</h2>
                    <Contact handleChange={this.handleChange} stateType="crew" person={this.state.crew}/>
                    <Divider />
                    <EmergencyContact handleChange={this.handleChange} stateType="emergencyContact" person={this.state.EmergencyContact} />
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
                                    Add Crew
                                </Button>
                            </Grid.Column>
                        </Grid>
                    </div>
                </form>
            </div>
        )   
    }
}



export default connect()(AddCrewForm);