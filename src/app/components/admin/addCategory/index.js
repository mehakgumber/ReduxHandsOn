import React, { Component } from 'react'
import AdminHome from '../adminHome'

import { serverName, baseUrl } from '../../../config/server'

class AddCategory extends Component {
  constructor() {
    super()
    this.state = {
      category: ''
    }
  }

  addCategory() {
    console.log('called', this.state.category)
    let params = {
      method: 'post',
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'appication/json'
      },
      redirect: 'follow',
      referrer: 'no-referrer',
      body: JSON.stringify({ category: this.state.category })
    }
    console.log(params)
    return fetch(`${serverName}${baseUrl}/admin/addCategories`, params)
      .then(data => alert(data))
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div>
        <AdminHome />
        <div className="container">
          <label htmlFor="add">Add Category</label>
          <input
            type="text"
            id="add"
            value={this.state.category}
            className="form-control"
            onChange={event => this.setState({ category: event.target.value })}
          />
          <button
            className="btn btn-primary"
            onClick={() => this.addCategory()}
          >
            Add Category
          </button>
        </div>
      </div>
    )
  }
}

export default AddCategory
