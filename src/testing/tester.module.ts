import { CacheModule, Module } from '@nestjs/common';
import { TesterController } from './tester.controller';
import { TesterService } from './tester.service';

@Module({
  imports: [CacheModule.register()],
  providers: [TesterService],
  controllers: [TesterController],
})
export class TesterModule {}
