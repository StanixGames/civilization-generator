import React, { ReactNode, useState, useEffect } from 'react';
import {PlayerSection} from './components';
import {Nation} from './types';
import './App.css';

const reserved: string[] = [];

function getRandomNation(): string {
  const enums = Object.keys(Nation).filter((nation) => !reserved.includes(nation));
  const randomNation = enums[Math.floor(Math.random() * enums.length)];
  reserved.push(randomNation);
  return randomNation;
}

function generateNations(players: number, nationsSize: number): Array<string[]> {
  const res: Array<string[]> = new Array(players);

  for (let p = 0; p < players; p += 1) {
    res[p] = [];
    for (let i = 0; i < nationsSize; i+=1) {
      const randomNation = getRandomNation();
      res[p].push(randomNation);
    }
  }

  console.log(res);

  return res;
}

function App() {
  const nations: Array<string[]> = generateNations(3, 4);
  const rows: ReactNode[] = [];
  nations.forEach((nation, index) => {
    rows.push(
      <PlayerSection
      playerName={`Player ${index + 1}`}
      nations={nation}
    />
    );
  });

  return (
    <div className="App">
      {rows}
    </div>
  );
}

export default App;
