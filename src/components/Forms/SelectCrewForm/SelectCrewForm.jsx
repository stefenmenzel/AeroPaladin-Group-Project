import React, {Component} from 'react';
import {Select, Grid, Label, Button} from 'semantic-ui-react'
import {connect} from 'react-redux';

import '../../FormInputs/FormInputs.css'

class SelectCrewForm extends Component{

    state = {
        crewId: ''
    }

    componentDidMount(){
        this.props.dispatch({ type: 'FETCH_CREW'});
        console.log("this.props.crews:", this.props.crews);
    }

    onSelectChange = (event, { name, value}) => {
        console.log("sex change:", value);
        this.setState({
            ...this.state,            
            crewId: value
        })
        // this.props.handleChange(this.props.stateType, name, { target: { value: value } })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log("doing a submit");
    }

    getCrews = () => {
        let options = []
        for (let i of this.props.crews) {
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
        console.log('current aircrafts:', this.props.crews);
        return(
            <div className="formInputs"> 
                <form className="addForm" onSubmit={this.handleSubmit}>                                   
                    <h2>Manifest</h2>
                    <Label className="formInputLabel">
                        <Select className="formAltInput"
                            value={this.state.crewValue}
                            placeholder="select your aircraft"
                            name="aircraft"
                            options={this.getCrews()}
                            onChange={this.onSelectChange}
                        />
                        <span>
                            Choose Crew
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
        crews: reduxState.crewReducer
    }
}

export default connect(mapStateToProps)(SelectCrewForm);