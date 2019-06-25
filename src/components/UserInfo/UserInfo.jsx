import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Button } from 'semantic-ui-react'

import './UserInfo.css'

class UserInfo extends Component {

    handleCrewPage = () => {
        this.props.history.push("/crewinfo")
    }

    handlePassengerPage = () => {
        this.props.history.push("/passengerinfo")
    }

    handleAircraftPage = () => {
        this.props.history.push("/aircraftinfo")
    }

    render() {
        return (
            <div>
                <div>
                <h1>User Information</h1>
                    <p> User Name: {this.props.user.username}</p>
                    <p> First Name: {this.props.user.firstname}</p>
                    <p> Last Name: {this.props.user.lastname}</p>
                    <p> Email: {this.props.user.email}</p>
                    <p> Phone Number: {this.props.user.phonenumber}</p>

            </div>
            <div className= "userButtons">
                <div>
                    <Button className="ui button" onClick={this.handleCrewPage}>Crew</Button>
                </div>
                <div>
                    <Button className="ui button" onClick={this.handlePassengerPage}>Passenger</Button>
                </div>
                <div>
                    <Button className="ui button" onClick={this.handleAircraftPage}>Aircraft</Button>
                </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return {
        user: reduxState.user
    }
}

export default connect(mapStateToProps)(UserInfo)