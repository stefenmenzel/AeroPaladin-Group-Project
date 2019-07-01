import React, { Component } from 'react';
import { Input, Label } from 'semantic-ui-react';

// import './Aircraft.css';
import '../FormInputs.css';

class Aircraft extends Component {

    state = {
        aircraft: this.props.aircraft,        
    }

    //this function is to display values in the input fields
    //in the event of an edit. The information to be sent out
    //is stored in the parent objects state.
    handleChange = (propertyToChange, newProperty, event) => {
        this.setState({
            ...this.state,
            [propertyToChange]: {
                ...this.state[propertyToChange],
                [newProperty]: event.target.value
            }
        })
        this.props.handleChange(propertyToChange, newProperty, event)
    }

    render() {

        return (

            <div className="formInputs">

                <h2>Aircraft Info</h2>
                <Label className="formInputLabel">
                    <Input className="formInput"
                        onChange={(e) => this.handleChange('aircraft', 'tailNumber', e)}
                        placeholder="Tail Number"
                        defaultValue={(this.props.aircraft) && this.props.aircraft.tailnumber}
                    />
                    <span>
                        Tail Number
                    </span>
                </Label>

                <Label className="formInputLabel">
                    <Input className="formInput"
                        onChange={(e) => this.props.handleChange('aircraft', 'type', e)}
                        placeholder="Aircraft Type"
                        defaultValue={(this.props.aircraft) && this.props.aircraft.typeaircraft}
                    />
                    <span>
                        Aircraft Type
                    </span>
                </Label>

                <Label className="formInputLabel">
                    <Input className="formInput"
                        onChange={(e) => this.props.handleChange('aircraft', 'color', e)}
                        placeholder="Color"
                        defaultValue={(this.props.aircraft) && this.props.aircraft.color}
                    />
                    <span>
                        Color
                    </span>
                </Label>

                <Label className="formInputLabel">
                    <Input className="formInput"
                        onChange={(e) => this.props.handleChange('aircraft', 'callSign', e)}
                        placeholder="Call Sign"
                        defaultValue={(this.props.aircraft) && this.props.aircraft.callsign}
                    />
                    <span>
                        Call Sign
                    </span>
                </Label>

                <Label className="formInputLabel">
                    <Input className="formInput"
                        onChange={(e) => this.props.handleChange('aircraft', 'CBP', e)}
                        placeholder="CBP Decal Number"
                        defaultValue={(this.props.aircraft) && this.props.aircraft.cbpdecalnbr}
                    />
                    <span>
                        CBP Decal Number
                    </span>
                </Label>
            </div>
        )
    }
}

export default Aircraft;