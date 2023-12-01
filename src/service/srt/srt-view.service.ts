import { Injectable } from '@nestjs/common';
import puppeteer, { Page } from 'puppeteer';
import { SrtTrailViewBuilder } from 'src/builder/srt-trail-view.builder';
import { SrtTrailPage } from 'src/domain/srt-trail/srt-trail-page.domain';
import { convertTimeToCode } from 'src/util/match-time.utils';
@Injectable()
export class SrtViewService {



  public async getTrailInfos() {

    const srtTrailView = new SrtTrailViewBuilder()
      .setDepartStationCodeWithStationName('수서')
      .setArriveStationCodeWithStationName('동대구')
      .setDepartDate('20231202')
      .setDepartTimeCodeWithTime(10)
      .build();

      const srtTrailPage = new SrtTrailPage();
      await srtTrailPage.initPage();
      await srtTrailPage.setPage(srtTrailView.trainSearchParameters);
      await srtTrailPage.executePage();

      const result = await srtTrailPage.getTrailsInfo();
      console.log(result.map(arr=>arr.map(str=>str?.replace(/[\n\t]/g, ''))));
  }


}
