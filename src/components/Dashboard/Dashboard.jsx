import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon, Label, Menu, Table } from 'semantic-ui-react';
import "./Dashboard.css";

const moment = require('moment');

class Dashboard extends Component {



   componentDidMount() {
       this.props.dispatch({ type:'FETCH_APIS_TRIPS' })
   }


    render() {
     
        return (
         <body>
           
                <pre>{JSON.stringify(this.props.apisTrips)}</pre>
                   <h2>Welcome Back {this.props.user.firstName}</h2>
                <div>
                {(this.props.apisTrips.length) ?
                <div>
                <h3 class="ptag">APIS Trips</h3>
                <div class="table">
                <table class="ui celled table">
                    <thead>
                        <tr>
                            <th>From</th>
                            <th>To</th>
                            <th>Date</th>
                            <th>Edit/Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{this.props.apisTrips[0].departure_state}</td>
                            <td>{this.props.apisTrips[0].arrival_state}</td>
                            {/* <td >{new Date(Date.parse(this.props.apisTrips[0].localarrivaltimestamp))}</td>  */}
                            <td>{moment(this.props.apisTrips[0].localarrivaltimestamp).format("MM/DD/YYYY")}</td>
                            <td ><button>Edit</button> <button>Delete</button></td>
                        </tr>
                        <tr>
                            <td>{this.props.apisTrips[1].departure_state}</td>
                            <td>{this.props.apisTrips[1].arrival_state}</td>
                            <td>{moment(this.props.apisTrips[1].localarrivaltimestamp).format("MM/DD/YYYY")}</td>
                            <td><button>Edit</button> <button>Delete</button></td>
                        </tr>
                    </tbody>
                </table>
                </div>
                </div>
                :
                <div>empty</div>
                }
                </div>
          </body>
        )
    }
}



const mapStateToProps = (reduxState) => ({
    apisTrips : reduxState.dashboardReducer,
    user: reduxState.user
})

export default connect(mapStateToProps)(Dashboard);

