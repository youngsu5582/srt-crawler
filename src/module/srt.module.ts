import { Module } from '@nestjs/common';
import { Provider } from '@nestjs/common/interfaces';
import { SrtViewController } from 'src/controller/srt/srt-view.controller';
import { SrtViewService } from 'src/service/srt/srt-view.service';

const controllers = [SrtViewController];
const providers: Provider[] = [SrtViewService];
@Module({
  controllers: controllers,
  providers: providers,
})
export class SrtModule {}
