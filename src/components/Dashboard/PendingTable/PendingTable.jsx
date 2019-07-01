import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Icon, Label, Menu, Table } from 'semantic-ui-react';

const moment = require('moment');

class PendingTable extends Component {
 
 conditionalTable = () => {
     let pendingData;
      this.props.apisTrips.map(trip => {
        console.log('flight STUFF: ', trip);
        
        return((trip.flight_status == 2) ? <p>INFO HERE</p> : <p>FAILED</p>)
        
        
        
        // console.log('trip here:', trip) 
        // if(trip.flight_status ){
        //     console.log('inside conditional');
            
             
        //     return   <p>PENDING DATA</p>
             
        //  }
        //  else{
        //     return <p> failed </p>
        //  }
         
     })
 }
 
 
    render(){
     console.log('apisreducer info from pending: ', this.props.apisTrips);
     

     //conditional rending for table data
     console.log('FLIGHT STATUS HERE', this.props.apisTrips[0]);

    //  {this.props.apisTrips.map(trip => {
    //     console.log('trip here:', trip) 
    //     if(trip.flight_status == 2){
    //         console.log('inside conditional');
            
    //         pendingData = (
    //              <p>PENDING DATA</p>
    //          )
    //      }
    //      else{
    //          pendingData= (
    //          <p> failed </p>)
    //      }
    //     return pendingData
    //  })}

     return(
         
        <div>
             <Table className="pendingTable" celled padded>
                 <Table.Header>
                     <Table.Row>
                         <Table.HeaderCell singleLine>FROM</Table.HeaderCell>
                         <Table.HeaderCell>TO</Table.HeaderCell>
                         <Table.HeaderCell>DATE</Table.HeaderCell>
                         <Table.HeaderCell>EDIT</Table.HeaderCell>
                     </Table.Row>
                 </Table.Header>
                

             {this.props.apisTrips.map(trip => {
                 console.log('flight STUFF: ', trip);

             return((trip.flight_status == 2) ? 
             <Table.Body key={trip.flight_id}>
                <Table.Row>
                    <Table.Cell className={"departureInfoCell"}>
                        {trip.departureairportcity}, {trip.departurecountrycode} Description: ({trip.departureairportdesc}) 
                    </Table.Cell>
                    <Table.Cell className={"inboundInfoCell"}>
                        {trip.inboundairportcity}, {trip.inboundcountrycode} Description: ({trip.inboundaiportdesc})
                    </Table.Cell>
                    <Table.Cell className={"timeCell"}>
                        {moment(trip.localarrivaltimestamp).format("MM/DD/YY")} at {moment(trip.arrivaltimestamp).format('LT')}
                    </Table.Cell>
                    <Table.Cell>
                        <button onClick={() => this.handleEdit(trip.flight_id)}>Edit</button>
                    </Table.Cell>
                </Table.Row>
             </Table.Body> : <p></p>)})}
         </Table>
         </div>
     )
 }
    
}

const mapStateToProps = (state) => ({
    apisTrips: state.dashboardReducer,
    user: state.user,
    login: state.loginModeReducer
})

export default withRouter(connect(mapStateToProps)(PendingTable));