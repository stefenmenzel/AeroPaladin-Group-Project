import React, {Component} from 'react';
import {Divider, Button, Grid} from 'semantic-ui-react';
import {connect} from 'react-redux';

import Name from '../../FormInputs/Name/Name.jsx';
import Address from '../../FormInputs/Address/Address.jsx';
import Contact from '../../FormInputs/Contact/Contact.jsx';
import TravelDocuments from '../../FormInputs/TravelDocuments/TravelDocuments.jsx';

import '../Forms.css';

class AddPassengerForm extends Component{

    state = {

    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.dispatch({type: 'ADD_PASSENGER', payload: this.state});
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
                <h1>Add Passenger</h1>
                <form className="addForm" onSubmit={this.handleSubmit}>
                    <h2>Passenger Info</h2>
                    <Name extended={true} handleChange={this.handleChange} stateType="passenger" />
                    <Divider />
                    <Address handleChange={this.handleChange} stateType="passenger" />
                    <Divider />
                    <Contact handleChange={this.handleChange} stateType="passenger" />
                    <Divider />
                    <h2>Travel Document 1</h2>
                    <TravelDocuments handleChange={this.handleChange} stateType="travelDocumentOne"/>
                    <h2>Travel Document 2</h2>
                    <TravelDocuments handleChange={this.handleChange} stateType="travelDocumentTwo"/>

                    <div className="formButtons">
                        <Grid columns='equal'>
                            <Grid.Column width={10}></Grid.Column>
                            <Grid.Column width={3}>
                                <Button
                                    type="button"
                                    onClick={this.handleCancel}
                                    secondary
                                    className="formButton"
                                >
                                    Cancel
                                </Button>
                            </Grid.Column>

                            <Grid.Column width={3}>
                                <Button
                                    type="submit"
                                    primary
                                    className="formButton"
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