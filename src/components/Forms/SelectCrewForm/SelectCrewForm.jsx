import React, {Component} from 'react';
import {Select, Grid, Label, Button} from 'semantic-ui-react'
import {connect} from 'react-redux';

import '../../FormInputs/FormInputs.css'

let options = []

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
        let crewObj = options[value];
        this.setState(crewObj);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log("doing a submit", this.state);
        this.props.dispatch({type: 'SET_APIS_CREW', payload:this.state})
    }

    getCrews = () => {
        options = []
        let selectOptions = []
        for(let i = 0; i < this.props.crews.length; i++){
            let crew = this.props.crews[i];
            options.push(crew);
            selectOptions.push(
                {key: i, value: i, text: `${crew.firstname} ${crew.lastname}`}
            )
        }
        
        return selectOptions;            
    }

    render(){
        console.log('this.state:', this.state);
        console.log('current crews:', this.props.crews);
        return(

            <div className="formInputs"> 
                <form className="addForm" onSubmit={this.handleSubmit}>                                   
                    <h2>Crew</h2>
                    <Label className="formInputLabel">
                        <Select className="formAltInput"
                            value={this.state.crewValue}
                            placeholder="select your crew"
                            name="crew"
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