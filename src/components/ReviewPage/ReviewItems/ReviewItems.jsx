import React, { Component } from 'react';
import { connect } from 'react-redux';

class ReviewItems extends Component {
    render() {
       return (
           <p>Review Item goes here</p>
       )
    }
}

const mapStateToProps = state => ({
    state
});

export default connect(mapStateToProps)(ReviewItems);