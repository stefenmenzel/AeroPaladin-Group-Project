import React, { Component } from 'react';
import { Select, Grid, Label, Button } from 'semantic-ui-react'
import { connect } from 'react-redux';

import '../../FormInputs/FormInputs.css'

let options = []

class SelectPassengerForm extends Component {

    state = {
        currentPassenger: {},
        passengers:[
            
         ],
        
    }

    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_PASSENGER' });
        console.log("this.props.passenger:", this.props.passengers);
    }

    // onSelectChange = (event, { name, value }) => {
    //     console.log("sex change:", value);
    //     this.setState({
    //         ...this.state,
    //         passenger: {
    //             ...this.state.passenger
    //         }
    //         passengerId: value,
            
    //     })
    //     // this.props.handleChange(this.props.stateType, name, { target: { value: value } })
    // }

    onSelectChange = (event, { name, value}) => {
        let passengerObj = options[value];
        console.log('passenger obj:', passengerObj);
        let passengerId = passengerObj.id;
        this.setState({
          ...this.state,
          currentPassenger: passengerObj
        //   passenger:{
        //       ...this.state.passenger,
        //       [passengerId]: passengerObj
        //   }  
        });
    }

    addPassenger = () => {
        console.log('clicked on add button', this.state);
        this.setState({
            ...this.state,
            passengers: [
                ...this.state.passengers,
                // {[this.state.currentPassenger.id]:this.state.currentPassenger}
                this.state.currentPassenger
            ]
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log("doing a submit", this.state);
        this.props.dispatch({ type: 'SET_APIS_PASSENGER', payload: this.state.passengers })
        this.props.nextStep();
    }

    getPassenger = () => {
        options = []
        let selectOptions = []
        for(let i = 0; i < this.props.passengers.length; i++){
            let passenger = this.props.passengers[i];
            options.push(passenger);
            selectOptions.push(
                {key: i, value: i, text: `${passenger.firstname} ${passenger.lastname}`}
            )
        }
        
        return selectOptions;            
    }

    render(){
        console.log('this.state:', this.state);
        console.log('current passengers:', this.props.passengers);
        console.log('current passenger state:', this.state.currentPassenger );
        console.log('current passengers selected:', this.state.passengers);
        return(

            <div className="formInputs"> 
                <form className="addForm" onSubmit={this.handleSubmit}>                                   
                    <h2>Passengers</h2>
                    <Label className="formInputLabel">
                        <Select className="formAltInput"
                            value={this.state.passengerValue}
                            placeholder="select your passenger"
                            name="passenger"
                            options={this.getPassenger()}
                            onChange={this.onSelectChange}
                        />
                        <span>
                            Choose Passenger
                    </span>
                    </Label>
                    <div className="formButtons">
                        <Grid columns='equal'>                            
                                <Grid.Column width={12}></Grid.Column>
                                <Grid.Column width={3}>
                                    <Button
                                        type="button"
                                        primary
                                        className="formButton"
                                        onClick={this.addPassenger}
                                    >
                                       ADD
                                </Button>
                                </Grid.Column>                                                     
                        </Grid>
                    </div>
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
    return {
        passengers: reduxState.passengerReducer
    }
}

export default connect(mapStateToProps)(SelectPassengerForm);