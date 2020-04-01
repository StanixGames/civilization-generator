import React, {useState, useEffect, useCallback} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import {useUser} from '../../../hooks';
import {NationLabel, RatingStars} from '../../../components';
import {nations, users} from '../../../store';
import {Nation} from '../../../types';

import {useStyles} from './styles';

// const labels: { [index: string]: string } = {
//   1: 'Useless',
//   2: 'Useless+',
//   3: 'Poor',
//   4: 'Poor+',
//   5: 'Ok',
//   6: 'Ok+',
//   7: 'Good',
//   8: 'Good+', 
//   9: 'Excellent',
//   10: 'Excellent+',
// };

export function Main() {
  const classes = useStyles();
  const user = useUser();
  const [loading, setLoading] = useState<boolean>(true);
  const [nationList, setNationList] = useState<Nation[]>([]);
  const [ratingEditable, setRatingEditable] = useState<boolean>(false);
  const [ratings, setRatings] = useState<any>({});
  const [draftRatings, setDraftRatings] = useState<any>({});

  useEffect(() => {
    nations
      .getAll()
      .then((nationList) => {
        setNationList(nationList);
        setLoading(false);
      });

    if (user) {
      users
        .getUserAllRatings(user.id)
        .then((ratingsList: Nation[]) => {
          const obj: any = {};
          ratingsList.forEach((nation) => {
            obj[nation.name] = nation.coeff;
          });
          console.log(ratingsList);
          setRatings(obj);
        });
    } else {
      // TODO: bad session
    }
  }, [user]);

  // console.log(draftRatings, '---', ratings)

  const handleSetDraftRating = useCallback((nation: string, rating: number) => {
    const nextDraftRatings = {
      ...draftRatings,
      [nation]: rating,
    }
    setDraftRatings(nextDraftRatings);
  }, [draftRatings, setDraftRatings]);

  const handleToggleUpdate = useCallback(() => {
    const nextRatingEditable = !ratingEditable;

    if (ratingEditable) {
      const ratingsList = [];
      for (let k in draftRatings) {
        if (draftRatings.hasOwnProperty(k)) {
          ratingsList.push({
            nation: k,
            rating: draftRatings[k],
          });
        }
      }

      if (user) {
        users.updateUserAllRatings(user.id, ratingsList)
          .then((status) => {
            console.log('status', status);
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        // TODO: bad session
      }
    }

    setRatingEditable(nextRatingEditable);
  }, [user, draftRatings, ratingEditable, setRatingEditable]);

  return (
    <Container component="main">
      <CssBaseline />
      {!loading && (
        <React.Fragment>
          <Button 
            variant={ratingEditable ? "contained" : "outlined"}
            color="primary"
            onClick={handleToggleUpdate}
            className={classes.updateButton}
          >
            {ratingEditable ? 'Save ratings' : 'Update ratings'}
          </Button>
          <TableContainer component={Paper}>
            <Table className={classes.table} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Nation</TableCell>
                  <TableCell align="right">Your personal rating</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {nationList.map((nation: Nation, index) => {
                  const {name} = nation;
                  let rating;
                  if (draftRatings && draftRatings[name]) {
                    rating = draftRatings[name];
                  } else if (ratings && ratings[name]) {
                    rating = ratings[name];
                  } else {
                    rating = 0;
                  }
                  
                  return (
                    <TableRow key={nation.name} className={classes.row}>
                      <TableCell component="th" scope="row">
                        <NationLabel
                          nation={name}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <div className={classes.ratingCell} onClick={(event) => {event.stopPropagation(); console.log(index)}}>
                          <div>({rating} / 10)</div>
                          <RatingStars
                            name={name}
                            readonly={!ratingEditable}
                            value={rating}
                            onChange={(value: number) => handleSetDraftRating(name, value)}
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <Button 
            variant={ratingEditable ? "contained" : "outlined"}
            color="primary"
            onClick={handleToggleUpdate}
            className={classes.updateButton}
          >
            {ratingEditable ? 'Save ratings' : 'Update ratings'}
          </Button>
        </React.Fragment>
      )}
    </Container>
  );
}