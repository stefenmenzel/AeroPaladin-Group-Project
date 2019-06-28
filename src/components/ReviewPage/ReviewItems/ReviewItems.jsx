import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ReviewItems.css'
import {Segment, SegmentGroup, SegmentInline} from 'semantic-ui-react';

class ReviewItems extends Component {
  
    edit = () => {
        console.log('in edit');
        
    }


 render() {
    
    let crewToShow;
     if (this.props.review) {
        crewToShow = (
            <div>
            {this.props.review.map(crewInfo => {
             return(
                 <> 
                 {crewInfo.crewpaxpeople.map(person => {
                     return (<p>Crew Member: {person.crew_paxFirstName} {person.crew_paxLastName}</p>)
                 
                    })}  
                 </>
             )
     })}
            </div>
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
         <button onClick={this.edit}>Edit Section</button>
         {this.props.review.map(planeInfo => (
             <>
             <p>Tail Number: {planeInfo.planetailnum}</p>
             <p>Owner: {planeInfo.ownerfirstname} {planeInfo.ownerlastname}</p>
             </>
         ))}
        </div>
        {/* Operator Information */}
        <div>
         <h3>Operator</h3>
         <button onClick={this.edit}>Edit Section</button>
         {this.props.review.map(opInfo => (
             <>
                 <p>Company/Person Operator: {opInfo.operatorfirstname} {opInfo.operatorlastname}</p>
             </>
         ))}
        </div>
        {/* Manifest Info - Crew & Pax */}
        <div>
         <h3>Manifest</h3>
         <button onClick={this.edit}>Edit Section</button>
         <h5>Crew</h5>
            {crewToShow}
         
         <h5>Passengers</h5>
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