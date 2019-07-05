import React, {Component} from 'react';
import {Divider} from 'semantic-ui-react';

import Name from '../Name/Name.jsx';
import Contact from '../Contact/Contact.jsx';

class EmergencyContact extends Component {

    state = {
        emergencyContact : '',
    }

    render() {
        console.log('this.props.person in emergency contact:', this.props.person)
        return(
            <div>
                <h2 className="travelDocHead">Emergency Contact</h2>
                <Name
                    handleChange={this.props.handleChange}
                    stateType='emergencyContact'
                    person={this.props.person}
                />
                <Divider />
                <Contact
                    handleChange={this.props.handleChange}
                    stateType='emergencyContact'
                    person={{ email: this.props.person.emailAddress, phoneNumber: this.props.person.telephoneNumber }}
                />
            </div>
        )
    }
}

export default EmergencyContact;