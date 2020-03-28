import React, {useState, useEffect} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import {UserCard} from '../../../components';
import {users} from '../../../store';
import {UserShort} from '../../../types';

import {useStyles} from './styles';

export function Players() {
  const classes = useStyles();
  const [players, setPlayers] = useState<UserShort[]>([]);

  useEffect(() => {
    users
      .getAll()
      .then((users) => {
        setPlayers(users);
      });
  }, []);

  return (
    <Container component="main">
      <CssBaseline />
      <Typography>Registered users: {players.length}</Typography>
      <div className={classes.paper}>
        {players.map((player: UserShort) => (
          <UserCard
            data={player}
          />
        ))}
      </div>
    </Container>
  );
}