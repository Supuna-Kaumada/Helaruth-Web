import React, { Component } from 'react'
import {database} from '../firebase'
import _ from 'lodash'
export default class Home extends Component {
  constructor(props){
      super(props);
      this.state={
        email:'',
        request_word:'',
        values:{}
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
    const wordReq={
      email:this.state.email,
      request_word:this.state.request_word
    }

    database.push(wordReq)
    .then(()=>{
      alert("Data Saved");
    })
    .catch((error)=>{
      alert(error);
    });

    this.setState({
      email:'',
      request_word:''
    });
    
  }

  componentDidMount(){
    database.on('value',snapshot=>{
      this.setState({
        values:snapshot.val()
      });
    });
  }

  renderValue(){
    return _.map(this.state.values,(value,key)=>{
      return(
        <div key={key}>
          <h4>{value.email}</h4>
          <p>{value.request_word}</p>
        </div>
      );
    });
  }

  render() {
    return (
      <div className="container">
       <div className="d-flex justify-content-center">
      <div className="col-md-8">
      <div class="card">
            <div className="card-header">වචනයක් ඉල්ලන්න</div>
            <div className="card-body">
              <form onSubmit={this.handelSubmit}>
                <div className="form-group">
                  <label for="email">විද්යුත් තැපැල් ලිපිනය :</label>
                  <input type="email" className="form-control" id="email" 
                  name="email" 
                  onChange={this.handelChange}
                  value={this.state.email}
                  required/>
                </div>
                <div className="form-group">
                  <label for="pwd">වචනය ඉල්ලන්න :</label>
                  <input type="text" className="form-control" id="pwd" 
                  name="request_word" 
                  onChange={this.handelChange}
                  value={this.state.request_word}
                  required/>
                </div>
                <button type="submit" className="btn btn-primary">ඉල්ලීමක් කරන්න</button>
              </form>
              </div>
           
          </div>
         
         
         
      </div>
      </div>
      </div>
    )
  }
}
