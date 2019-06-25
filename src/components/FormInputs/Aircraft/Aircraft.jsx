import React,{Component} from 'react';
import {Input, Label} from 'semantic-ui-react';

// import './Aircraft.css';
import '../FormInputs.css';

class Aircraft extends Component{

    render(){
        return(
            <div className="formInputs">
                <h2>Aircraft Info</h2>
                <Label className="formInputLabel">
                    <Input className="formInput"
                        onChange={(e) => this.props.handleChange('aircraft_tailNumber', e)}
                        placeholder="Tail Number"
                    />
                    <span>  
                        Tail Number
                    </span>
                </Label>

                <Label className="formInputLabel">
                    <Input className="formInput"
                        onChange={(e) => this.props.handleChange('aircraft_type', e)}
                        placeholder="Aircraft Type"
                    />
                    <span>
                        Aircraft Type
                    </span>
                </Label>

                <Label className="formInputLabel">
                    <Input className="formInput"
                        onChange={(e) => this.props.handleChange('aircraft_color', e)}
                        placeholder="Color"
                    />
                    <span>
                        Color
                    </span>
                </Label>

                <Label className="formInputLabel">
                    <Input className="formInput"
                        onChange={(e) => this.props.handleChange('aircraft_callSign', e)}
                        placeholder="Call Sign"
                    />
                    <span>
                        Call Sign
                    </span>
                </Label>

                <Label className="formInputLabel">
                    <Input className="formInput"
                        onChange={(e) => this.props.handleChange('aircraft_CBP', e)}
                        placeholder="CBP Decal Number"
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