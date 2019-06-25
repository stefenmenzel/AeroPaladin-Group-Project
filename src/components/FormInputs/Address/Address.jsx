import React, {Component} from 'react'
import {Input, Label} from 'semantic-ui-react';

import '../FormInputs.css';

class Address extends Component{

    conditionalCountryCode = () => {
        return(
            <Label className="formInputLabel">
                <Input className="formInput"
                    onChange={(e) => this.props.handleChange(this.props.stateType + "_countryCode", e)}
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
                    <Input className="formInput"
                        onChange={(e) => this.props.handleChange(this.props.stateType + "_streetAddress", e)}
                        placeholder="Street Address"
                    />
                    <span>
                        Street Address
                    </span>
                </Label>

                <Label className="formInputLabel">
                    <Input className="formInput"
                        onChange={(e) => this.props.handleChange(this.props.stateType + "_city", e)}
                        placeholder="City"
                    />
                    <span>
                        City
                    </span>
                </Label>

                <Label className="formInputLabel">
                    <Input className="formInput"
                        onChange={(e) => this.props.handleChange(this.props.stateType + "_state", e)}
                        placeholder="State"
                    />
                    <span>
                        State
                    </span>
                </Label>

                <Label className="formInputLabel">
                    <Input className="formInput"
                        onChange={(e) => this.props.handleChange(this.props.stateType + "_postalCode", e)}
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