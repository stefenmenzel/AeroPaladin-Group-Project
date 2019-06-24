import React,{Component} from 'react';
import {Input, Label} from 'semantic-ui-react';

import './Aircraft.css';

class Aircraft extends Component{

    render(){
        return(
            <div className="aircraftInputs">
                <Label className="aircraftLabel">
                    <Input                                                
                        placeholder="Tail Number"
                    />
                    <span>  
                        Tail Number
                    </span>
                </Label>

                <Label className="aircraftLabel">
                    <Input                        
                        placeholder="Aircraft Type"
                    />
                    <span>
                        Aircraft Type
                    </span>
                </Label>

                <Label className="aircraftLabel">
                    <Input                        
                        placeholder="Color"
                    />
                    <span>
                        Color
                    </span>
                </Label>

                <Label className="aircraftLabel">
                    <Input                        
                        placeholder="Call Sign"
                    />
                    <span>
                        Call Sign
                    </span>
                </Label>

                <Label className="aircraftLabel">
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