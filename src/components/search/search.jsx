import React, { Component } from 'react'
import {database2} from '../../firebase'
import _ from 'lodash'

export default class Search extends Component {
  constructor(props){
    super(props);
    this.state={
      suggestion:'',
      values:{}   ,
      words:[]
    }
    this.handleOnChange=this.handleOnChange.bind(this);
  }

  handleOnChange(e){
    const text=e.target.value;
    
    this.setState({
      suggestion:e.target.value,
    });
  
    console.log(this.state.suggestion);

  }

  componentDidMount(){
/*  database2.orderByChild("key").on('value',snapshot=>{
      this.setState({
        values:snapshot.val()
        
      });
    });
*/
    var wordsRef =database2;
    wordsRef.on('value',(snapshot)=>{
      let words = snapshot.val();
      let newState=[];

      for(let word in words){
        newState.push({
          keyid:word,
          key:words[word].key,
          value:words[word].value
          
        })
      }
      this.setState({
        words:newState
      })


    })


  }

 /* renderValue(){
    return _.map(this.state.values,(value,key)=>{
      return(
        <div className='list-group-item list-group-item-action border=1' key={key}>{value.key}</div>
      );
    });
  }*/
  

  render() {
    const wordlist= this.state.words
    var list= wordlist.filter(wordsu=>{
      return wordsu.key.indexOf(this.state.suggestion) >= 0 
    })
    .map(wordsli=>{
      console.log('key',wordsli.key)
      console.log('value',wordsli.value)
      return(
        <div className='list-group-item list-group-item-action border=1' key={wordsli.keyid}>{wordsli.key}</div>
      );
    })



    return (
        <div className="container mt-3">
            <div className="d-flex justify-content-center mb-3 text-center">
                <div className="p-2 col-lg-8">
                    <form >
        
                    <div className="row">
                    
                      <div className="col-md-10">
                          <input type="text" className="form-control" id="search" placeholder="වචනය ඇතුලත් කරන්න" name="uname"
                          onChange={this.handleOnChange}
                          required/>
                      </div>
                      
                      <div className="col-md-2">
                          <button type="submit" className="btn btn-primary" id="clickButton">සොයන්න</button>
                      </div>
                      <div className="col-md-10"  id="serach-box">
                        <div className="list-group" id="show-list">
                      
                         {list}
                        
                        </div>
                      </div>   
                    </div> 
                  </form>
            </div>
          </div>
        </div>
    )
  }
}
