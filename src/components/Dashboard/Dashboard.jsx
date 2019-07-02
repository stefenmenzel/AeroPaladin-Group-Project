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

    render() {
     
    return (
    <body>
        <h1 className="ui header welcome">Welcome Back, {this.props.user.username}!</h1>
        
        <div>
            <h2 className="ui header center aligned middle aligned grid">Your APIS Trips</h2>
          <div className="subHeadingDiv">
            <h3 className="ui header pendingTable"> Pending APIS </h3>
          </div>  
            <PendingTable/>
            <br/>
            <h3 className="ui header submittedTable"> Submitted APIS </h3>
            <SubmittedTable/>
            <br/>
            <h3 className="ui header submittedTable"> Historic APIS </h3>
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

