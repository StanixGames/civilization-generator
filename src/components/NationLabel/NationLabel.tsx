import React from 'react';
import Typography from '@material-ui/core/Typography';
import {NationFlag} from '../../res';
import {Nation} from '../../types';
import './style.css';

interface NationLabelProps {
  nation: string;
  showLabel?: boolean;
  extraLabel?: string;
}

export const NationLabel: React.FunctionComponent<NationLabelProps> = (props) => {
  const { nation, showLabel = true, extraLabel = '' } = props;

  return (
    <div className="nation-label">
      <div
        className="nation-icon"
        style={{ backgroundImage: `url(${NationFlag[nation as keyof typeof Nation]})` }}
      />
      {showLabel && (
        <Typography id="discrete-slider" gutterBottom>
          {nation} {extraLabel}
        </Typography>
      )}
    </div>
  );
}