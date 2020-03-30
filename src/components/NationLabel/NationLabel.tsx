import React from 'react';
import Typography from '@material-ui/core/Typography';
import {NationFlag} from '../../res';
import './style.css';

interface NationLabelProps {
  nation: string;
  showLabel?: boolean;
  extraLabel?: string;
}

export const NationLabel: React.FunctionComponent<NationLabelProps> = (props) => {
  const {nation, showLabel = true, extraLabel = '' } = props;

  return (
    <div className="nation-label">
      <div
        className="nation-icon"
        style={{ backgroundImage: `url(${(NationFlag as any)[nation]})` }}
      />
      {showLabel && (
        <Typography id="discrete-slider" gutterBottom>
          {nation} {extraLabel}
        </Typography>
      )}
    </div>
  );
}