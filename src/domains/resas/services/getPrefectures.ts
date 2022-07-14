import { PrefecturesApiResponse } from 'domains/resas/models/prefecture';

const getPrefectures = async (): Promise<PrefecturesApiResponse> => {
  const apiKey: string = process.env.REACT_APP_RESAS_API_KEY || '';
  const res = await fetch(
    'https://opendata.resas-portal.go.jp/api/v1/prefectures',
    { headers: { 'x-api-key': apiKey } },
  );

  const json = (await res.json()) as PrefecturesApiResponse;

  return json;
};

export default getPrefectures;
