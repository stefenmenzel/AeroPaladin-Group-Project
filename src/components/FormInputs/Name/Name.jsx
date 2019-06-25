import React, {Component} from 'react';
import {Input, Label} from 'semantic-ui-react';

import '../FormInputs.css';

/**
 * This component will throw a few input fields on the DOM.
 * 
 * This component is useless without a form.
 * 
 * You must send props into this component in order for it to 
 * work properly.
 * 
 * You must send in a "handleChange" function,
 * and a "stateType" prop. The handleChange function
 * will send the value of the input field back to the parent component form
 * and the state type will correspond to an object to create/add values to
 * in the parent components state (aircraft owner operator)
 */
class Name extends Component{

    render(){
        return(
            <div className="formInputs">
                <Label className="formInputLabel">            
                    <Input className="formInput"
                        onChange={(e) => this.props.handleChange(this.props.stateType, "firstName", e)}
                        placeholder="First Name"
                    />
                    <span>
                        First Name
                    </span>
                </Label>

                <Label className="formInputLabel"> 
                    <Input className="formInput"
                        onChange={(e) => this.props.handleChange(this.props.stateType, "middleName", e)}
                        placeholder="Middle Name"
                    />
                    <span>
                        Middle Name
                    </span>
                </Label>

                <Label className="formInputLabel">
                    <Input className="formInput"
                        onChange={(e) => this.props.handleChange(this.props.stateType, "lastName", e)}
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