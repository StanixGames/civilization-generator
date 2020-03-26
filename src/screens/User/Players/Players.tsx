import React, {useState, useEffect} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import {UserCard} from '../../../components';
import {users} from '../../../store';

import {useStyles} from './styles';

const getUsersCount = async (onSetUsersCount: (number: number) => void) => {
  const nextUsersCount = await users.getSize();
  onSetUsersCount(nextUsersCount);
}

export function Players() {
  const classes = useStyles();
  const [usersCount, setUsersCount] = useState<number>(0);

  useEffect(() => {
    //getUsersCount(setUsersCount);
  }, []);

  return (
    <Container component="main">
      <CssBaseline />
      <Typography>Registered users: {usersCount}</Typography>
      <div className={classes.paper}>
        <UserCard nickName="Test" />
        <UserCard nickName="Test" />
        <UserCard nickName="Test" />
        <UserCard nickName="Test" />
        <UserCard nickName="Test" />
        <UserCard nickName="Test" />
      </div>
    </Container>
  );
}