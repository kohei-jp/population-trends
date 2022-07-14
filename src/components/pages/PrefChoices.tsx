import { FC } from 'react';
import { PrefectureChoice } from 'domains/resas/models/prefecture';
import PrefChoice from 'components/organisms/PrefChoice';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';

interface Props {
  prefectures: PrefectureChoice[];
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const PrefChoices: FC<Props> = ({ prefectures, handleChange }) => {
  return (
    <FormControl component="fieldset" variant="standard">
      <FormGroup>
        <Grid container spacing={2}>
          {prefectures.map((prefecture) => (
            <PrefChoice
              key={prefecture.prefCode}
              prefecture={prefecture}
              handleChange={handleChange}
            />
          ))}
        </Grid>
      </FormGroup>
    </FormControl>
  );
};

export default PrefChoices;
