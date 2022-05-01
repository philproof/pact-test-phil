import { Module } from '@nestjs/common';
import { TesterModule } from './testing/tester.module';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';

@Module({
  imports: [TesterModule],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
