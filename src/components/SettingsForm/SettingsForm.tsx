import React, {useState, useCallback} from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

function valuetext(value: number) {
  return `${value} jksjdf`;
}

const MARKS = [
  { label: '1', value: 1 },
  { label: '2', value: 2 },
  { label: '3', value: 3 },
  { label: '4', value: 4 },
  { label: '5', value: 5 },
  { label: '6', value: 6 },
  { label: '7', value: 7 },
  { label: '8', value: 8 },
  { label: '9', value: 9 },
  { label: '10', value: 10 },
  { label: '11', value: 11 },
  { label: '12', value: 12 },
];

const DRAFTS_MARKS = MARKS.slice(0, 5);
const COEFS_MARKS = MARKS.slice(0, 10);

interface SettingsFormProps {
  playersNumber: number;
  AINumber: number;
  draftsNumber: number;
  minCoef: number;
  maxCoef: number;
  onSetMinCoef: (number: number) => void;
  onSetMaxCoef: (number: number) => void;
  onSetPlayersNumber: (number: number) => void;
  onSetAINumber: (number: number) => void;
  onSetDraftsNumber: (number: number) => void;
}

export const SettingsForm: React.FunctionComponent<SettingsFormProps> = (props) => {
  const {playersNumber, minCoef, maxCoef, AINumber, draftsNumber, onSetMinCoef, onSetMaxCoef, onSetDraftsNumber, onSetPlayersNumber, onSetAINumber } = props;
  const [numberSlots, setNumberSlots] = useState<number>(4);

  const handleChangeNumberSlots = useCallback((event: {}, value: number | number[]) => {
    setNumberSlots(value as number);
    onSetAINumber((value as number) - playersNumber);
  }, [playersNumber, onSetAINumber, setNumberSlots]);

  const handleChangeNumberPlayers = useCallback((event: {}, value: number | number[]) => {
    onSetPlayersNumber(value as number);
    onSetAINumber(numberSlots - (value as number));
  }, [numberSlots, onSetPlayersNumber, onSetAINumber]);

  const handeSetDraftsNumber = useCallback((event: {}, value: number | number[]) => {
    onSetDraftsNumber(value as number);
  }, [onSetDraftsNumber]);

  const handeSetMinCoef= useCallback((event: {}, value: number | number[]) => {
    onSetMinCoef(value as number);
  }, [onSetMinCoef]);

  const handeSetMaxCoef= useCallback((event: {}, value: number | number[]) => {
    onSetMaxCoef(value as number);
  }, [onSetMaxCoef]);

  return (
    <div>
      <Typography id="discrete-slider" gutterBottom>
        Number of game slots
      </Typography>
      <Slider
        value={numberSlots}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={null}
        marks={MARKS}
        max={MARKS.length}
        onChange={handleChangeNumberSlots}
      />
      <Typography id="discrete-slider" gutterBottom>
        Number of drafts
      </Typography>
      <Slider
        value={draftsNumber}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        marks={DRAFTS_MARKS}
        step={null}
        max={DRAFTS_MARKS.length}
        onChange={handeSetDraftsNumber}
      />
      <Typography id="discrete-slider" gutterBottom>
        Min coef
      </Typography>
      <Slider
        value={minCoef}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        marks={COEFS_MARKS}
        step={null}
        max={COEFS_MARKS.length}
        onChange={handeSetMinCoef}
      />
      <Typography id="discrete-slider" gutterBottom>
        Max coef
      </Typography>
      <Slider
        value={maxCoef}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        marks={COEFS_MARKS}
        step={null}
        max={COEFS_MARKS.length}
        onChange={handeSetMaxCoef}
      />
      <Typography id="discrete-slider" gutterBottom>
        Number of players: {playersNumber}
      </Typography>
      <Slider
        value={playersNumber}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={null}
        marks={MARKS.slice(0, numberSlots)}
        max={numberSlots}
        onChange={handleChangeNumberPlayers}
      />
      <Typography id="discrete-slider" gutterBottom>
        {AINumber > 0 ? `Number of AI: ${AINumber}` : 'Disable AI for this game'}
      </Typography>
    </div>
  );
}