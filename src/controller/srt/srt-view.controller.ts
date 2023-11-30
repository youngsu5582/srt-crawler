import { Controller, Get } from '@nestjs/common';
import { SrtViewService } from 'src/service/srt/srt-view.service';

@Controller()
export class SrtViewController {
  constructor(private readonly srtViewService: SrtViewService) {}
  @Get()
  async gets() {
    await this.srtViewService.getTrailInfos();
  }
}
