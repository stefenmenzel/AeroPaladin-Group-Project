import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, Label, Select, Checkbox } from 'semantic-ui-react';
import { Divider, Button, Grid } from 'semantic-ui-react';
import { DateInput, TimeInput } from 'semantic-ui-calendar-react';
import '../FormInputs.css';

class FlightSegment extends Component {

    state = {
        departure : {
         
        },
        arrival : {

        },
        arrivalairport: '',
        departureairport: '',
        arrivaldate: '',
        departuredate: '',
        arrivaltime: '',
        departuretime: '',        
    }

    segmentOneOrTwo = () => {
        return ((this.props.stateType === 'flightSegmentOne') ? 'SET_APIS_FLIGHT_SEGMENT_ONE' : 'SET_APIS_FLIGHT_SEGMENT_TWO')
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log("doing a submit", this.state);
        let objToSend = {
            departure: this.state.departure,
            arrival: this.state.arrival,
        }
        this.props.dispatch({ type: this.segmentOneOrTwo(), payload: objToSend})

        this.setState({
            departure: {},
            arrival: {},
            arrivalairport: '',
            departureairport: '',
            arrivaldate: '',
            departuredate: '',
            arrivaltime: '',
            departuretime: '',
        })
        this.props.nextStep();
    }

    handlePrevious = (event) => {
        event.preventDefault();
        this.props.previousStep();
    }

    onTimeChange = (event, { name, value }, segmentType) => {
        console.log('date change', value);
        console.log('date change:', name);
        //nothing to see here. move along
        this.setState({
            ...this.state,
            [segmentType+name]: value,
            [segmentType]: {
                ...this.state[segmentType],
                [name]: value
            }            
        })        
    }

    handleChange = (propertyToChange, newProperty, event) => {
        console.log('now changing: ' + propertyToChange + ' ' + newProperty);

        this.setState({
            ...this.state,
            [propertyToChange+newProperty]: event.target.value,
            [propertyToChange]: {
                ...this.state[propertyToChange],
                [newProperty]: event.target.value
            }
        })
    }
    

    render() {
        console.log('flight segment state:', this.state);
        return (
            <div className="formInputs">
                <form className="addForm" onSubmit={this.handleSubmit}>
                    <h2>Flight Segment</h2>
                    <h3>Departure</h3>
                    <Label className="formInputLabel">
                        <Input className="formInput"
                            onChange={(e) => this.handleChange('departure', "airport", e)}
                            placeholder="Airport"
                            value={this.state.departureairport}
                        />
                        <span>
                            Airport
                       </span>
                    </Label>
                    <Label className="formInputLabel">
                        <TimeInput className="formAltInput"
                            name="time"
                            value={this.state.departuretime}
                            iconPosition="left"
                            onChange={(event, { name, value }) => this.onTimeChange(event, {name, value}, 'departure')}
                            placeholder="Estimated Time of Departure"
                            style={{ width: '100%' }}
                        />
                        <span>
                            Estimated Time
                        </span>
                    </Label>
                    {/* <Label className="formInputLabel">
                    <Input className="formInput"
                            onChange={this.handleDepartureChange("time_zone")}
                            placeholder="Time Zone"
                        />
                        <span>
                            Time Zone
                        </span>
                    </Label> */}
                    <Label className="formInputLabel">
                        <DateInput className="formAltInput"
                            name="date"
                            value={this.state.departuredate}
                            placeholder="Estimated Departure Date"
                            iconPosition="left"
                            onChange={(event, { name, value }) => this.onTimeChange(event, { name, value }, 'departure')}
                            style={{ width: '100%' }}
                            dateFormat="YYYY-MM-DD"
                        />
                        <span>
                            Estimated Departure Date
                        </span>
                    </Label>

                    <Divider />

                    <h3>Arrival</h3>
                    <Label className="formInputLabel">
                        <Input className="formInput"
                            onChange={(e) => this.handleChange('arrival', "airport", e)}
                            placeholder="Airport"
                            value={this.state.arrivalairport}
                        />
                        <span>
                            Airport
                        </span>
                    </Label>
                    <Label className="formInputLabel">
                    <TimeInput className="formAltInput"
                            name="time"
                            value={this.state.arrivaltime}
                            iconPosition="left"
                            onChange={(event, { name, value }) => this.onTimeChange(event, { name, value }, 'arrival')}
                            placeholder="Estimated Time of Departure"
                            style={{ width: '100%' }}
                        />
                        <span>
                            Estimated Time
                        </span>
                    </Label>
                    {/* <Label className="formInputLabel">
                        <Input className="formInput"
                            onChange={this.handleArrivalChange("time_zone")}
                            placeholder="Time Zone"
                        />
                        <span>
                            Time Zone
                        </span>
                    </Label> */}
                    <Label className="formInputLabel">
                        <DateInput className="formAltInput"
                            name="date"
                            value={this.state.arrivaldate}
                            placeholder="Estimated Arrival Date"
                            iconPosition="left"
                            onChange={(event, { name, value }) => this.onTimeChange(event, { name, value }, 'arrival')}
                            style={{ width: '100%' }}
                            dateFormat="YYYY-MM-DD"
                        />
                        <span>
                            Estimated Arrival Date
                        </span>
                    </Label>

                    <div className="formButtons">
                        <Grid columns='equal'>
                            <Grid.Column width={10}></Grid.Column>
                            <Grid.Column width={3}>
                                <Button
                                    type="button"
                                    onClick={this.handlePrevious}
                                    secondary
                                    className="formButton"
                                >
                                    Back
                                </Button>
                            </Grid.Column>

                            <Grid.Column width={3}>
                                <Button
                                    type="submit"
                                    primary
                                    className="formButton"
                                >
                                    NEXT
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

export default connect(mapStateToProps)(FlightSegment);
