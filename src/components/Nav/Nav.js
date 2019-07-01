import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import App from '../App/App'
import './Nav.css';
import { Button, Header, Icon, Image, Menu, Segment, Sidebar } from 'semantic-ui-react'



class Nav extends Component {
  state = {
    visible: false
  }
  
  toggleMenu = () => {
    this.setState({
      ...this.state,
      visible: !this.state.visible
    })
  }
    handleHideClick = () => this.setState({ visible: false })
    handleShowClick = () => this.setState({ visible: true })
    handleSidebarHide = () => this.setState({ visible: false })
    
  //   // showMenu = () => {
  //   //  console.log('in SHOWMENU');
  //   //  this.setState({
  //   //      visible: !this.state.visible })
  //   // }

   render(){
  //   console.log('state change for menu: ', this.state.visible);
     const { visible } = this.state

  

  return(
    // <>
    <div>
       <Button.Group>
         <Button disabled={visible} onClick={this.handleShowClick}>
          <Icon name='align justify' />
           </Button>
         {/* <Button disabled={!visible} onClick={this.handleHideClick}>
          </Button> */}
       </Button.Group>

       <Sidebar.Pushable as={Segment}>
         <Sidebar
           as={Menu}
           animation='overlay'
           icon='labeled'
           inverted
           onHide={this.handleSidebarHide}
           vertical
           visible={visible}
           width='thin'
         >
           <Menu.Item as='a'>
             <Icon name='home' />
             Home
            </Menu.Item>
           <Menu.Item as='a'>
             <Icon name='gamepad' />
             Games
            </Menu.Item>
           <Menu.Item as='a'>
             <Icon name='camera' />
             Channels
            </Menu.Item>
         </Sidebar>

         <Sidebar.Pusher>
           <Segment basic>
             {/* <App/> */}
           </Segment>
         </Sidebar.Pusher>
       </Sidebar.Pushable>
      </div >


  // <div className="nav">
  //   <Link to="/home">
  //     <h2 className="nav-title">aeroPaladin</h2>
  //   </Link>
  //   <div className="nav-right">
  //     <Link className="nav-link" to="/home">
  //       {/* Show this link if they are logged in or not,
  //       but call this link 'Home' if they are logged in,
  //       and call this link 'Login / Register' if they are not */}
  //       {this.props.user.id ? 'Home' : 'Login / Register'}
  //     </Link>
  //     {/* Show the link to the info page and the logout button if the user is logged in */}
  //     {this.props.user.id && (
  //       <>
  //         <Link className="nav-link" to="/apis">
  //           Create An APIS
  //         </Link>
  //         <Link className="nav-link" to="/reviewpage">
  //           Review
  //         </Link>
  //         <LogOutButton className="nav-link"/>
  //       </>
  //     )}
  //     {/* Always show this link since the about page is not protected */}

  //   </div>
  // </div>
  
    )};

      }

// Instead of taking everything from state, we just want the user
// object to determine if they are logged in
// if they are logged in, we show them a few more links 
// if you wanted you could write this code like this:
// const mapStateToProps = ({ user }) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(Nav);
