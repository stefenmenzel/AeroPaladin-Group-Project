import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Icon, Label, Menu, Table } from 'semantic-ui-react';
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

        return (
         <body>
           
                <pre>{JSON.stringify(this.props.apisTrips)}</pre>

                <h2>Welcome Back User</h2>

                <div>
                    <h3>APIS Trips</h3>
                    <Table className="table" celled padded>
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

                                        <Table.Cell >
                                            {trip.departure_state}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {trip.arrival_state}
                                        </Table.Cell>
                                        <Table.Cell >
                                            {moment(trip.localarrivaltimestamp).format("MM/DD/YYYY")}
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




const mapStateToProps = state => ({
    apisTrips: state.dashboardReducer

})

export default withRouter(connect(mapStateToProps)(Dashboard));

