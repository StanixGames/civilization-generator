import React, {useState, FunctionComponent, useEffect} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
// import Skeleton from '@material-ui/lab/Skeleton';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';

import {users} from '../../../../store';
import {UserShort} from '../../../../types';

import {useStyles} from './styles';

interface PlayerProps {
  match: {
    params: {
      playerId: string;
    }
  }
}

export const Player: FunctionComponent<PlayerProps> = (props) => {
  const classes = useStyles();
  const [loading, setLoading] = useState<boolean>(true);
  const [userData, setUserData] = useState<UserShort | null>(null);
  const {match: {params: {playerId}}} = props;

  useEffect(() => {
    users
      .getDataByEmail(playerId)
      .then((userData: UserShort | null) => {
        setUserData(userData);
        setLoading(false);
      });
  }, []);

  return (
    <Container component="main">
      <CssBaseline />
      {!loading && userData && (
        <React.Fragment>
          <Card className={classes.infoCard}>
            <CardContent className={classes.infoContent}>
              <Avatar
                alt={userData.nickName}
                src={userData.avatarUrl}
                className={classes.avatar}
              />
              <Typography
                gutterBottom
                variant="h5"
                component="h6"
                className={classes.infoTitle}
              >
                {userData.nickName}
              </Typography>
            </CardContent>
          </Card>
        </React.Fragment>
      )}
      {/* {loading && (
        <React.Fragment>
          <Skeleton animation="wave" className={classes.infoSkeleton} />
        </React.Fragment>
      )} */}
    </Container>
  );
}