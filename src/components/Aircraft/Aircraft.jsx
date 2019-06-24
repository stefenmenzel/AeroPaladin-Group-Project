import React,{Component} from 'react';

class Aircraft extends Component{

    render(){
        return(
            <>
                <div className="ui right labeled left icon input">
                    <i className="tags icon"></i>
                    <input type="text" placeholder="Tail Number" />
                    <a className="ui tag label">Tail Number</a>
                </div>                
            </>
        )
    }
}

export default Aircraft;