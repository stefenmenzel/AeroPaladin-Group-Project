import React,{Component} from 'react';
import {Input, Label} from 'semantic-ui-react';

// import './Aircraft.css';
import '../FormInputs.css';

class Aircraft extends Component{

    render(){
        return(
            <div className="formInputs">
                <Label className="formInputLabel">
                    <Input                                                
                        placeholder="Tail Number"
                    />
                    <span>  
                        Tail Number
                    </span>
                </Label>

                <Label className="formInputLabel">
                    <Input                        
                        placeholder="Aircraft Type"
                    />
                    <span>
                        Aircraft Type
                    </span>
                </Label>

                <Label className="formInputLabel">
                    <Input                        
                        placeholder="Color"
                    />
                    <span>
                        Color
                    </span>
                </Label>

                <Label className="formInputLabel">
                    <Input                        
                        placeholder="Call Sign"
                    />
                    <span>
                        Call Sign
                    </span>
                </Label>

                <Label className="formInputLabel">
                    <Input                        
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