import React from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import {useStyles} from './styles';

interface UserCardProps {
  nickName: string;
}

export const UserCard: React.FunctionComponent<UserCardProps> = (props): JSX.Element => {
  const classes = useStyles();
  const {nickName} = props;

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="subtitle1" component="div">
            {nickName}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}