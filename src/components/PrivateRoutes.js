import React from 'react'

import { Route, Redirect } from 'react-router-dom'
import { isAuthenticated } from './helper'
//if you want render single component use component:Component else use children as paramter

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(
        props, //path="/signin" exact component={Signin} to pass this properties in AdminRoute component we use props
      ) =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  )
}

export default PrivateRoute
