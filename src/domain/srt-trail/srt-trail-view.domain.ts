import { TrainSearchParameters } from 'src/types/srt.type';

export class SrtTrailView {
  public readonly trainSearchParameters: TrainSearchParameters;
  constructor(
    departStationCode: string,
    arriveStationCode: string,
    departDate: string,
    departTimeCode: string,
  ) {
    this.trainSearchParameters = {
      departStationCode,
      arriveStationCode,
      departDate,
      departTimeCode,
    };
  }
}
