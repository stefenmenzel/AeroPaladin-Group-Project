import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Table } from 'semantic-ui-react';
import PendingTable from '../Dashboard/PendingTable/PendingTable.jsx';
import SubmittedTable from './SubmittedTable/SubmittedTable.jsx';
import HistoricTable from './HistoricTable/HistoricTable.jsx';
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
        <h2 className="ui header welcome">Welcome Back, {this.props.user.username}!</h2>
        
        <div>
            <h2 className="ui header center aligned middle aligned grid">APIS Trips</h2>
            <h4 className="ui header pendingTable"> Pending APIS </h4>
            <PendingTable/>
            <br/>
            <h4 className="ui header submittedTable"> Submitted APIS </h4>
            <SubmittedTable/>
            <br/>
            <h4 className="ui header submittedTable"> Historic APIS </h4>
            <HistoricTable/>
        </div>
        <br/>
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

