import React, {Component} from 'react';
import {Step, Grid} from 'semantic-ui-react';
import {connect} from 'react-redux';

import SelectAircraftForm from '../Forms/SelectAircraftForm/SelectAircraftForm';
import Name from '../FormInputs/Name/Name.jsx';

const componentArray=[
    <SelectAircraftForm/>,
    <Name />
]

// const stepItems=[
//     {active: true, completed: false, title: 'Aircraft', description: 'Choose your aircraft'},
//     {completed: false, title: 'Crew', description: 'Choose your crew'},
//     { completed: false, title: 'Passengers', description: 'Choose your Passengers' },
//     { completed: false, title: 'Flight segment one', description: 'Flight Segment One' },
//     { completed: false, title: 'Flight segment Two', description: 'Flight Segment Two' },

// ]

class CreateNewApis extends Component{

    state = {
        step: 1,
        maxSteps: 5
    }

    nextStep = () => {
        if(this.state.step + 1 <= this.state.maxSteps){
            this.setState({
                step: this.state.step + 1
            })
        }        
    }

    previousStep = () => {
        if(this.state.step -1 >= 1){
            this.setState({
                step: this.state.step - 1
            })
        }
    }

    activeOrCompleted = (stepPosition) => {
        return(
            (stepPosition < this.state.step) ?
            true
            : 
            false
        )
    }

    render(){
        return(
            <>
                <div className="apisForm">
                    {/* <Grid columns='equal'> */}
                        {/* <Grid.Column width={2}></Grid.Column> */}
                        {/* <Grid.Column width={8}> */}
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
                        {/* </Grid.Column> */}
                        {/* <Grid.Column width={2}></Grid.Column> */}
                    {/* </Grid> */}
                </div>
                <div>
                    {componentArray[this.state.step - 1]}                  
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