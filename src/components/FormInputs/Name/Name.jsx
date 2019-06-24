import React, {Component} from 'react';

import '../FormInputs.css';

class Aircraft extends Component{

    render(){
        return(
            <div>
                <Label>
                    <Input 
                        placeholder="First Name"
                    />
                    <span>
                        First Name
                    </span>
                </Label>

                <Label>
                    <Input
                        placeholder="Middle Name"
                    />
                    <span>
                        Middle Name
                    </span>
                </Label>

                <Label>
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