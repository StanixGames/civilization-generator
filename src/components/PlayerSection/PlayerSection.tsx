import * as React from 'react';
import {NationBadge} from '../NationBadge';
import {Nation} from '../../types';
import './styles.css';


interface PlayerSectionProps {
  playerName: string;
  nations: string[];
}

export const PlayerSection = (props: PlayerSectionProps) => {
  const { playerName, nations } = props;
  const rows: React.ReactNode[] = [];
  nations.forEach((nation) => {
    rows.push(
     <NationBadge nation={nation} />
    );
  });

  return (
    <div className="player-section">
     <div className="player-name">{playerName}</div>
     <div className="nations">
       {rows}
     </div>
    </div>
  );
}
