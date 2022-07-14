import { FC, useState, useEffect, useMemo } from 'react';
import { useQuery, useQueries } from 'react-query';
import PrefChoices from 'components/pages/PrefChoices';
import { PrefectureChoice } from 'domains/resas/models/prefecture';
import {
  Population,
  PrefecturePopulations,
} from 'domains/resas/models/population';
import getPrefectures from 'domains/resas/services/getPrefectures';
import getPopulation from 'domains/resas/services/getPopulation';

const PrefectureChoices: FC = () => {
  const { data: prefectures } = useQuery('users', getPrefectures);
  // 各都道府県とcheckedが含まれる
  const [prefectureSelectors, setPrefectureSelectors] = useState<
    PrefectureChoice[]
  >([]);
  // const [prefectureTrends, setPrefectureTrends] = useState<Population[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const choices: PrefectureChoice[] = prefectureSelectors.map(
      (pref) =>
        (pref.prefCode === Number(event.target.name) && {
          ...pref,
          checked: event.target.checked,
        }) ||
        pref,
    );
    setPrefectureSelectors(choices);
  };

  // APIの戻り値にcheckedカラムを持たせる
  useEffect(() => {
    if (prefectures?.result) {
      const choices: PrefectureChoice[] = prefectures.result.map((pref) => ({
        ...pref,
        checked: false,
      }));
      setPrefectureSelectors(choices);
    }
  }, [prefectures]);

  const queries = useQueries(
    prefectureSelectors
      .filter((p) => p.checked)
      .map((pref) => {
        return {
          queryKey: ['population', pref.prefCode],
          queryFn: () => getPopulation(pref.prefCode),
          select: (populations: Population[]): PrefecturePopulations => ({
            ...pref,
            populations,
          }),
        };
      }),
  );
  const isLoading = queries.some((query) => query.isLoading);
  const trends = useMemo(
    () => queries.map((query) => query.data || []),
    [queries],
  );
  console.log(isLoading);
  console.log(trends);

  return (
    <>
      <h2>都道府県</h2>
      {prefectureSelectors.length > 0 && (
        <PrefChoices
          prefectures={prefectureSelectors}
          handleChange={handleChange}
        />
      )}
    </>
  );
};

export default PrefectureChoices;
