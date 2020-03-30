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
  onClick: () => void;
}

export const UserCard: React.FunctionComponent<UserCardProps> = (props): JSX.Element => {
  const classes = useStyles();
  const {
    data: {nickName, avatarUrl},
    onClick,
  } = props;

  return (
    <Card className={classes.card}>
      <CardActionArea onClick={onClick}>
        <CardContent className={classes.cardContent}>
          <Avatar alt={nickName} src={avatarUrl} className={classes.avatar} />
          <Typography gutterBottom variant="subtitle1" component="div">
            {nickName}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}