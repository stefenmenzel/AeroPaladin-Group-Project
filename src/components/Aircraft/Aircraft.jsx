import React,{Component} from 'react';
import {Input} from 'semantic-ui-react';

class Aircraft extends Component{

    render(){
        return(
            <>
                <Input
                    icon="tags"
                    iconPosition='left'
                    label={{tag: true, content: 'tail number'}}
                    labelPosition="right"
                    placeholder="Tail Number"
                />             
            </>
        )
    }
}

export default Aircraft;