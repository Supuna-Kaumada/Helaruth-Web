import React, { Component } from 'react'
import fire,{database2 ,database}  from '../firebase'
import _ from 'lodash'
import  Success  from '../components/alert/Success'
export default class Enter extends Component {
  constructor(props){
   
      super(props);
      this.state={
        key:'',
        value:'',
        values:{},
        user:{},
        alert_msg:''
      };
      this.handelChange=this.handelChange.bind(this);
      this.handelSubmit=this.handelSubmit.bind(this);
  }

  handelChange(e){
    this.setState({
      [e.target.name]:e.target.value
    })
  }

  handelSubmit(e){
    e.preventDefault();
        

    const newWord={
        key:this.state.key,
        value:this.state.value
    }
    
    database2.push(newWord).then(()=>{
      //console.log("New word entered");
      this.setState({
        alert_msg:'success'
      })
    }).catch((error)=>{
      this.setState({
        alert_msg:'error'
      })
    });
    this.setState({
        key:'',
        value:'',
    });
  }

  authlistner(){
     fire.auth().onAuthStateChanged((user)=>{
        if(user){
         
          this.setState({user});
        }else{
          this.props.history.push('/login');
          this.setState({user:null});
        }
     })
  }

  componentDidMount(){
    
    this.authlistner();

    database.on('value',snapshot=>{
      this.setState({
        values:snapshot.val()
      });
    });

    
  }

  renderValue(){
    
    return _.map(this.state.values,(value,key)=>{
      return(
          <tr key={key}>
             <td>{value.request_word}</td>
             <td>{value.email}</td>
             <td><button onClick={()=>{
            
             }}>Delete</button></td>
           </tr>
      );
    });
  }

 

  render() {
    
    return (
     <div className="container">
       <div className="row">
          {this.state.alert_msg==='success'?<Success/>:null}
       </div>
     <div className="row">
      
          <div className="col-md-6 col-sm-12">
          <div class="card">
            <div className="card-header">අළුත් වචන ඇතුළත් කරන්න</div>
            <div className="card-body">
              <form onSubmit={this.handelSubmit}>
                <div className="form-group">
                  <label htmlFor="email">වචනය :</label>
                    <input type="text" className="form-control" id="email" 
                    name="key" 
                    onChange={this.handelChange}
                    value={this.state.key}
                    required/>
                </div>
                <div className="form-group">
                  <label htmlFor="pwd">අර්ථය :</label>
                    <textarea type="textarea" className="form-control" id="pwd" 
                    name="value" 
                    onChange={this.handelChange}
                    value={this.state.value}
                    required/>
                </div>
               
                <button type="submit" className="btn btn-primary" >ඇතුලත් කරන්න</button>
             
              </form>
            </div>
          </div>
          </div>
          <div className="col-md-6 col-sm-12">
          <table class="table table-striped">
         <thead>
           <tr>
             <th>Word</th>
             <th>Email</th>
             <th>Action</th>
           </tr>
         </thead>
         <tbody>
          {this.renderValue()}
          </tbody>
       </table>
       </div>
          </div> 
          </div>
     
    )
  }
}
