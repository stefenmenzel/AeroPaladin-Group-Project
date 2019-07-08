import React, { Component } from 'react';
import { Divider, Button, Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';

import Name from '../FormInputs/Name/Name.jsx';
import Address from '../FormInputs/Address/Address.jsx';
import Contact from '../FormInputs/Contact/Contact.jsx';
import TravelDocuments from '../FormInputs/TravelDocuments/TravelDocuments.jsx';

class PassengerUpdateForm extends Component {
    state = {
        passenger: {},
        travelDocumentOne: this.props.travelDocumentOne,
        travelDocumentTwo: this.props.travelDocumentTwo,
    }

 
    componentDidMount(){
        this.props.dispatch({ type: 'FETCH_UPDATE_PASSENGER', payload: this.props.match.params.id })
        this.props.dispatch({ type: 'FETCH_UPDATE_PASSENGER_DOCUMENT_ONE', payload: this.props.match.params.id })
        this.props.dispatch({ type: 'FETCH_UPDATE_PASSENGER_DOCUMENT_TWO', payload: this.props.match.params.id }) 
    }
    
    componentDidUpdate() {
        if (!Object.keys(this.state.passenger).length || Array.isArray(this.state.passenger)) {
            if (this.state.passenger !== this.props.passenger[0]) {
                this.setState({
                    ...this.state,
                    passenger: this.props.passenger[0]
                })
            }
        }

        if (!Object.keys(this.state.travelDocumentOne).length) {
            if (this.state.travelDocumentOne !== this.props.travelDocumentOne) {
                this.setState({
                    ...this.state,
                    travelDocumentOne: this.props.travelDocumentOne
                })
            }
        }
        if (!Object.keys(this.state.travelDocumentTwo).length) {
            if (this.state.travelDocumentTwo !== this.props.travelDocumentTwo) {
                this.setState({
                    ...this.state,
                    travelDocumentTwo: this.props.travelDocumentTwo
                })
            }
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log('doing a submitto');
        this.props.dispatch({type: 'UPDATE_PASSENGER', payload:this.state});
        this.props.history.push('/passengerinfo');
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

    render() {
        console.log('this.state passenger update', this.state);
        console.log('this.props.passenger in passenger update:', this.props.passenger);
        console.log("redux state in passenger update:", this.props.reduxState);
        return (
            <div>
                <h1>Edit Passenger</h1>
                <form className="addForm" onSubmit={this.handleSubmit}>
                    <h2>Passenger Info</h2>
                    <Name extended={true} handleChange={this.handleChange} stateType="passenger" person={this.props.passenger[0]} />
                    <Divider />
                    <Address handleChange={this.handleChange} stateType="passenger" person={this.props.passenger[0]} />
                    <Divider />
                    <Contact handleChange={this.handleChange} stateType="passenger" person={this.props.passenger[0]} />
                    <Divider />
                    <h2>Travel Document 1</h2>
                    <TravelDocuments handleChange={this.handleChange} stateType="travelDocumentOne" travelDocument={this.props.travelDocumentOne} />
                    <h2>Travel Document 2</h2>
                    <TravelDocuments handleChange={this.handleChange} stateType="travelDocumentTwo" travelDocument={this.props.travelDocumentTwo} />

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
                                    Edit Passenger
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
        reduxState: reduxState,
        passenger: reduxState.passengerReducer,
        travelDocumentOne: reduxState.documentOneReducer,
        travelDocumentTwo: reduxState.documentTwoReducer,
    }
}

export default connect(mapStateToProps)(PassengerUpdateForm);