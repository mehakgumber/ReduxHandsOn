import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({
  component: Component,
  isLoggedIn,
  role,
  expectedRole,
  ...rest
}) => {
  console.log('Inside private route', isLoggedIn, ' ', expectedRole)
  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn && role === expectedRole ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  )
}

export default PrivateRoute
