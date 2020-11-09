import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { doLogin } from '../../actions/authaction'
import Header from '../Header'
import * as roles from '../../config/roles'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: 'test@admin.com',
      password: 'admin'
    }
    this.onPressLogin = this.onPressLogin.bind(this)
  }

  componentWillMount() {
    if (this.props.isLoggedIn) {
      switch (this.props.expectedRole) {
        case roles.ADMIN:
          this.props.history.push('/admin')
          break
        case roles.CANDIDATE:
          this.props.history.push('/jobs')
          break
        case roles.INTERVIEWER:
          this.props.history.push('/interviewer')
          break
        default:
          break
      }
    }
  }

  componentWillUpdate(nextProps) {
    if (nextProps.isLoggedIn) {
      console.log('next props', nextProps)
      switch (nextProps.expectedRole) {
        case roles.ADMIN:
          this.props.history.push('/admin')
          break
        case roles.CANDIDATE:
          console.log('login redirection')
          this.props.history.push('/jobs')
          break
        case roles.INTERVIEWER:
          console.log('redirecting')
          this.props.history.push('/interviewer')
          break
        default:
          break
      }
    }
  }

  // componentDidMount() {
  //   console.log('login mounted with', this.props.isLoggedIn, ' status')
  //   if (this.props.isLoggedIn) {
  //     this.props.history.push('/jobs')
  //   }
  // }

  // componentDidUpdate() {
  //   console.log('Login updated', this.props.isLoggedIn, ' status')
  //   if (this.props.isLoggedIn) {
  //     this.props.history.push('/jobs')
  //   }
  // }

  onPressLogin(event) {
    event.preventDefault()
    this.props.doLogin(this.state.email, this.state.password)
  }

  render() {
    return (
      <div>
        <Header title="Login" />
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '80vh'
          }}
        >
          <form name="login-form" className="text-center">
            <div className="panel panel-primary" style={{ maxWidth: '650px' }}>
              <div className="panel panel-heading">
                <h3 className="panel-title">Log In</h3>
              </div>
              <div className="panel-body">
                <div className="row">
                  <label className="col-sm-2 control-label">Email</label>
                  <div className="col-sm-10 text-left">
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.email}
                      onChange={event =>
                        this.setState({ email: event.target.value })
                      }
                    />
                  </div>
                </div>
                <div>
                  <div className="row">
                    <label className="col-sm-2 control-label">Password</label>
                    <div className="col-sm-10">
                      <input
                        type="password"
                        className="form-control"
                        value={this.state.password}
                        onChange={event =>
                          this.setState({ password: event.target.value })
                        }
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={event => this.onPressLogin(event)}
                    className="btn btn-primary"
                  >
                    Login
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.LoginData.isLogin,
  expectedRole: state.LoginData.role
})

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ doLogin }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
