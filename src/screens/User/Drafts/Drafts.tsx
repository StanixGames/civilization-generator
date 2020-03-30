import React from 'react';
import {Route} from 'react-router-dom';
import Container from '@material-ui/core/Container';

import {Main} from './Main';
// import {Player} from './Player';

export function Drafts() {
  return (
    <Container component="main">
      <Route exact path="/drafts" component={Main} />
      {/* <Route path="/players/:playerId" component={Player} /> */}
    </Container>
  );
}