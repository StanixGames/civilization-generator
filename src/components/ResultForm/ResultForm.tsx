import * as React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import {Player, AI} from '../../types';
import {NationLabel} from '../NationLabel';
import {useStyles} from './styles';

interface ResultFormProps {
  players: Player[];
  AIs: AI[];
  onNewRandom: () => void;
}

export const ResultForm: React.FunctionComponent<ResultFormProps> = (props) => {
  const { players, AIs, onNewRandom } = props;
  // console.log(AIs);
  // console.log(players);
  const classes = useStyles();

  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Player</TableCell>
              <TableCell>Nations</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {players.map(({ name, nations }) => (
              <TableRow key={name}>
                <TableCell component="th" scope="row">
                  {name}
                </TableCell>
                <TableCell>{nations.sort((a, b) => b.coef - a.coef).map((nation) => (
                  nation && nation.nation ? (
                    <NationLabel key={nation.nation} nation={nation.nation} extraLabel={`(${nation.coef.toFixed(2)}/10)`} />
                  ) : (
                    <div>----</div>
                  )
                ))}</TableCell>
              </TableRow>
            ))}
            {AIs.map(({ name, nation, coef }) => (
              <TableRow key={name}>
                <TableCell component="th" scope="row">
                  {name}
                </TableCell>
                <TableCell>
                  {nation ? (
                    <NationLabel nation={nation} extraLabel={`(${coef.toFixed(2)}/10)`} />
                  ) :(
                    <div>----</div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className={classes.buttons}>
        <Button
          onClick={onNewRandom}
          className={classes.button}
        >New Random
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {}}
          className={classes.button}
        >Copy as text
        </Button>
    </div>
  </div>
  );
}