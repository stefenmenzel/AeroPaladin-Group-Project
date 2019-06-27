import React, {Component} from 'react';
import {Step, Grid} from 'semantic-ui-react';
import {connect} from 'react-redux';

import SelectAircraftForm from '../Forms/SelectAircraftForm/SelectAircraftForm';
import Name from '../FormInputs/Name/Name.jsx';

const componentArray=[
    <SelectAircraftForm/>,
    <Name />
]

const stepItems=[
    {active: true, completed: false, title: 'Aircraft', description: 'Choose your aircraft'},
    {completed: false, title: 'Crew', description: 'Choose your crew'},
    { completed: false, title: 'Passengers', description: 'Choose your Passengers' },
    { completed: false, title: 'Flight segment one', description: 'Flight Segment One' },
    { completed: false, title: 'Flight segment Two', description: 'Flight Segment Two' },

]

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

    stepComponent = () => {
        return(
            componentArray[this.state.step]
        )
    }

    render(){
        return(
            <>
                <div className="apisForm">
                    <Grid columns='equal'>
                        <Grid.Column width={2}></Grid.Column>
                        <Grid.Column width={8}>
                            <h1>New APIS Entry</h1>
                            <Step.Group ordered steps={stepItems}>
                            </Step.Group>
                        </Grid.Column>
                        <Grid.Column width={2}></Grid.Column>
                    </Grid>
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