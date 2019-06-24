import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import { connect } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

import Dashboard from '../Dashboard/Dashboard'
import CreateNewApis from '../CreateNewApis/CreateNewApis'
import AddAircraftForm from '../AddAircraftForm/AddAircraftForm'
import AddPassengerForm from '../AddPassengerForm/AddPassengerForm'
import AddCrewForm from '../AddCrewForm/AddCrewForm'
import ReviewPage from '../ReviewPage/ReviewPage/ReviewPage'
import CrewInfo from '../CrewInfo/CrewInfo'
import AirCraftInfo from '../AirCraftInfo/AirCraftInfo'
import UserInfo from '../UserInfo/UserInfo'
import PassengerInfo from '../PassengerInfo/PassengerInfo'


import './App.css';

class App extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_USER' })
  }

  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />

            {/*  Protected route for the Dashboard View */}
            <ProtectedRoute
              exact
              path="/home"
              component={Dashboard}
            />

            {/* Protected route for creating new APIS View  */}
            <ProtectedRoute
              exact
              path="/apis"
              component={CreateNewApis}
            />

            {/* Protected route for Review APIS View */}
            <ProtectedRoute
              exact
              path="/reviewpage"
              component={ReviewPage}
            />

            {/*  Adding new flight info starts here */}
            {/* Protected route for adding new aircraft */}
            <ProtectedRoute
              exact
              path="/addaircraft"
              component={AddAircraftForm}
            />

            {/* Protected route for adding new crew member */}
            <ProtectedRoute
              exact
              path="/addcrew"
              component={AddCrewForm}
            />

            {/* Protected route for adding new passenger  */}
            <ProtectedRoute
              exact
              path="/addpassenger"
              component={AddPassengerForm}
            />
            {/*  Adding new flight info ends here */}

            {/*  User, Crew, Aircraft & Passenger information view from Nav Starts Here */}
            {/*  Protected route to see User Information View from Nav */}
            <ProtectedRoute
              exact
              path="/userinfo"
              component={UserInfo}
            />

            {/*  Protected route to see Passenger Information View from Nav */}
            <ProtectedRoute
              exact
              path="/passengerinfo"
              component={PassengerInfo}
            />

            {/*  Protected route to see Crew Member Information View from Nav */}
            <ProtectedRoute
              exact
              path="/crewinfo"
              component={CrewInfo}
            />

            {/*  Protected route to see Aircraft Details Information View from Nav */}
            <ProtectedRoute
              exact
              path="/aircraftinfo"
              component={AirCraftInfo}
            />
            {/*  User, Crew & Passenger information from Nav Ends Here */}


            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
          <Footer />
        </div>
      </Router>
    )
  }
}

export default connect()(App);

