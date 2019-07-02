import React, { Component } from 'react';


class PassengerList extends Component {
    render () {
        return (
          <>
          <ul>
              {this.props.passengers.map(passenger => {
               return (
                <li key={passenger.id}>{passenger.firstname} {passenger.lastname}</li>
               )
              })}
              
            </ul> 
         </>
        )
    }
}

export default PassengerList
