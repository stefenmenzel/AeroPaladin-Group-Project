import React, {Component} from 'react';
import {Divider, Button, Grid } from 'semantic-ui-react';
import {connect} from 'react-redux';

import Name from '../FormInputs/Name/Name.jsx';
import Address from '../FormInputs/Address/Address.jsx';
import Contact from '../FormInputs/Contact/Contact.jsx';
import TravelDocuments from '../FormInputs/TravelDocuments/TravelDocuments.jsx';

class CrewUpdateForm extends Component{
    state = {

    }

    componentDidMount(){
        //fetch info here
    }

    handleSubmit = (event) => {
        event.preventDefault();

        console.log('doing a submitto');
    }

    handleCancel = () => {
        this.props.history.push('/crewinfo');
    }

    render() {
        return(
            <div>Testing form</div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return {
        reduxState
    }
}

export default connect(mapStateToProps)(CrewUpdateForm);