import * as React from 'react';
import {Nation} from '../../types';
import {NationFlag} from '../../res';
import './styles.css';


interface NationBadgeProps {
  nation: string;
}

export const NationBadge = (props: NationBadgeProps) => {
  const { nation } = props;

  return (
    <div className="nation-badge">
      <div
        className="nation-badge-img"
        style={{ backgroundImage: `url(${NationFlag[nation as keyof typeof Nation]})` }}
      />
    </div>
  );
}
