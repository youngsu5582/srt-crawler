export function convertNameToStationCode(stationCode: string) {
  return matchStationTable[stationCode] || matchStationTable['수서'];
}
const matchStationTable: { [x: string]: string } = {
  수서: '0551',
  동탄: '0552',
  평택지제: '0553',
  곡성: '0049',
  공주: '0514',
  광주송정: '0036',
  구례구: '0050',
  '김천(구미)': '0507',
  나주: '0037',
  남원: '0048',
  대전: '0010',
  동대구: '0015',
  마산: '0059',
  목포: '0041',
  밀양: '0017',
  부산: '0020',
  서대구: '0506',
  순천: '0051',
  신경주: '0508',
  여수EXPO: '0053',
  여천: '0139',
  오송: '0297',
  '울산(통도사)': '0509',
  익산: '0030',
  전주: '0045',
  정읍: '0033',
  진영: '0056',
  진주: '0063',
  창원: '0057',
  창원중앙: '0512',
  천안아산: '0502',
  포항: '0515',
};
