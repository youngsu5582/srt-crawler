import puppeteer, { Page } from "puppeteer";
import { CustomPage } from "../common/custom-page.domain";
import { TrainSearchParameters } from "src/types/srt.type";

export class SrtTrailPage extends CustomPage{
    
    private static readonly SRT_URL = 'https://etk.srail.kr/main.do';
    private static readonly DEPART_STATION_SELECTOR = '#dptRsStnCd';
    private static readonly ARRIVE_STATION_SELECTOR = '#arvRsStnCd';
    private static readonly DEPART_DATE_SELECTOR =
      '#search-form > fieldset > div:nth-child(9) > div > input.calendar1';
    private static readonly DEPART_TIME_SELECTOR = '#dptTm';
    
    private static readonly TRAIL_INQURY_CLICK_SELECTOR = '#search-form > fieldset > a';
    private static readonly TRAILS_LIST_INQURY_SELECTOR=
    "#result-form > fieldset > div.tbl_wrap.th_thead > table > tbody > tr"
    private static readonly TRAIL_INFO_SELECTOR=
    "td:nth-child(n+3):nth-child(-n+7)"

    page:Page;
    public async initPage(): Promise<void> {
        const broswer = await puppeteer.launch({
          headless: false,
        });
        this.page = await broswer.newPage();
        await this.page.goto(SrtTrailPage.SRT_URL);
      }

      public async setPage (
        trainSearchParameters: TrainSearchParameters,
      ): Promise<void> {
        await Promise.all([
          await this.setDepartStation(
            trainSearchParameters.departStationCode,
          ),
          await this.setArriveStation(
            trainSearchParameters.arriveStationCode,
          ),
          await this.setDepartDate(trainSearchParameters.departDate),
          await this.setDepartTime(trainSearchParameters.departTimeCode),
        ])
      }
      public async executePage(){
        await this.page.click(SrtTrailPage.TRAIL_INQURY_CLICK_SELECTOR);
      }
      public async getTrailsInfo(){
        await this.page.waitForSelector(SrtTrailPage.TRAILS_LIST_INQURY_SELECTOR);
        const bodyHandle = await this.page.$$(SrtTrailPage.TRAILS_LIST_INQURY_SELECTOR);
        const result = await Promise.all(
          bodyHandle.map(async (tr) => {
            const tds = await tr.$$(SrtTrailPage.TRAIL_INFO_SELECTOR);
            const tdValues = await Promise.all(
              tds.map(async (td) => {
                return await td.evaluate((element) => element.textContent);
              })
            );
            return tdValues;
          })
        ); 
        return result;
      }
      private async setDepartStation(stationCode: string) {
        await this.page.evaluate(
          (stationCode, selector) => {
            const element: HTMLInputElement | null =
              document.querySelector(selector);
            if (element) {
              element.value = stationCode;
            }
            return;
          },
          stationCode,
          SrtTrailPage.DEPART_STATION_SELECTOR,
        );
      }
      private async setArriveStation(stationCode: string) {
        await this.page.evaluate(
          (stationCode, selector) => {
            const element: HTMLInputElement | null =
              document.querySelector(selector);
            if (element) {
              element.value = stationCode;
            }
            return;
          },
          stationCode,
          SrtTrailPage.ARRIVE_STATION_SELECTOR,
        );
      }
      private async setDepartDate(departDate: string) {
        await this.page.evaluate(
          (departDate, selector) => {
            const element: HTMLInputElement | null =
              document.querySelector(selector);
            if (element) {
              element.value = departDate;
            }
            return;
          },
          departDate,
          SrtTrailPage.DEPART_DATE_SELECTOR,
        );
      }
      private async setDepartTime(departTimeCode: string) {
        await this.page.evaluate(
          (departTimeCode, selector) => {
            const element: HTMLInputElement | null =
              document.querySelector(selector);
            if (element) {
              element.value = departTimeCode;
            }
            return;
          },
          departTimeCode,
          SrtTrailPage.DEPART_TIME_SELECTOR,
        );
      }
}