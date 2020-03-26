import React, {useState, useCallback} from 'react';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';
import {NationLabel} from '../NationLabel';
import {Nation} from '../../types';
import './style.css';

const NATIONS_KEYS = Object.keys(Nation);
const NATIONS_COEFS = [
  5.666666667,
  7.333333333,
  4.666666667,
  8.666666667,
  9.666666667,
  9,
  4.333333333,
  4,
  6,
  6,
  7.333333333,
  2,
  3.333333333,
  9,
  7.666666667,
  6,
  7,
  6.666666667,
  6.333333333,
  6.666666667,
  5.666666667,
  8.666666667,
  5.666666667,
  5.666666667,
  8.333333333,
  8.666666667,
  7.666666667,
  5,
  6.666666667,
  4.333333333,
  9.333333333,
  8.666666667,
  3.666666667,
  7.333333333,
  5,
  8.333333333,
  8.333333333,
  6,
  3,
  4.666666667,
  3,
  7,
  4.666666667,
];

const renderAsString = (list: string[]): JSX.Element[] => {
  return list.map((nation) => (
    <NationLabel nation={nation} showLabel={false} />
  ));
}

export const BanForm: React.FunctionComponent<{ banned: string[], minCoef: number, maxCoef: number, onToggleBanned: any }> = (props) => {
  const { banned, minCoef, maxCoef, onToggleBanned } = props;
  const nations = NATIONS_KEYS.filter((nation) => {
    const coef = NATIONS_COEFS[NATIONS_KEYS.indexOf(nation)];
    return coef >= minCoef && coef <= maxCoef;
  });

  return (
    <div>
      <Typography id="discrete-slider" gutterBottom>
        Banned nations: ({banned.length})
        <div className="banned-nations-row">{renderAsString(banned)}</div>
      </Typography>
      <List dense component="div" role="list">
        {nations.map((nation: string, index: number) => {
          const labelId = `transfer-list-item-${nation}-label`;

          return (
            <ListItem key={nation} role="listitem" button onClick={onToggleBanned(nation)}>
              <ListItemIcon>
                <Checkbox
                  checked={banned.indexOf(nation) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <NationLabel
                nation={nation}
                extraLabel={`(${NATIONS_COEFS[NATIONS_KEYS.indexOf(nation)].toFixed(1)}/10)`}
              />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </div>
  );
}