export type Prefecture = {
  prefCode: number;
  prefName: string;
};

export type PrefecturesApiResponse = {
  result: Prefecture[];
};

export type PrefectureChoice = Prefecture & {
  checked: boolean;
};
