import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ReviewItems.css'
import {Button} from 'semantic-ui-react';

const moment = require('moment');

class ReviewItems extends Component {
  
    edit = () => {
        console.log('in edit');
        
    }


 render() {
    
    let crewToShow;
    let paxToShow;
    console.log('HERES THAT THING', this.props.review.crewpaxpeople);
    console.log('STUFF', Object.keys(this.props.review));
       
    //Conditional rendering to show only people with the type of crew (2)
     if (Object.keys(this.props.review).length) {
    
       console.log('new thing here: ', this.props.review);
       
        crewToShow = (
      <>
        <ul>
            {this.props.review.crewpaxpeople.map(person => {  
              if(person.crew_paxPeopleType == 2) 
               // console.log('PERSON HEIRE: ', person);
                return <li>{person.crew_paxFirstName}</li> 
            })}
        </ul>
        </>    
    )}
    //Conditional rendering to show only people with the type of pax (1)
    if (Object.keys(this.props.review).length) {
    
       console.log('new thing here: ', this.props.review);
       
        paxToShow = (
      <>
        <ul>
            {this.props.review.crewpaxpeople.map(person => {  
              if(person.crew_paxPeopleType == 1) 
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
        {/* Aircraft Information */}
        <div>
         <h3>AirCraft</h3>
         <Button className="ui tiny button" onClick={this.edit}>Edit Section</Button>
         
             <>
             <p className="tailNum">Tail Number: {this.props.review.planetailnum}</p>
             <p>Owner: {this.props.review.ownerfirstname} {this.props.review.ownerlastname}</p>
             </>
         
        </div>
        {/* Operator Information */}
        <div>
         <h3>Operator</h3>
         <button onClick={this.edit}>Edit Section</button>
             <>
                 <p>Company/Person Operator: {this.props.review.operatorfirstname} {this.props.review.operatorlastname}</p>
             </>
         
        </div>
        {/* Manifest Info - Crew & Pax */}
        <div>
         <h3>Manifest</h3>
         <button onClick={this.edit}>Edit Section</button>
         <h5>Crew</h5>
            {crewToShow}
         
         <h5>Passengers</h5>
            {paxToShow}
        </div>
        {/* flight segment one */}
        <div>
         <h3>Flight Segment One</h3>
         <h5> Departure </h5>
         <button onClick={this.edit}>Edit Section</button>
             <>
             <p>Departure Airport: {this.props.review.departureairportcity}, {this.props.review.departureairportcntry}</p>
             <p>Departure Date: {moment(this.props.review.localdeparturetimeStamp).format("MM/DD/YYYY")} </p>
             <p>Departure Time: {moment(this.props.review.localdeparturetimeStamp).format("LT")} </p>
             </>
        </div>
        {/* flight segment two */}
        <div>
         <h3>Flight Segment Two</h3>
         <h5> Arrival </h5>
         <Button className="ui tiny button" onClick={this.edit}>Edit Section</Button>
             <>
             <p>Arrival Airport: {this.props.review.arrivalairportcity}, {this.props.review.arrivalairportcntry}</p>
             <p>Arrival Date: {moment(this.props.review.localdeparturetimeStamp).format("MM/DD/YYYY")}  </p>
             <p>Arrival Time: {moment(this.props.review.localdeparturetimeStamp).format("LT")}</p>
             </>
        </div>
     </div>
     
     </>



    )
 }
}

const mapStateToProps = (reduxState) => ({
    review: reduxState.reviewReducer
});

export default connect(mapStateToProps)(ReviewItems);