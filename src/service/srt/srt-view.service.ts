import { Injectable } from '@nestjs/common';
import { SrtTrailViewBuilder } from 'src/builder/srt-trail-view.builder';
import { SrtTrailPage } from 'src/domain/srt-trail/srt-trail-page.domain';
import { GetTrailInfosRequestDto } from 'src/dto/srt/request/get-trail-infos-request.dto';
import { GetTrailInfosResponseDto } from 'src/dto/srt/response/get-trail-infos-response.dto';
@Injectable()
export class SrtViewService {
  public async getTrailInfos(requestDto: GetTrailInfosRequestDto) {
    const { departStationName, arriveStationName, departDate, departTime } =
      requestDto;
    const srtTrailView = new SrtTrailViewBuilder()
      .setDepartStationCodeWithStationName(departStationName)
      .setArriveStationCodeWithStationName(arriveStationName)
      .setDepartDate(departDate)
      .setDepartTimeCodeWithTime(departTime)
      .build();

    const srtTrailPage = new SrtTrailPage();
    await srtTrailPage.initPage();
    await srtTrailPage.setPage(srtTrailView.trainSearchParameters);
    await srtTrailPage.executePage();

    const trailsInfo = await srtTrailPage.getTrailsInfo();
    this.createTrailInfosResponse(trailsInfo);
  }
  private createTrailInfosResponse(trailsInfo : (string|null)[][]){
    const responseDto: GetTrailInfosResponseDto[] = trailsInfo
    .map((arr) => arr.map((str) => str?.replace(/[\n\t]/g, '')))
    .map((info) => ({
      trailNumber: info[0] || '',
      departStationName: info[1] || '',
      arriveStationName: info[2] || '',
      specialSeatAvailable: info[3] !== '매진',
      regularSeatAvailable: info[4] !== '매진',
    }));
  return responseDto;
  }
}
