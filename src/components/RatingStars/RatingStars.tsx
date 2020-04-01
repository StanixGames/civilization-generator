import React, {memo, FunctionComponent} from 'react';
import Rating from 'react-rating';

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

interface RatingStarsProps {
  readonly: boolean;
  name: string;
  value: number;
  onChange: (value: number) => void;
}

const RatingStarsComp: FunctionComponent<RatingStarsProps> = (props) => {
  const {readonly, value, onChange} = props;

  return (
    <Rating
      start={0}
      stop={10}
      initialRating={value}
      onChange={onChange}
      readonly={readonly}
    />
  );
}

export const RatingStars = memo(RatingStarsComp);
