import React, { Component } from 'react'
import fire from '../firebase';

export default class Login extends Component {
    constructor(props){
        super(props);
        this.state={
            email:'',
            password:''
        };
        this.handelChange=this.handelChange.bind(this);
        this.login=this.login.bind(this);
    }

    handelChange(e){
        this.setState({
          [e.target.name]:e.target.value
        })
      }
    
      login(e){
        e.preventDefault();
        fire.auth().signInWithEmailAndPassword(this.state.email,this.state.password).then((e)=>{
           // console.log('Sign in completed');
            this.props.history.push('/enter');
        }).catch((error)=>{
            console.log(error);
        })
      }
    

  render() {
    return (
        <div className="container">
        <div class="d-flex justify-content-center">
         <div className="col-md-5">
           <div class="card">
             <div className="card-header">Login</div>
             <div className="card-body">
               <form onSubmit={this.login}>
                 <div className="form-group">
                   <label for="email">Email</label>
                   <input type="email" className="form-control" id="email" 
                   name="email" 
                    value={this.state.email}
                    onChange={this.handelChange}
                   required/>
                 </div>
                 <div className="form-group">
                   <label for="pwd">Password</label>
                   <input type="password" className="form-control" id="pwd" 
                   name="password" 
                   value={this.state.password}
                   onChange={this.handelChange}
                   required/>
                 </div>
                
                 <button type="submit" className="btn btn-primary" >Submit</button>
              
               </form>
             </div>
           </div>
          
          
           </div> 
         </div>
       </div>
    )
  }
}
