import React, { Component } from 'react';
import { Divider, Button, Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';

import Name from '../FormInputs/Name/Name.jsx';
import Address from '../FormInputs/Address/Address.jsx';
import Contact from '../FormInputs/Contact/Contact.jsx';
import TravelDocuments from '../FormInputs/TravelDocuments/TravelDocuments.jsx';

class PassengerUpdateForm extends Component {
    state = {

    }

 
    componentDidMount(){
        this.props.dispatch({ type: 'FETCH_UPDATE_PASSENGER', payload: this.props.match.params.id })
        // this.props.dispatch({ type: 'FETCH_UPDATE_OPERATOR', payload: this.props.match.params.id })
        // this.props.dispatch({ type: 'FETCH_UPDATE_OWNER', payload: this.props.match.params.id })
    }
    
    componentDidUpdate() {
        if (!Object.keys(this.state.crew).length) {
            if (this.state.crew !== this.props.crew) {
                this.setState({
                    ...this.state,
                    crew: this.props.crew
                })
            }
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();

        console.log('doing a submitto');
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
                <h1>Edit Passenger</h1>
                <form className="addForm" onSubmit={this.handleSubmit}>
                    <h2>Passenger Info</h2>
                    <Name extended={true} handleChange={this.handleChange} stateType="crew" person={this.props.crew} />
                    <Divider />
                    <Address handleChange={this.handleChange} stateType="crew" person={this.props.crew} />
                    <Divider />
                    <Contact handleChange={this.handleChange} stateType="crew" person={this.props.crew} />
                    <Divider />
                    <h2>Travel Document 1</h2>
                    <TravelDocuments handleChange={this.handleChange} stateType="travelDocumentOne" person={this.props.crew} />
                    <h2>Travel Document 2</h2>
                    <TravelDocuments handleChange={this.handleChange} stateType="travelDocumentTwo" person={this.props.crew} />

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

const mapStateToProps = (reduxState) => {
    return {
        reduxState
    }
}

export default connect(mapStateToProps)(PassengerUpdateForm);