import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Icon, Label, Menu, Table } from 'semantic-ui-react';
import PendingTable from '../Dashboard/PendingTable/PendingTable.jsx';
import "./Dashboard.css";

const moment = require('moment');

class Dashboard extends Component {

    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_APIS_TRIPS' })
    }

    //    handleDelete = (idToDelete) => {
    //        console.log('clicked on delete in dashboard', idToDelete)
    //        this.props.dispatch({type:'DELETE_APIS_TRIPS', payload:{id:idToDelete} })
    //    }
    handleEdit = (id) => {
        console.log('clicked on edit in dashboard', id)
        this.props.history.push(`/reviewpage/${id}`)
    }

    render() {
       // console.log('apisreducer info: ', this.props.apisTrips);
        // console.log('user reducer info: ', this.props.user);
        // console.log('login reducer info: ', this.props.login);
        let submitedData;
        let historicData;

    
    



    return (
    <body>
        <h2 className="ui header welcome">Welcome Back, {this.props.user.username}!</h2>
        
        <div>
            <h2 className="ui header center aligned middle aligned grid">APIS Trips</h2>
            <h4 className="ui header pendingTable"> Pending APIS </h4>
            <PendingTable/>
            
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
                    return (
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
                        </Table.Body>

                    )
                })}

            </Table>
        </div>
    </body>
    )
    }
}




const mapStateToProps = (state) => ({
    apisTrips: state.dashboardReducer,
    user: state.user,
    login: state.loginModeReducer
})

export default withRouter(connect(mapStateToProps)(Dashboard));

