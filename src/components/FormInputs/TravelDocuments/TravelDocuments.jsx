import React, {Component} from 'react';
import {Input, Label, Select} from 'semantic-ui-react';
import {DateInput} from 'semantic-ui-calendar-react';

import '../FormInputs.css';

const docCodeSelectOptions = [
    { key: 'P', value: 'P', text: 'Passport' },
    { key: 'L', value: 'L', text: "Pilot's License" },
    { key: '', value: '', text: "----------------" },
    {key: 'A', value: 'A', text:'U.S. Alien Registration Card'},
    {key: 'B', value: 'B', text: 'U.S. Border Crossing Card'},    
    {key: 'C', value: 'C', text: 'U.S. Permanent Resident Card'},
    {key: 'F', value: 'F', text: 'Facilitation Document'},
    {key: 'G', value: 'G', text: 'U.S. Merchant Mariner Document'},
    {key: 'IN', value: 'IN', text: 'NEXUS Card'},
    {key: 'IS', value: 'IS', text: 'SENTRI card'},
    {key: 'M', value: 'M', text: 'Military ID Card'},    
    {key: 'TP', value: 'TP', text: 'U.S. Refugee Permit Travel Document'},
    {key: 'TR', value: 'TR', text: 'U.S. Re-entry Permit Travel Document'},    
]

class TravelDocuments extends Component{
    
    state = {
        date: '',
        person: this.props.person
    }

    onDateChange = (event, { name, value }) => {
        console.log('date change', value);
        console.log('date change:', name);
        //nothing to see here. move along
        this.setState({
            ...this.state,
            date: value
        })
        this.handleChange(this.props.stateType, name, { target: { value: value } })
    }

    onSelectChange = (event, { name, value }) => {
        console.log("sex change:", value);
        this.handleChange(this.props.stateType, name, { target: { value: value } })
    }

    handleChange = (propertyToChange, newProperty, event) => {
        this.setState({
            ...this.state,
            person: {
                ...this.state.person,
                [newProperty]: event.target.value
            }
        })
        this.props.handleChange(propertyToChange, newProperty, event)
    }

    render(){
        return(
            <>
                <Label className="formInputLabel">
                    <Input className="formInput"
                        onChange={(e) => this.handleChange(this.props.stateType, "documentNumber", e)}
                        placeholder="Document Number"
                        defaultValue={(this.props.person) && this.props.person.documentNumber}
                    />
                    <span>
                        Document Number
                    </span>
                </Label>
                <Label className="formInputLabel">
                    <Select className="formAltInput"
                        placeholder="Document Type"
                        name="documentType"
                        options={docCodeSelectOptions}
                        onChange={this.onSelectChange}
                        defaultValue={(this.props.person) && this.props.person.documentType}
                    />
                    <span>
                        Document Type
                    </span>
                </Label>
                <Label className="formInputLabel">
                    <DateInput className="formAltInput"
                        name="expiryDate"
                        placeholder="Expiry Date (YYYY-MM-DD)"
                        value={this.state.date}
                        iconPosition="left"
                        onChange={this.onDateChange}
                        defaultValue={(this.props.person) && this.props.person.expiryDate}
                        style={{ width: '100%' }}
                        dateFormat="YYYY-MM-DD"
                    />
                    <span>
                        Birth Date
                    </span>
                </Label>
                <Label className="formInputLabel">
                    <Select className="formAltInput"
                        placeholder="Issuing Country"
                        name="residenceCountry"
                        options={[
                            { key: 'MEX', value: 'MEX', text: 'MEX' },
                            { key: 'USA', value: 'USA', text: 'USA' }
                        ]}
                        onChange={this.onSelectChange}
                        defaultValue={(this.props.person) && this.props.person.residenceCountry}
                    />
                    <span>
                        Issuing Country
                    </span>
                </Label>
            </>
        )
    }
}

export default TravelDocuments;