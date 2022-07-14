import { FC } from 'react';
import { PrefectureChoice } from 'domains/resas/models/prefecture';
import Grid from '@mui/material/Grid';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

interface Props {
  prefecture: PrefectureChoice;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const PrefChoice: FC<Props> = ({ prefecture, handleChange }) => {
  return (
    <Grid item xs={2} key={prefecture.prefCode}>
      <FormControlLabel
        control={
          <Switch
            checked={prefecture.checked}
            onChange={handleChange}
            name={String(prefecture.prefCode)}
          />
        }
        label={prefecture.prefName}
      />
    </Grid>
  );
};

export default PrefChoice;
