import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ReviewItems.css'
import {Button, List} from 'semantic-ui-react';

const moment = require('moment');

class ReviewItems extends Component {
  
    edit = () => {
        console.log('in edit');
        
    }


 render() {
    
    let crewToShow;
    let paxToShow;
    // console.log('HERES THAT THING', this.props.review.crewpaxpeople);
    // console.log('STUFF', Object.keys(this.props.review));
       
    //Conditional rendering to show only people with the type of crew (2)
     if (Object.keys(this.props.review).length) {
    
       //console.log('new thing here: ', this.props.review);
       
        crewToShow = (
      <>
        <ul>
            {this.props.review.crewpaxpeople.map(person => {  
              if(person.crew_paxPeopleType === 2) 
               // console.log('PERSON HEIRE: ', person);
                return <li>{person.crew_paxFirstName}</li> 
            })}
        </ul>
        </>    
    )}
    //Conditional rendering to show only people with the type of pax (1)
    if (Object.keys(this.props.review).length) {
    
       //console.log('new thing here: ', this.props.review);
       
        paxToShow = (
      <>
        <ul>
            {this.props.review.crewpaxpeople.map(person => {  
              if(person.crew_paxPeopleType === 1) 
               // console.log('PERSON HEIRE: ', person);
                return <li>{person.crew_paxFirstName}</li> 
            })}
        </ul>
        </>    
    )}


    return (
     <>
     <div>
      <h2 className="ui header middle aligned center aligned grid">Review APIS</h2>
     </div>
     <div className="ui segments grid review div big">
        <List>
        {/* Aircraft Information */}
        
         <List.Item className="listItem">
            <List.Header>AirCraft</List.Header>
            <Button className="ui mini button" onClick={this.edit}>Edit Section</Button>
            <br/>
            Tail Number: {this.props.review.planetailnum}
            <br/>
            Owner: {this.props.review.ownerfirstname} {this.props.review.ownerlastname}
         </List.Item>
        
        {/* Operator Information */}
        <List.Item className="listItem">
         <List.Header>Operator</List.Header>
         <Button className="ui mini button" onClick={this.edit}>Edit Section</Button>
         <br/>    
         Company/Person Operator: {this.props.review.operatorfirstname} {this.props.review.operatorlastname}
        </List.Item>
        {/* Manifest Info - Crew & Pax */}
        <List.Item className="listItem">
         <List.Header>Manifest</List.Header>
         <Button className="ui mini button" onClick={this.edit}>Edit Section</Button>
         <br/>
         Crew
            {crewToShow}
         
         Passengers
            {paxToShow}
        </List.Item>
        {/* flight segment one */}
        <List.Item className="listItem">
         <List.Header>Flight Segment One</List.Header>
         Departure
         <br/>
         <Button className="ui mini button" onClick={this.edit}>Edit Section</Button>
            <br/>
             Departure Airport: {this.props.review.departureairportcity}, {this.props.review.departureairportcntry}
            <br/>
             Departure Date: {moment(this.props.review.localdeparturetimeStamp).format("MM/DD/YYYY")} 
            <br/>
             Departure Time: {moment(this.props.review.localdeparturetimeStamp).format("LT")} 
        </List.Item>
        
        {/* flight segment two */}
        <List.Item className="listItem">
         <List.Header>Flight Segment Two</List.Header>
          Arrival 
          <br/>
         <Button className="ui tiny button" onClick={this.edit}>Edit Section</Button>
             <br/>
             Arrival Airport: {this.props.review.arrivalairportcity}, {this.props.review.arrivalairportcntry}
             <br/>
             Arrival Date: {moment(this.props.review.localdeparturetimeStamp).format("MM/DD/YYYY")} 
             <br/>
             Arrival Time: {moment(this.props.review.localdeparturetimeStamp).format("LT")}
             
        </List.Item>
        </List>
     </div>
     
     </>



    )
 }
}

const mapStateToProps = (reduxState) => ({
    review: reduxState.reviewReducer
});

export default connect(mapStateToProps)(ReviewItems);