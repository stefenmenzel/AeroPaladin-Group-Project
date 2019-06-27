import React, { Component } from 'react';

class ReviewPage extends Component {

    // componentDidMount(){
    //     this.props.dispatch({ type: 'FETCH_REVIEW', payload: this.props.match.params.id })
    // }

    handler =(id)=>{
        console.log('this is id', id);
        
    }

    render() {
        console.log('id thing', this.props.match.params.id );
        
        return (
            <div>
                {/* Review Page */}
                <button onClick={()=>this.handler(this.props.match.params.id)}>Hit me</button>
            </div>
        )
    }
}


export default ReviewPage