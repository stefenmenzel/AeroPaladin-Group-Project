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
                        onChange={(e) => this.props.handleChange('aircraft', 'tailNumber', e)}
                        placeholder="Tail Number"
                    />
                    <span>  
                        Tail Number
                    </span>
                </Label>

                <Label className="formInputLabel">
                    <Input className="formInput"
                        onChange={(e) => this.props.handleChange('aircraft', 'type', e)}
                        placeholder="Aircraft Type"
                    />
                    <span>
                        Aircraft Type
                    </span>
                </Label>

                <Label className="formInputLabel">
                    <Input className="formInput"
                        onChange={(e) => this.props.handleChange('aircraft', 'color', e)}
                        placeholder="Color"
                    />
                    <span>
                        Color
                    </span>
                </Label>

                <Label className="formInputLabel">
                    <Input className="formInput"
                        onChange={(e) => this.props.handleChange('aircraft', 'callSign', e)}
                        placeholder="Call Sign"
                    />
                    <span>
                        Call Sign
                    </span>
                </Label>

                <Label className="formInputLabel">
                    <Input className="formInput"
                        onChange={(e) => this.props.handleChange('aircraft', 'CBP', e)}
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