import { Prefecture } from './prefecture';

export type Population = {
  year: number;
  value: number;
};

export type PopulationApiResponse = {
  result: {
    data: [{ data: Population[] }];
  };
};

export type PopulationChoice = Population & {
  checked: boolean;
};

export type PrefecturePopulations = Prefecture & {
  populations: Population[];
};
