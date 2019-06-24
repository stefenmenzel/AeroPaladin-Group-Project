import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Input, Label} from 'semantic-ui-react';
import './RegisterPage.css';


class RegisterPage extends Component {
  state = {
    username: '',
    firstName: '',
    lastName: '',
    password: '',
    email: '',
    phoneNumber: ''
  };

  registerUser = (event) => {
    event.preventDefault();
    console.log('in registerUser');
    
    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'REGISTER',
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({type: 'REGISTRATION_INPUT_ERROR'});
    }
  } // end registerUser

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    console.log('state update: username: ', this.state.username);
    console.log('state update: firstname: ', this.state.firstName);
    console.log('state update: lastName: ', this.state.lastName);
    console.log('state update: password: ', this.state.password);
    console.log('state update: email: ', this.state.email);
    return (
      <div>
        {this.props.errors.registrationMessage && (
          <h2
            className="alert"
            role="alert"
          >
            {this.props.errors.registrationMessage}
          </h2>
        )}
        <h1 className="ui header" id="bigHead">Welcome To aeroPaladin</h1>
        <h3 className="ui header">Create An Account To Start Using aeroPaladin</h3>
        <div className="bigDiv">
        <div className="ui form">
         <div className="fields">
          <div className="field">
           <div className="ui corner labeled input">
             <Label className="userNameIn">
              <Input 
                type="text"
                placeholder="Username - Genenerally Your Email"
                onChange={this.handleInputChangeFor('username')}
                />
              <div className="ui corner label">
                <i className="asterisk icon"></i>
              </div>
             </Label>
           </div>
          </div>
          <div className="field">
           <div className="ui corner labeled input">
            <Label className="firstNameIn">
              <Input  
                type="text"
                placeholder="First Name"
                onChange={this.handleInputChangeFor('firstName')}
                />
                <div className="ui corner label">
                  <i className="asterisk icon"></i>
                </div>
            </Label>
            </div>
          </div>
          <div className="field">
           <div className="ui corner labeled input">
             <Label className="lastNameIn">
              <Input 
                type="text"
                placeholder="Last Name"
                onChange={this.handleInputChangeFor('lastName')}
                />
              <div className="ui corner label">
                <i className="asterisk icon"></i>
              </div>
             </Label>
           </div>
          </div>
          <div className="field">
           <div className="ui corner labeled input">
             <Label className="passwordIn">
              <Input 
                type="password"
                placeholder="Password"
                onChange={this.handleInputChangeFor('password')}
                />
              <div className="ui corner label">
                <i className="asterisk icon"></i>
              </div>
             </Label>
           </div>
          </div>
          <div className="field">
           <div className="ui corner labeled input">
             <Label className="emailIn">
              <Input 
                type="text"
                placeholder="Email"
                onChange={this.handleInputChangeFor('email')}
                />
              <div className="ui corner label">
                <i className="asterisk icon"></i>
              </div>
             </Label>
           </div>
          </div>
          <div className="field">
           <div className="ui corner labeled input">
             <Label className="phoneNumberIn">
              <Input 
                type="number"
                placeholder="Phone Number"
                onChange={this.handleInputChangeFor('phoneNumber')}
                />
              <div className="ui corner label">
                <i className="asterisk icon"></i>
              </div>
             </Label>
           </div>
          </div>
         </div>
         <div className="ui submit button" id="regSubmitBtn" onClick={this.registerUser}>Create New Account</div>
        </div>
        </div>
        
        
        
        
        {/* <form onSubmit={this.registerUser}>
          <h1>Register User</h1>
          <div>
            <label htmlFor="username">
              Username:
              <input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleInputChangeFor('username')}
              />
            </label>
          </div>
          <div>
            <label htmlFor="password">
              Password:
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChangeFor('password')}
              />
            </label>
          </div>
          <div>
            <input
              className="register"
              type="submit"
              name="submit"
              value="Register"
            />
          </div>
        </form> */}
       
       <center>
         <div className="ui basic buttons">
          <button 
          className="ui black basic button" 
          onClick={() => {this.props.dispatch({type: 'SET_TO_LOGIN_MODE'})}}>
            Back To Login</button>
         </div>
       </center>
       
       
       
       

      </div>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(RegisterPage);

