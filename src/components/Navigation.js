import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import fire from '../firebase'

export default class Navigation extends Component {
  
  constructor(props){
    super(props);
    this.state={
      user:{}
    };
    this.logOut=this.logOut.bind(this);
  }

  //@desc : function to logout
  logOut(){
    fire.auth().signOut()
    .then(()=>{
      console.log("Sign out completed");
    })
    .catch((error)=>{
      console.log(error);
    })
  }

   //@desc : function to check authentications
  authlistner(){
    fire.auth().onAuthStateChanged((user)=>{
       if(user){
        
         this.setState({user});
       }else{
        
         this.setState({user:null});
       }
    })
 }

 componentDidMount(){
  this.authlistner();
 }

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to="/" className="navbar-brand">හෙලරුත්</Link>
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
              <li className="nav-item active">
                <Link to="/enter" className="nav-link" >Enter <span className="sr-only">(current)</span></Link>
              </li>
              <li className="nav-item">
                <Link to="/request" className="nav-link" href="#">Request</Link>
              </li>
              <li className="nav-item">
                <Link to="/" className="nav-link disabled" href="#">Disabled</Link>
              </li>
            </ul>
            <div className="form-inline my-2 my-lg-0">
              {this.state.user!=null?
              (<button className="btn btn-outline-success my-2 my-sm-0" type="button" onClick={this.logOut}>Logout</button>
              ):(<Link to="/login">
              <button className="btn btn-outline-success my-2 my-sm-0" type="button">login</button>
              </Link>)
            }
          
              </div>
          </div>
        </nav>
      </div>
    )
  }
}
