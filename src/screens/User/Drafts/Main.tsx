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
import {drafts} from '../../../store';
import {Draft} from '../../../types';

import {useStyles} from './styles';

export function Main() {
  const classes = useStyles();
  const [loading, setLoading] = useState<boolean>(true);
  const [draftList, setDraftList] = useState<Draft[]>([]);

  useEffect(() => {
    drafts
      .getAllByUserId('airomad7@gmail.co')
      .then((draftList) => {
        console.log('draftList',draftList)
        setDraftList(draftList);
        setLoading(false);
      });
  }, []);

  return (
    <Container component="main">
      <CssBaseline />
      {!loading && (
        <React.Fragment>
          <TableContainer component={Paper}>
            <Table className={classes.table} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Draft</TableCell>
                  <TableCell align="right">Users</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {draftList.map((draft: Draft) => (
                  <TableRow key={draft.name}>
                    <TableCell component="th" scope="row">
                      {draft.name}
                    </TableCell>
                    <TableCell align="right">
                      {draft.users.join(', ')}
                    </TableCell>
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