import { Injectable } from '@nestjs/common';
import puppeteer, { Page } from 'puppeteer';
import { TrainSearchParameters } from 'src/types/srt.type';
import { convertNameToStationCode } from 'src/util/match-station.util';
import { convertTimeToDateCode } from 'src/util/match-time.utils';
@Injectable()
export class SrtViewService {
  private static readonly SRT_URL = 'https://etk.srail.kr/main.do';
  private static readonly DEPART_STATION_SELECTOR = "#dptRsStnCd";
  private static readonly ARRIVE_STATION_SELECTOR = "#arvRsStnCd";
  private static readonly DEPART_DATE_SELECTOR = "#search-form > fieldset > div:nth-child(9) > div > input.calendar1";
  private static readonly DEPART_TIME_SELECTOR = "#dptTm";
  private static readonly TRAIL_INQURY_SELECTOR = "#search-form > fieldset > a";
  public async getTrailInfos() {
    const page = await this.initPage();
    const departStationCode = convertNameToStationCode('수서');
    const arriveStationCode = convertNameToStationCode('동대구');
    const departDate = '20231201';
    const departTimeCode = convertTimeToDateCode(10);
    if (departStationCode && arriveStationCode && departTimeCode){
      await this.setPage(page,{departDate,arriveStationCode,departStationCode,departTimeCode});
    }

    await page.click(SrtViewService.TRAIL_INQURY_SELECTOR);
    const content = await page.content();
    console.log(content);
  }
  private async initPage(): Promise<Page> {
    const broswer = await puppeteer.launch({
      headless: false,
      
    });
    const page = await broswer.newPage();
    await page.goto(SrtViewService.SRT_URL);
    return page;
  }
  private async setPage(
    page: Page,
    trainSearchParameters: TrainSearchParameters,
  ) {
    await Promise.all([
      await this.setDepartStation(page, trainSearchParameters.departStationCode),
      await this.setArriveStation(page, trainSearchParameters.arriveStationCode),
      await this.setDepartDate(page, trainSearchParameters.departDate),
      await this.setDepartTime(page, trainSearchParameters.departTimeCode),
    ]).then(async()=>await page.click(SrtViewService.TRAIL_INQURY_SELECTOR));
  }
  private async setDepartStation(page: Page, stationCode: string) {
    await page.evaluate((stationCode,selector) => {
      const element: HTMLInputElement | null =
        document.querySelector(selector);
      if (element) {
        element.value = stationCode;
      }
      return;
    }, stationCode,SrtViewService.DEPART_STATION_SELECTOR);
  }
  private async setArriveStation(page: Page, stationCode: string) {
    await page.evaluate((stationCode,selector) => {
      const element: HTMLInputElement | null =
        document.querySelector(selector);
      if (element) {
        element.value = stationCode;
      }
      return;
    }, stationCode,SrtViewService.ARRIVE_STATION_SELECTOR);
  }
  private async setDepartDate(page: Page, departDate: string) {
    await page.evaluate((departDate,selector) => {
      const element: HTMLInputElement | null = document.querySelector(
        selector
      );
      if (element) {
        element.value = departDate;
      }
      return;
    }, departDate,SrtViewService.DEPART_DATE_SELECTOR);
  }
  private async setDepartTime(page: Page, departTimeCode: string) {
    await page.evaluate((departTimeCode,selector) => {
      const element: HTMLInputElement | null = document.querySelector(selector);
      if (element) {
        element.value = departTimeCode;
      }
      return;
    }, departTimeCode,SrtViewService.DEPART_TIME_SELECTOR);
  }
}
