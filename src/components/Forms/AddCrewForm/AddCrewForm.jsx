import React, {Component} from 'react';
import {Divider, Button, Grid} from 'semantic-ui-react';
import {connect} from 'react-redux';
import Name from '../../FormInputs/Name/Name';
import Address from '../../FormInputs/Address/Address';
import Contact from '../../FormInputs/Contact/Contact';
import TravelDocuments from '../../FormInputs/TravelDocuments/TravelDocuments';


class AddCrewForm extends Component {
    state = {

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
        return (
            <div>
                <h1>Add Crew</h1>
                <form className="addForm" onSubmit={this.handleSubmit}>
                    <h2>Crew Info</h2>
                    <Name extended={true} handleChange={this.handleChange} stateType="crew" />
                    <Divider/>
                    <Address handleChange={this.handleChange} stateType="crew"/>
                    <Divider />
                    <Contact handleChange={this.handleChange} stateType="crew" />
                    <Divider />
                    <h2>Travel Document 1</h2>
                    <TravelDocuments handleChange={this.handleChange} stateType="travelDocumentOne"/>
                    <h2>Travel Document 2</h2>
                    <TravelDocuments handleChange={this.handleChange} stateType="travelDocumentTwo" />
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