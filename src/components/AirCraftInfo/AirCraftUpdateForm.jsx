import React, { Component } from 'react';
import { Divider, Button, Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';

import Aircraft from '../FormInputs/Aircraft/Aircraft'
import OperatorForm from '../FormInputs/OperatorForm/OperatorForm.jsx';
import OwnerForm from '../FormInputs/OwnerForm/OwnerForm.jsx';

import '../Forms/Forms.css';

class AddAircraftForm extends Component {

    //as all the input are stored in separate components...we'll want
    //to store all the data in the same state with the parent component.
    state = {
        aircraft: {
        }
    }

    componentDidMount(){
        this.props.dispatch({ type: 'FETCH_UPDATE_AIRCRAFT', payload: this.props.match.params.id})
        
    }

    // static getDerivedStateFromProps(props, state) {
    //     console.log('inside get derived', props.aircraft);
    //     console.log('current state inside get derived state:', state);
    //     if(props.aircraft !== state.aircraft){
    //         console.log('does not equal', state);
    //         state.aircraft = props.aircraft;
    //         return state;
    //     }
    //     return null;
    //     // state = {
    //     //     ...state,
    //     //     aircraft: props.aircraft
    //     // }
    //     // return state;
    // }


    //send the aircraft we just added to the database.
    handleSubmit = (event) => {
        // event.preventDefault();
        // console.log('submitting....or trying');
        // this.props.dispatch({ type: 'ADD_AIRCRAFT', payload: this.state });
    }

    //cancel this form filling outing (go back to aircraft summary page)
    handleCancel = () => {
        // console.log('canceling');
        this.props.history.push('/aircraftinfo');
    }

    /**
     * As our state is initially blank we need to fill it out
     * from the inputs as we go. this function will setstate
     * in a way that'll add new keys to the object that the
     * inputs correspond with (aircraft, owner, operator) and
     * set their values to whatever was set in the inputs.
     */
    handleChange = (propertyToChange, newProperty, event) => {
        console.log('now changing: ' + propertyToChange + ' '+ newProperty);
        
        this.setState({
            ...this.state,
            [propertyToChange]: {
                ...this.state[propertyToChange],
                [newProperty]: event.target.value
            }
        })
    }

    render() {
        console.log('this.state:', this.state);
        // console.log('what', this.props.apis.aircraft);
        
        return (
            <div>
                <h1>Add Aircraft</h1>
                <form className="addForm" onSubmit={this.handleSubmit}>
                    <Aircraft aircraft={this.props.aircraft} handleChange={this.handleChange} stateType='aircraft'/>
                    <Divider />
                    <OperatorForm handleChange={this.handleChange} />
                    <Divider />
                    {/* {(this.props.apis.length) && JSON.stringify(this.props.apis[0].tailnumber)} */}
                    {JSON.stringify(this.props.aircraft.tailnumber)}
                    <OwnerForm handleChange={this.handleChange} />
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
                                    Save
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
        aircraft: reduxState.aircraftReducer,        
    }
}

export default connect(mapStateToProps)(AddAircraftForm)

