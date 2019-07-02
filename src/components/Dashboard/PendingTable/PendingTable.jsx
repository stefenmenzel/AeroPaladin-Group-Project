import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Table } from 'semantic-ui-react';

const moment = require('moment');

class PendingTable extends Component {
 
    handleEdit = (id) => {
        console.log('clicked on edit in dashboard', id)
        this.props.history.push(`/reviewpage/${id}`)
    }
 
    render(){
    // console.log('apisreducer info from pending: ', this.props.apisTrips);
     

     //conditional rending for table data
     //console.log('FLIGHT STATUS HERE', this.props.apisTrips[0]);

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
                // console.log('flight STUFF: ', trip);

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
                             <div className="ui animated button green" tabIndex="0" onClick={() => this.handleEdit(trip.id)}>
                                 <div class="visible content">Edit</div>
                                 <div class="hidden content">
                                     <i class="right arrow icon"></i>
                                </div>
                            </div> 
                             {/* <Button className="ui animated button green" tabIndex="0" onClick={() => this.handleEdit(trip.id)}>Edit</Button> */}
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