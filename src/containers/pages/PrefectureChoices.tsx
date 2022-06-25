import { FC, useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import PrefChoices from 'components/pages/PrefChoices';
import { PrefecturesApiResponse, PrefectureChoice } from 'types/resas';

const getPrefectures = async (): Promise<PrefecturesApiResponse> => {
  const apiKey: string = process.env.REACT_APP_RESAS_API_KEY || '';
  const res = await fetch(
    'https://opendata.resas-portal.go.jp/api/v1/prefectures',
    { headers: { 'x-api-key': apiKey } },
  );

  const json = (await res.json()) as PrefecturesApiResponse;

  return json;
};

const PrefectureChoices: FC = () => {
  const { data: prefectures } = useQuery('users', getPrefectures);
  const [prefectureChoices, setPrefectureChoices] = useState<
    PrefectureChoice[]
  >([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const choices: PrefectureChoice[] = prefectureChoices.map(
      (pref) =>
        (pref.prefCode === Number(event.target.name) && {
          ...pref,
          checked: event.target.checked,
        }) ||
        pref,
    );
    setPrefectureChoices(choices);
  };

  // APIの戻り値にcheckedカラムを持たせる
  useEffect(() => {
    if (prefectures?.result) {
      const choices: PrefectureChoice[] = prefectures.result.map((pref) => ({
        ...pref,
        checked: false,
      }));
      setPrefectureChoices(choices);
    }
  }, [prefectures]);

  return (
    <>
      <h2>都道府県</h2>
      {prefectureChoices.length > 0 && (
        <PrefChoices
          prefectures={prefectureChoices}
          handleChange={handleChange}
        />
      )}
    </>
  );
};

export default PrefectureChoices;
