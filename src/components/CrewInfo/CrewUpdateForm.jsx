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
        travelDocumentOne: this.props.travelDocumentOne,
        travelDocumentTwo: this.props.travelDocumentTwo,
    }

    componentDidMount(){
        this.props.dispatch({ type: 'FETCH_UPDATE_CREW', payload: this.props.match.params.id })
        this.props.dispatch({ type: 'FETCH_UPDATE_CREW_DOCUMENT_ONE', payload: this.props.match.params.id })
        this.props.dispatch({ type: 'FETCH_UPDATE_CREW_DOCUMENT_TWO', payload: this.props.match.params.id })     
    }

    componentDidUpdate(){
        if(!Object.keys(this.state.crew).length || Array.isArray(this.state.crew)){
            console.log('checking crew for length');
            if(this.state.crew !== this.props.crew){                
                this.setState({
                    ...this.state,
                    crew: this.props.crew[0]
                })
            }
        }
        if(!Object.keys(this.state.travelDocumentOne).length){
            if(this.state.travelDocumentOne !== this.props.travelDocumentOne){
                this.setState({
                    ...this.state,
                    travelDocumentOne: this.props.travelDocumentOne
                })
            }
        }
        if (!Object.keys(this.state.travelDocumentTwo).length) {
            if (this.state.travelDocumentTwo !== this.props.travelDocumentTwo) {
                this.setState({
                    ...this.state,
                    travelDocumentTwo: this.props.travelDocumentTwo
                })
            }
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log('doing a submitto');
        this.props.dispatch({type: 'UPDATE_CREW', payload: this.state});
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
        console.log('this.state in crew update:', this.state);
        console.log('this.props.crew:', this.props.crew);
        return(
            <div>
                <h1>Edit Crew</h1>
                <form className="addForm" onSubmit={this.handleSubmit}>
                    <h2>Crew Info</h2>
                    <Name extended={true} handleChange={this.handleChange} stateType="crew" person={this.props.crew[0]}/>
                    <Divider />
                    <Address handleChange={this.handleChange} stateType="crew" person={this.props.crew[0]}/>
                    <Divider />
                    <Contact handleChange={this.handleChange} stateType="crew" person={this.props.crew[0]}/>
                    <Divider />
                    <h2>Travel Document 1</h2>
                    <TravelDocuments handleChange={this.handleChange} stateType="travelDocumentOne" travelDocument={this.props.travelDocumentOne}/>
                    <h2>Travel Document 2</h2>
                    <TravelDocuments handleChange={this.handleChange} stateType="travelDocumentTwo" travelDocument={this.props.travelDocumentTwo}/>

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
                                    Edit Crew
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
        crew: reduxState.crewReducer,
        travelDocumentOne: reduxState.documentOneReducer,
        travelDocumentTwo: reduxState.documentTwoReducer,
    }
}

export default connect(mapStateToProps)(CrewUpdateForm);