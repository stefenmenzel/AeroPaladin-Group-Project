import React,{Component} from 'react';
import {Input, Label} from 'semantic-ui-react';

class Aircraft extends Component{

    state = {
        tailNumber: '',
        aircraftType: '',
        color: '',
        callSign: '',
        decalNumber: ''
    }

    render(){
        return(
            <>
                <Label>
                    <Input                                                
                        placeholder="Tail Number"
                    />
                    <span style={{marginLeft: "10px"}}>  
                        Tail Number
                    </span>
                </Label>

                <Label>
                    <Input                        
                        placeholder="Aircraft Type"
                    />
                    <span style={{ marginLeft: "10px" }}>
                        Aircraft Type
                    </span>
                </Label>

                <Label>
                    <Input                        
                        placeholder="Color"
                    />
                    <span style={{ marginLeft: "10px" }}>
                        Color
                    </span>
                </Label>

                <Label>
                    <Input                        
                        placeholder="Call Sign"
                    />
                    <span style={{ marginLeft: "10px" }}>
                        Call Sign
                    </span>
                </Label>

                <Label>
                    <Input                        
                        placeholder="CBP Decal Number"
                    />
                    <span style={{ marginLeft: "10px" }}>
                        CBP Decal Number
                    </span>
                </Label>
            </>
        )
    }
}

export default Aircraft;