import React, {Component} from 'react';
import {Divider, Button, Grid } from 'semantic-ui-react';
import {connect} from 'react-redux';

import Name from '../FormInputs/Name/Name.jsx';
import Address from '../FormInputs/Address/Address.jsx';
import Contact from '../FormInputs/Contact/Contact.jsx';
import TravelDocuments from '../FormInputs/TravelDocuments/TravelDocuments.jsx';

class CrewUpdateForm extends Component{
    state = {
        crew: this.props.crew,
    }

    componentDidMount(){
        //fetch info here
    }

    componentDidUpdate(){
        if(!Object.keys(this.state.crew).length){
            if(this.state.crew !== this.props.crew){
                this.setState({
                    ...this.state,
                    crew: this.props.crew
                })
            }
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();

        console.log('doing a submitto');
    }

    handleCancel = () => {
        this.props.history.push('/crewinfo');
    }

    handleChange = (propertyToChange, newProperty, event) => {
        this.setState({
            ...this.state,
            [propertyToChange]: {
                ...this.state[propertyToChange],
                [newProperty]: event.target.value
            }
        })

    }

    render() {
        return(
            <div>
                <h1>Edit Crew</h1>
                <form className="addForm" onSubmit={this.handleSubmit}>
                    <h2>Crew Info</h2>
                    <Name extended={true} handleChange={this.handleChange} stateType="crew" person={this.props.crew}/>
                    <Divider />
                    <Address handleChange={this.handleChange} stateType="crew" person={this.props.crew}/>
                    <Divider />
                    <Contact handleChange={this.handleChange} stateType="crew" person={this.props.crew}/>
                    <Divider />
                    <h2>Travel Document 1</h2>
                    <TravelDocuments handleChange={this.handleChange} stateType="travelDocumentOne" person={this.props.crew}/>
                    <h2>Travel Document 2</h2>
                    <TravelDocuments handleChange={this.handleChange} stateType="travelDocumentTwo" person={this.props.crew}/>

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
                                    Add Crew
                                </Button>
                            </Grid.Column>
                        </Grid>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return {
        crew: reduxState.crewReducer
    }
}

export default connect(mapStateToProps)(CrewUpdateForm);