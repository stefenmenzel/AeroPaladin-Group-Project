import React, { Component } from 'react';


class PassengerList extends Component {
    render () {
        console.log('passenger list in passenger list:', this.props.passengers);
        return (
          <>
          <ul>
              {this.props.passengers.map(passenger => {
               return (
                <li className="paxPersonLI" key={passenger.id}>{passenger.firstname} {passenger.lastname}</li>
               )
              })}
              
            </ul> 
         </>
        )
    }
}

export default PassengerList
