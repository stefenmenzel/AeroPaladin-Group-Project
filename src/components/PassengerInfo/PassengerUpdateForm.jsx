import React, { Component } from 'react';
import { Divider, Button, Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';

import Name from '../FormInputs/Name/Name.jsx';
import Address from '../FormInputs/Address/Address.jsx';
import Contact from '../FormInputs/Contact/Contact.jsx';
import TravelDocuments from '../FormInputs/TravelDocuments/TravelDocuments.jsx';

class PassengerUpdateForm extends Component {
    state = {

    }

 
    componentDidMount(){
        this.props.dispatch({ type: 'FETCH_UPDATE_PASSENGER', payload: this.props.match.params.id })
        this.props.dispatch({ type: 'FETCH_UPDATE_PASSENGER_DOCUMENT_ONE', payload: this.props.match.params.id })
        this.props.dispatch({ type: 'FETCH_UPDATE_PASSENGER_DOCUMENT_TWO', payload: this.props.match.params.id })
        }    

    handleSubmit = (event) => {
        event.preventDefault();

        console.log('doing a submitto');
    }

    handleCancel = () => {
        this.props.history.push('/crewinfo');
    }

    render() {
        return (
            <div>Testing form</div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return {
        reduxState
    }
}

export default connect(mapStateToProps)(PassengerUpdateForm);