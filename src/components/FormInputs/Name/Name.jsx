import React, {Component} from 'react';
import {Input, Label} from 'semantic-ui-react';

import '../FormInputs.css';

class Name extends Component{

    render(){
        return(
            <div className="formInputs">
                <Label className="formInputLabel">
                    <Input 
                        placeholder="First Name"
                    />
                    <span>
                        First Name
                    </span>
                </Label>

                <Label className="formInputLabel"> 
                    <Input
                        placeholder="Middle Name"
                    />
                    <span>
                        Middle Name
                    </span>
                </Label>

                <Label className="formInputLabel">
                    <Input
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