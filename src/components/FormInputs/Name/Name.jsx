import React, {Component} from 'react';
import {Input, Label} from 'semantic-ui-react';

import '../FormInputs.css';

class Name extends Component{

    render(){
        return(
            <div className="formInputs">
                <Label className="formInputLabel">
                    <Input className="formInput"
                        onChange={(e) => this.props.handleChange(this.props.stateType + "_firstName", e)}
                        placeholder="First Name"
                    />
                    <span>
                        First Name
                    </span>
                </Label>

                <Label className="formInputLabel"> 
                    <Input className="formInput"
                        onChange={(e) => this.props.handleChange(this.props.stateType + "_middleName", e)}
                        placeholder="Middle Name"
                    />
                    <span>
                        Middle Name
                    </span>
                </Label>

                <Label className="formInputLabel">
                    <Input className="formInput"
                        onChange={(e) => this.props.handleChange(this.props.stateType + "_lastName", e)}
                        placeholder="Last Name"
                    />
                    <span>
                        Last Name
                    </span>
                </Label>
            </div>            
        )
    }
}

export default Name;