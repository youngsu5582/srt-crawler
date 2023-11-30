import { Module } from '@nestjs/common';
import { SrtModule } from './module/srt.module';

@Module({
  imports: [SrtModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
