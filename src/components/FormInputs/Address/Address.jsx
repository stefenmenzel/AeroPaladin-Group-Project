import React, {Component} from 'react'
import {Input, Label} from 'semantic-ui-react';

import '../FormInputs.css';

class Address extends Component{

    conditionalCountryCode = () => {
        return(
            <Label className="formInputLabel">
                <Input 
                    placeholder="Country Code"
                />
                <span>
                    Country Code
                </span>
            </Label>
        )
    }

    render(){
        return(
            <div className="formInputs">
                <Label className="formInputLabel">
                    <Input 
                        placeholder="Street Address"
                    />
                    <span>
                        Street Address
                    </span>
                </Label>

                <Label className="formInputLabel">
                    <Input
                        placeholder="City"
                    />
                    <span>
                        City
                    </span>
                </Label>

                <Label className="formInputLabel">
                    <Input
                        placeholder="State"
                    />
                    <span>
                        State
                    </span>
                </Label>

                <Label className="formInputLabel">
                    <Input
                        placeholder="Postal Code"
                    />
                    <span>
                        Postal Code
                    </span>
                </Label>

                {(this.props.countryCode) && 
                    this.conditionalCountryCode()
                }
            </div>
        )
    }
}

export default Address