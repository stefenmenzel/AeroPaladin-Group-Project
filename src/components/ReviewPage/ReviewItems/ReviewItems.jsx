import React, { Component } from 'react';
import { connect } from 'react-redux';

class ReviewItems extends Component {
    render() {
       return (
           <h2>Review APIS</h2>
       )
    }
}

const mapStateToProps = state => ({
    state
});

export default connect(mapStateToProps)(ReviewItems);