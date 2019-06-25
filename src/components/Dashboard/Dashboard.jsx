import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon, Label, Menu, Table } from 'semantic-ui-react';
import "./Dashboard.css";

class Dashboard extends Component {
   componentDidMount() {
       this.props.dispatch({ type:'FETCH_APIS_TRIPS' })
   }
    render() {
        return (
            <div>
                <pre>{JSON.stringify(this.props.apisTrips)}</pre>
                <div>
                   <h2>Welcome Back Tom</h2>
                </div>
                <p> APIS Trips</p>
                <table class="ui celled table">
                    <thead class="">
                        <tr class="">
                            <th class="">From</th>
                            <th class="">To</th>
                            <th class="">Date</th>
                            <th class="">Edit/Delete</th>
                        </tr>
                    </thead>
                    <tbody class="">
                        <tr class="">
                            <td >Cell</td>
                            <td >Cell</td>
                            <td >Cell</td>
                            <td ><button>Edit</button> <button>Delete</button></td>
                        </tr>
                        <tr class="">
                            <td >Cell</td>
                            <td >Cell</td>
                            <td >Cell</td>
                            <td ><button>Edit</button> <button>Delete</button></td>
                        </tr>
                    </tbody>
                </table>
                
            </div>
        )
    }
}


const mapStateToProps = state => ({
    apisTrips : state.dashboardReducer
})

export default connect(mapStateToProps)(Dashboard);