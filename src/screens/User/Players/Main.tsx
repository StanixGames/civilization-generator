import React, {useState, useEffect, useCallback} from 'react';
import {useHistory} from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import {UserCard} from '../../../components';
import {users} from '../../../store';
import {UserShort} from '../../../types';

import {useStyles} from './styles';

export function Main() {
  const classes = useStyles();
  const history = useHistory();
  const [loading, setLoading] = useState<boolean>(true);
  const [players, setPlayers] = useState<UserShort[]>([]);

  useEffect(() => {
    users
      .getAll()
      .then((users) => {
        setPlayers(users);
        setLoading(false);
      });
  }, []);

  const getHandlerPlayerClick = useCallback((playerId: string) => () => {
    history.push(`/players/${playerId}`);
  }, [history]);

  return (
    <Container component="main">
      <CssBaseline />
      {!loading && (
        <React.Fragment>
          <Typography>Registered users: {players.length}</Typography>
          <div className={classes.paper}>
            {players.map((player: UserShort) => (
              <UserCard
                data={player}
                onClick={getHandlerPlayerClick(player.id)}
              />
            ))}
          </div>
        </React.Fragment>
      )}
    </Container>
  );
}