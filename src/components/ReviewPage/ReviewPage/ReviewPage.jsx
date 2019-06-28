import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReviewItems from '../ReviewItems/ReviewItems.jsx';
class ReviewPage extends Component {

    componentDidMount(){
         this.props.dispatch({ type: 'FETCH_REVIEW', payload: this.props.match.params.id })  
    }

    handler =(id)=>{
        console.log('this is id', id);
        
    }

    render() {
        console.log('id thing', this.props.match.params.id );
        console.log('review page state is HERE: ', this.props.review);
        
        return (
            <div>
                {/* Review Page */}
                <ReviewItems />
                <button onClick={()=>this.handler(this.props.match.params.id)}>Hit me</button>

            </div>
        )
    }
}

const mapStateToProps = (reduxState) => ({
    review: reduxState.reviewReducer
})


export default connect(mapStateToProps)(ReviewPage);