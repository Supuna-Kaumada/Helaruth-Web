import React, { Component } from 'react'


export default class Success extends Component {
  render() {
    return (
    <div className="col-md-12">
        <div class="alert alert-success alert-dismissible">
            <button type="button" class="close" data-dismiss="alert">&times;</button>
            <strong>Success!</strong> Data saved.
        </div>
      </div>
    )
  }
}
