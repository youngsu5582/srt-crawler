import { Page } from 'puppeteer';

export abstract class CustomPage {
  readonly page: Page;
  public abstract initPage(): void;
  public abstract setPage(T): void;
}
