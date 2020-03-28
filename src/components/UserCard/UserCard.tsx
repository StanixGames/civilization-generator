import React from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';

import {UserShort} from '../../types';
import {useStyles} from './styles';

interface UserCardProps {
  data: UserShort;
}

export const UserCard: React.FunctionComponent<UserCardProps> = (props): JSX.Element => {
  const classes = useStyles();
  const {data: {nickName, avatarUrl}} = props;

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardContent>
          <Avatar alt={nickName} src={avatarUrl} className={classes.avatar} />
          <Typography gutterBottom variant="subtitle1" component="div">
            {nickName}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}