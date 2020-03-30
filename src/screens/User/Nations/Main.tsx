import React, {useState, useEffect} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import {NationLabel} from '../../../components';
import {nations} from '../../../store';
import {Nation} from '../../../types';

import {useStyles} from './styles';

export function Main() {
  const classes = useStyles();
  const [loading, setLoading] = useState<boolean>(true);
  const [nationList, setNationList] = useState<Nation[]>([]);

  useEffect(() => {
    nations
      .getAll()
      .then((nationList) => {
        setNationList(nationList);
        setLoading(false);
      });
  }, []);

  return (
    <Container component="main">
      <CssBaseline />
      {!loading && (
        <React.Fragment>
          {/* <Typography>Nations: {nationList.length}</Typography> */}
          <TableContainer component={Paper}>
            <Table className={classes.table} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Nation</TableCell>
                  <TableCell align="right">Coeff</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {nationList.map((nation: Nation) => (
                  <TableRow key={nation.name}>
                    <TableCell component="th" scope="row">
                      <NationLabel
                        nation={nation.name}
                      />
                    </TableCell>
                    <TableCell align="right">{nation.coeff.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </React.Fragment>
      )}
    </Container>
  );
}