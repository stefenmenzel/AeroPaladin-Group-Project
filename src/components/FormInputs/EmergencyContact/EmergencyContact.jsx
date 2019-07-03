import React, {Component} from 'react';
import {Divider} from 'semantic-ui-react';

import Name from '../Name/Name.jsx';
import Contact from '../Contact/Contact.jsx';

class EmergencyContact extends Component {

    state = {
        emergencyContact : '',
    }

    render() {
        return(
            <div>
                <h2 className="travelDocHead">Emergency Contact</h2>
                <Name
                    handleChange={this.props.handleChange}
                    stateType='emergencyContact'
                    person={this.props.emergencyContact}
                />
                <Divider />
                <Contact
                    handleChange={this.props.handleChange}
                    stateType='emergencyContact'
                    person={this.props.emergencyContact}
                />
            </div>
        )
    }
}

export default EmergencyContact;