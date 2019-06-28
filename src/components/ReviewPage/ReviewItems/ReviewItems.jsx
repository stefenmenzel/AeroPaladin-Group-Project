import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ReviewItems.css'
import {Button} from 'semantic-ui-react';

class ReviewItems extends Component {
  
    edit = () => {
        console.log('in edit');
        
    }


 render() {
    
    let crewToShow;
    console.log('HERES THAT THING', this.props.review.crewpaxpeople);
    console.log('STUFF', Object.keys(this.props.review));
    
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


        //     crewToShow = (
    //         <div>
        
    //          return(
    //              <> 
    //              {crewInfo.crewpaxpeople.map(person => {
    //                  return (<p>Crew Member: {person.crew_paxFirstName} {person.crew_paxLastName}</p>)
                 
    //                 })}  
    //              </>
    //          )
    //  })}
    //         </div>
    //         )}



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
             <p>Tail Number: {this.props.review.planetailnum}</p>
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
        </div>
        {/* flight segment one */}
        <div>
         <h3>Flight Segment One</h3>
         <h5> Departure </h5>
         <button onClick={this.edit}>Edit Section</button>
             <>
             <p>Departure Airport: {this.props.review.departureairportcity}, {this.props.review.departureairportcntry}</p>
             <p>Departure Date: {this.props.review.localdeparturetimeStamp} </p>
             <p>Departure Time: {this.props.review.localdeparturetimeStamp}</p>
             </>
        </div>
        {/* flight segment two */}
        <div>
         <h3>Flight Segment Two</h3>
         <h5> Arrival </h5>
         <button onClick={this.edit}>Edit Section</button>
             <>
             <p>Arrival Airport: {this.props.review.arrivalairportcity}, {this.props.review.arrivalairportcntry}</p>
             <p>Arrival Date: {this.props.review.localdeparturetimeStamp} </p>
             <p>Arrival Time: {this.props.review.localdeparturetimeStamp}</p>
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