import { SrtTrailView } from 'src/domain/srt-trail/srt-trail-view.domain';
import { convertNameToStationCode } from 'src/util/match-station.util';
import { convertTimeToCode } from 'src/util/match-time.utils';

export class SrtTrailViewBuilder {
  private departStationCode = '0551';
  private arriveStationCode = '0015';
  private departDate: string;
  private departTimeCode: string;

  public setDepartStationCodeWithStationName(stationName: string) {
    this.departStationCode = convertNameToStationCode(stationName);
    return this;
  }
  public setArriveStationCodeWithStationName(stationName: string) {
    this.arriveStationCode = convertNameToStationCode(stationName);
    return this;
  }
  public setDepartDate(departDate: string) {
    this.departDate = departDate;
    return this;
  }
  public setDepartTimeCodeWithTime(time: number) {
    this.departTimeCode = convertTimeToCode(time);
    return this;
  }
  public build(): SrtTrailView {
    return new SrtTrailView(
      this.departStationCode,
      this.arriveStationCode,
      this.departDate,
      this.departTimeCode,
    );
  }
}
