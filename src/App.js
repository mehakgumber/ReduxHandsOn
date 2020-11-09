import React, { Component } from 'react'
import './App.css'
import { Provider } from 'react-redux'
import store from './app/config/store'

import AppRouter from './app/route'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppRouter />
        {/* <Router history={history}>
          <Home />
          <Switch>
            <Route exact path="/login" component={Login} />
            <PrivateRoute
              path="/jobs"
              role={roles.CANDIDATE}
              component={AppliedJobs}
            />
            <PrivateRoute
              path="/allJobs"
              role={roles.CANDIDATE}
              component={AllJobs}
            />
            <PrivateRoute
              path="/profile"
              role={roles.CANDIDATE}
              component={Profile}
            />
            <PrivateRoute path="/admin" role={roles.ADMIN} component={Admin} />
            <Route path="*" component={Login} />
          </Switch>
        </Router> */}
      </Provider>
    )
  }
}

export default App
