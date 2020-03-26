import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import {SignIn} from './SignIn';
import {SignUp} from './SignUp';

export function Guest() {
  return (
    <React.Fragment>
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SignUp} />
    </React.Fragment>
  );
}