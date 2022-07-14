import {
  PopulationApiResponse,
  Population,
} from 'domains/resas/models/population';

const getPopulation = async (prefCode: number): Promise<Population[]> => {
  const apiKey: string = process.env.REACT_APP_RESAS_API_KEY || '';
  const url =
    'https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear';
  const query = new URLSearchParams({
    prefCode: String(prefCode),
    cityCode: '-',
  }).toString();

  const res = await fetch(`${url}?${query}`, {
    headers: { 'x-api-key': apiKey },
  });

  const json = (await res.json()) as PopulationApiResponse;

  return json.result.data[0].data;
};

export default getPopulation;
