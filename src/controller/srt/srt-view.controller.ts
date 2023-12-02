import { TypedBody } from '@nestia/core';
import { Controller, Post } from '@nestjs/common';
import { GetTrailInfosRequestDto } from 'src/dto/srt/request/get-trail-infos-request.dto';
import { SrtViewService } from 'src/service/srt/srt-view.service';

@Controller()
export class SrtViewController {
  constructor(private readonly srtViewService: SrtViewService) {}
  @Post()
  async gets(@TypedBody() requestDto: GetTrailInfosRequestDto) {
    const result = await this.srtViewService.getTrailInfos(requestDto);
    return result;
  }
}
