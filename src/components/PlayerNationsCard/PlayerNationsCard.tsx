import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {NationFlag} from '../../res';
import {Nation} from '../../types';
import {NationLabel} from '../NationLabel';
import {useStyles} from './styles';

interface PlayerNationsCardProps {
  name: string;
}

export const PlayerNationsCard: React.FunctionComponent<PlayerNationsCardProps> = (props) => {
  const { name } = props;
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {name}
        </Typography>
        <div>
          <NationLabel nation='english' />
          <NationLabel nation='english' />
          <NationLabel nation='english' />
          <NationLabel nation='english' />
          <NationLabel nation='english' />
          <NationLabel nation='english' />
        </div>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          Copy as text
        </Button>
      </CardActions>
    </Card>
  );
}