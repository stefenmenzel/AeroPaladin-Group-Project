import React, {Component} from 'react';
import {Input, Label} from 'semantic-ui-react';

import '../FormInputs.css';

class Contact extends Component{

    render(){
        return(
            <div className="formInputs">
                <Label className="formInputLabel">
                    <Input 
                        placeholder="Email"
                    />
                    <span>
                        Email
                    </span>
                </Label>

                <Label className="formInputLabel">
                    <Input
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