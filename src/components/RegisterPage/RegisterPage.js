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
    phoneNumber: '',
    streetAddress: '', 
    city: '',
    state: '',
    postalCode: ''
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
          firstname: this.state.firstName,
          lastname: this.state.lastName,
          email: this.state.email,
          phonenumber: this.state.phoneNumber
        },
      });
      this.props.history.push('/home');
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
    // console.log('state update: username: ', this.state.username);
    // console.log('state update: firstname: ', this.state.firstName);
    // console.log('state update: lastName: ', this.state.lastName);
    // console.log('state update: password: ', this.state.password);
    // console.log('state update: email: ', this.state.email);
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
        <div className="registrationDiv">
        <div className="column">
        <h1 className="ui header middle aligned center aligned grid" id="bigHead">Welcome To aeroPaladin</h1>
        <h3 className="ui header middle aligned center aligned grid">Create An Account To Start Using aeroPaladin</h3>
        <div className="bigDiv">
        <form className="ui large form">
          
         <div className="ui stacked segment">
          <h5 className="ui header middle aligned center aligned grid">User Information</h5>
          <div className="field">
           <div className="ui corner labeled input userNameIn">
             <Label className="userNameIn">
              <Input 
                type="text"
                placeholder="Username"
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

        <h5 className="ui header middle aligned center aligned grid addHead">Address Information</h5>
        {/* street address in input */}
        <div className="field">
           <div className="ui corner labeled input streetAddrIn">
             <Label className="streetAddrIn">
              <Input 
                type="text"
                placeholder="Street Address"
                onChange={this.handleInputChangeFor('streetAddress')}
                />
              <div className="ui corner label">
                <i className="asterisk icon"></i>
              </div>
             </Label>
           </div>
          </div> 
         {/* city in input */}
         <div className="field">
           <div className="ui corner labeled input">
             <Label className="cityIn">
              <Input 
                type="text"
                placeholder="City"
                onChange={this.handleInputChangeFor('city')}
                />
              <div className="ui corner label">
                <i className="asterisk icon"></i>
              </div>
             </Label>
           </div>
          </div>
        <div className="ui select input">
          <select class="ui search dropdown" onChange={this.handleInputChangeFor('state')}>
          <option value="">State</option>
          <option value="AL">Alabama</option>
          <option value="AK">Alaska</option>
          <option value="AZ">Arizona</option>
          <option value="AR">Arkansas</option>
          <option value="CA">California</option>
          <option value="CO">Colorado</option>
          <option value="CT">Connecticut</option>
          <option value="DE">Delaware</option>
          <option value="DC">District Of Columbia</option>
          <option value="FL">Florida</option>
          <option value="GA">Georgia</option>
          <option value="HI">Hawaii</option>
          <option value="ID">Idaho</option>
          <option value="IL">Illinois</option>
          <option value="IN">Indiana</option>
          <option value="IA">Iowa</option>
          <option value="KS">Kansas</option>
          <option value="KY">Kentucky</option>
          <option value="LA">Louisiana</option>
          <option value="ME">Maine</option>
          <option value="MD">Maryland</option>
          <option value="MA">Massachusetts</option>
          <option value="MI">Michigan</option>
          <option value="MN">Minnesota</option>
          <option value="MS">Mississippi</option>
          <option value="MO">Missouri</option>
          <option value="MT">Montana</option>
          <option value="NE">Nebraska</option>
          <option value="NV">Nevada</option>
          <option value="NH">New Hampshire</option>
          <option value="NJ">New Jersey</option>
          <option value="NM">New Mexico</option>
          <option value="NY">New York</option>
          <option value="NC">North Carolina</option>
          <option value="ND">North Dakota</option>
          <option value="OH">Ohio</option>
          <option value="OK">Oklahoma</option>
          <option value="OR">Oregon</option>
          <option value="PA">Pennsylvania</option>
          <option value="RI">Rhode Island</option>
          <option value="SC">South Carolina</option>
          <option value="SD">South Dakota</option>
          <option value="TN">Tennessee</option>
          <option value="TX">Texas</option>
          <option value="UT">Utah</option>
          <option value="VT">Vermont</option>
          <option value="VA">Virginia</option>
          <option value="WA">Washington</option>
          <option value="WV">West Virginia</option>
          <option value="WI">Wisconsin</option>
          <option value="WY">Wyoming</option>
        </select>
        </div>
        <div className="field">
           <div className="ui corner labeled input">
             <Label className="zipIn">
              <Input 
                type="text"
                placeholder="Postal Code"
                onChange={this.handleInputChangeFor('postalCode')}
                />
              <div className="ui corner label">
                <i className="asterisk icon"></i>
              </div>
             </Label>
           </div>
          </div>
         </div>
         <div className="ui submit button" id="regSubmitBtn" onClick={this.registerUser}>Create New Account</div>
        </form>
        </div>
        </div>
       
       <center>
         <div className="ui basic buttons">
          <button 
          className="ui grey basic button" 
          onClick={() => {this.props.dispatch({type: 'SET_TO_LOGIN_MODE'})}}>
            Back To Login</button>
         </div>
       </center>
       
       
       
       
       </div>
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