import React, { Component } from 'react';
import { Divider } from 'semantic-ui-react';

import Name from '../Name/Name.jsx';
import Address from '../Address/Address.jsx';
import Contact from '../Contact/Contact.jsx';

class OwnerForm extends Component {

    render() {
        return (
            <div>
                <h2>Owner</h2>
                <Name />
                <Divider style={{ width: '40%' }} />
                <Address />
                <Divider style={{ width: '40%' }} />
                <Contact />
            </div>
        )
    }
}

export default OwnerForm;