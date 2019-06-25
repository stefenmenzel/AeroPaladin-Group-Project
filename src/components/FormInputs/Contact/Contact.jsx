import React, {Component} from 'react';
import {Input, Label} from 'semantic-ui-react';

import '../FormInputs.css';

class Contact extends Component{

    render(){
        return(
            <div className="formInputs">
                <Label className="formInputLabel">
                    <Input className="formInput"
                        onChange={(e) => this.props.handleChange(this.props.stateType, "email", e)}
                        placeholder="Email"
                    />
                    <span>
                        Email
                    </span>
                </Label>

                <Label className="formInputLabel">
                    <Input className="formInput"
                        onChange={(e) => this.props.handleChange(this.props.stateType, "phoneNumber", e)}
                        placeholder="Phone Number"
                    />
                    <span>
                        Phone Number
                    </span>
                </Label>
            </div>
        )
    }
}

export default Contact