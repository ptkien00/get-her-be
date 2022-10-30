// 流入した広告源。2022/06/17(金)時点では Google 広告と Facebook 広告 のみしか出されていない。
// なので、adSource には 'organic'、'google'、'facebook'しか入らないはず。
// テーブルの adSource カラムに 'NONE' が入ってる場合は要調査。
export const adSourcesEnum = {
  NONE: 'NONE', // 経路不明の場合。
  ORGANIC: 'organic',
  GOOGLE: 'google',
  FACEBOOK: 'facebook',
  INSTAGRAM: 'instagram',
  // YAHOO: 'yahoo',
  // TWITTER: 'twitter',
} as const;

export type AdSourcesEnum = typeof adSourcesEnum[keyof typeof adSourcesEnum];

export const adSourcesList = Object.values(adSourcesEnum);

export const getIndexOfAdSources = (source: AdSourcesEnum): number => {
  // source が AdSourcesEnum 以外の値であった場合、'NONE' を返す。
  if (!adSourcesList.includes(source)) {
    // TODO: Slack に「source: ${source} は AdSourcesEnum に含まれていません。調査してください。」的な通知を送りたい。
    // console.log(
    //   'This source does not exist in AdSourcesEnum.',
    //   `Add this source: ${source} to adSourcesEnum and run npx prisma db seed.`
    // );
    return adSourcesList.indexOf(adSourcesEnum.NONE);
  }
  return adSourcesList.indexOf(source);
};