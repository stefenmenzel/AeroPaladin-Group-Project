import React, {Component} from 'react';
import {Divider, Button, Grid} from 'semantic-ui-react';
import {connect} from 'react-redux';

import Aircraft from '../../FormInputs/Aircraft/Aircraft.jsx';
import OperatorForm from '../../FormInputs/OperatorForm/OperatorForm.jsx';
import OwnerForm from '../../FormInputs/OwnerForm/OwnerForm.jsx';

import '../Forms.css';

class AddAircraftForm extends Component{

    state = {

    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log('submitting....or trying');
        this.props.dispatch({type: 'ADD_AIRCRAFT', payload: this.state});
    }

    handleCancel = () => {
        console.log('canceling');
    }

    handleChange = (propertyToChange, event) => {
        this.setState({
            ...this.state,
            [propertyToChange]: event.target.value
        })
    }

    render(){
        console.log('this.state:', this.state);
        return(
            <div>
                <h1>Add Aircraft</h1>
                <form className="addForm" onSubmit={this.handleSubmit}>                    
                    <Aircraft handleChange={this.handleChange} />
                    <Divider />
                    <OperatorForm handleChange={this.handleChange}/>
                    <Divider />
                    <OwnerForm handleChange={this.handleChange}/>

                    <div className="formButtons">
                        <Grid columns='equal'>
                            <Grid.Column width={10}></Grid.Column>
                            <Grid.Column width={3}>
                                <Button 
                                    type="button"
                                    onClick={this.handleCancel}
                                    secondary 
                                    className="formButton"
                                >
                                    Cancel
                                </Button>
                            </Grid.Column>

                            <Grid.Column width={3}>
                                <Button
                                    type="submit"
                                    primary 
                                    className="formButton"
                                >
                                    Add Aircraft
                                </Button>
                            </Grid.Column>
                        </Grid>                        
                    </div>
                </form>
            </div>            
        )
    }
}

export default connect()(AddAircraftForm);