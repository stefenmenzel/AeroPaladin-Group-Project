import React, {Component} from 'react';
import {Step, Grid} from 'semantic-ui-react';
import {connect} from 'react-redux';

import SelectAircraftForm from '../Forms/SelectAircraftForm/SelectAircraftForm';
import SelectCrewForm from '../Forms/SelectCrewForm/SelectCrewForm';
import SelectPassengerForm from '../Forms/SelectPassengerForm/SelectPassengerForm';
import FlightSegment from '../FormInputs/FlightSegment/FlightSegment';

/**
 * This component will walk a user through creating a new APIS.
 * It has a stepper that displays the current progress in creating
 * the APIS along with displaying the current form the user is currently filling out.
 */
class CreateNewApis extends Component{

    //this state will help us keep track of where we are in the form.
    state = {
        step: 1,
        maxSteps: 5,        
    }    

    //flip to the next step
    nextStep = () => {
        console.log("inside next step");
        if(this.state.step + 1 <= this.state.maxSteps){
            this.setState({
                step: this.state.step + 1
            })
        }        
    }

    //flip to the previous step.
    previousStep = () => {
        if(this.state.step -1 >= 1){
            this.setState({
                step: this.state.step - 1
            })
        }
    }

    //this function will set the stepper components as acive/completed
    activeOrCompleted = (stepPosition) => {
        return(
            (stepPosition < this.state.step) ?
            true
            : 
            false
        )
    }

    //this function returns the component that the form is currently on.
    conditionalComponent = () => {
        const componentArray = [
            <SelectAircraftForm nextStep={this.nextStep} />,
            <SelectCrewForm nextStep={this.nextStep} previousStep={this.previousStep} />, 
            <SelectPassengerForm nextStep={this.nextStep} previousStep={this.previousStep} />,
            <FlightSegment nextStep={this.nextStep} previousStep={this.previousStep} stateType="flightSegmentOne"/>,
            <FlightSegment nextStep={this.nextStep} previousStep={this.previousStep} stateType="flightSegmentTwo"/>,

        ]
        return(
            componentArray[this.state.step - 1]
        )
    }

    render(){
        return(
            <>
            {/* First a stepper...this displays current progress */}
                <div className="apisForm">
                    <h1>New APIS Entry</h1>
                    <div style={{width:'80%'}}>
                        <Step.Group ordered>
                            <Step completed={this.activeOrCompleted(1)}>
                                <Step.Content>
                                    <Step.Title>Aircraft</Step.Title>
                                    <Step.Description>Choose your aircraft</Step.Description>
                                </Step.Content>
                            </Step>
                            <Step completed={this.activeOrCompleted(2)}>
                                <Step.Content>
                                    <Step.Title>Crew</Step.Title>
                                    <Step.Description>Choose your crew</Step.Description>
                                </Step.Content>
                            </Step>
                            <Step completed={this.activeOrCompleted(3)}>
                                <Step.Content>
                                    <Step.Title>Passengers</Step.Title>
                                    <Step.Description>Choose your Passengers</Step.Description>
                                </Step.Content>
                            </Step>
                            <Step completed={this.activeOrCompleted(4)}>
                                <Step.Content>
                                    <Step.Title>Flight Segment One</Step.Title>
                                    <Step.Description>Choose your first Flight Segment</Step.Description>
                                </Step.Content>
                            </Step>
                        <Step completed={this.activeOrCompleted(5)}>
                                <Step.Content>
                                    <Step.Title>Flight Segment Two</Step.Title>
                                    <Step.Description>Choose your Second Flight Segment</Step.Description>
                                </Step.Content>
                            </Step>
                        </Step.Group>
                    </div>                    
                </div>
                {/* Now our currently displayed component. */}
                <div>
                    {this.conditionalComponent()}
                </div>
            </>            
        )
    }
}

const mapStateToProps = (reduxState) => {
    return{
        reduxState
    }
}

export default connect(mapStateToProps)(CreateNewApis)