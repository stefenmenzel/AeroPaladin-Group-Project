import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Input, Label, Select, Checkbox} from 'semantic-ui-react';
import {Divider, Button, Grid} from 'semantic-ui-react';
import {DateInput} from 'semantic-ui-calendar-react';
import '../FormInputs.css';

class FlightSegment extends Component {

    state = {
        date: '',
        airport: '',
        estimatedTime: '',
        timeZone: ''
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log("doing a submit", this.state);
        this.props.dispatch({ type: 'SET_APIS_FLIGHTSEGMENTONE', payload: this.state})
        this.props.nextStep();
    }

    handlePrevious = (event) => {
        event.preventDefault();
        this.props.previousStep();
    }

    // handles on inputs on form and sets state
  handleChange = property => event => {
    this.setState({
      ...this.state,
      [property]: event.target.value
    });
  };

    onDateChange = (event, {name, value}) => {
        //nothing to see here. move along
        this.setState({
            ...this.state,
            date:value
        })
    }

    render () {
        return (
            <div className="formInputs">
                 <form className="addForm" onSubmit={this.handleSubmit}>
                <h2>Flight Segment One</h2>
                <p>Departure</p>
            <Label className="formInputLabel">            
                <Input className="formInput"
                    onChange={this.handleChange("airport")}
                    placeholder="Airport"
                />
                <span>
                   Airport
                </span>
            </Label>

            <Label className="formInputLabel">
                <Input className="formInput"
                    onChange={this.handleChange("estimatedTime")}
                    placeholder="Estimated Time of Departure"
                />
                <span>
                    Estimated Time
                </span>
            </Label>
            <Label className="formInputLabel">
                <Input className="formInput"
                    onChange={this.handleChange("timeZone")}
                    placeholder="Time Zone"
                />
                <span>
                    Time Zone
                </span>
            </Label>
            <Label className="formInputLabel">
                    <DateInput className="formAltInput"
                        name="departureDate"
                        value={this.state.date}
                        placeholder = "Estimated Departure Date"
                        iconPosition="left"                        
                        onChange={this.onDateChange}
                        style={{width:'100%'}}
                        dateFormat="YYYY-MM-DD"
                    />
                    <span>
                        Estimated Departure Date
                    </span>
                </Label>
            <Divider />
            <p>Arrival</p>
            <Label className="formInputLabel">            
                <Input className="formInput"
                    onChange={this.handleChange("airport")}
                    placeholder="Airport"
                />
                <span>
                   Airport
                </span>
            </Label>

            <Label className="formInputLabel">
                <Input className="formInput"
                    onChange={this.handleChange("estimatedTime")}
                    placeholder="Estimated Time of Departure"
                />
                <span>
                    Estimated Time
                </span>
            </Label>
            <Label className="formInputLabel">
                <Input className="formInput"
                    onChange={this.handleChange("timeZone")}
                    placeholder="Time Zone"
                />
                <span>
                    Time Zone
                </span>
            </Label>

            <Label className="formInputLabel">
                    <DateInput className="formAltInput"
                        name="departureDate"
                        value={this.state.date}
                        placeholder = "Estimated Departure Date"
                        iconPosition="left"                        
                        onChange={this.onDateChange}
                        style={{width:'100%'}}
                        dateFormat="YYYY-MM-DD"
                    />
                    <span>
                        Estimated Departure Date
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

export default connect ()(FlightSegment);
