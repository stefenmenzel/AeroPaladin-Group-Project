import React, { Component } from 'react';
import { Divider } from 'semantic-ui-react';

import Name from '../Name/Name.jsx';
import Address from '../Address/Address.jsx';
import Contact from '../Contact/Contact.jsx';

/**
 * This component combines some lower level components in order
 * to create a set of inputs.
 * 
 * This component will require sending in some props:
 * handleChange is a function that will update values
 * on the parent component's state
 * stateType is a string that will tell the parent component
 * what to call the object in the parent component's state
 * that the information is being added to.
 */
class OperatorForm extends Component {

    render() {
        return (
            <div>
                <h2>Operator</h2>
                <Name 
                    handleChange={this.props.handleChange}
                    stateType='operator'
                />
                <Divider />
                <Address 
                    handleChange={this.props.handleChange}
                    stateType='operator'
                />
                <Divider />
                <Contact 
                    handleChange={this.props.handleChange}
                    stateType='operator'
                />
            </div>
        )
    }
}

export default OperatorForm;