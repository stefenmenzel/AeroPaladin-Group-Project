import React, {Component} from 'react';
import {Select, Grid, Label, Button} from 'semantic-ui-react'
import {connect} from 'react-redux';

import '../../FormInputs/FormInputs.css'

class SelectAircraftForm extends Component{

    state = {
        aircraftId: ''
    }

    componentDidMount(){
        this.props.dispatch({ type: 'FETCH_AIRCRAFT'});
        console.log("this.props.aircrafts:", this.props.aircrafts);
    }

    onSelectChange = (event, { name, value}) => {
        console.log("sex change:", value);
        this.setState({
            ...this.state,            
            aircraftId: value
        })
        // this.props.handleChange(this.props.stateType, name, { target: { value: value } })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log("doing a submit");
        
    }

    getAircrafts = () => {
        let options = []
        for (let i of this.props.aircrafts) {
            options.push(
                { key: i.id, value: i.id, text: `${i.typeaircraft} ${i.callsign}`}
            );
        }        
        console.log('options after population:', options);        
        return options;
            // {key: 'blah', value:'blah', text:'blah'}
    }

    render(){
        console.log('this.state:', this.state);
        console.log('current aircrafts:', this.props.aircrafts);
        return(
            <div className="formInputs"> 
                <form className="addForm" onSubmit={this.handleSubmit}>                                   
                    <h2>Aircraft</h2>
                    <Label className="formInputLabel">
                        <Select className="formAltInput"
                            value={this.state.aircraftValue}
                            placeholder="select your aircraft"
                            name="aircraft"
                            options={this.getAircrafts()}
                            onChange={this.onSelectChange}
                        />
                        <span>
                            Choose Aircraft
                    </span>
                    </Label>

                    <div className="formButtons">
                        <Grid columns='equal'>                            
                                <Grid.Column width={12}></Grid.Column>
                                <Grid.Column width={3}>
                                    <Button
                                        type="submit"
                                        primary
                                        className="formButton"
                                    >
                                        Next
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
    return{
        aircrafts: reduxState.aircraftReducer
    }
}

export default connect(mapStateToProps)(SelectAircraftForm);