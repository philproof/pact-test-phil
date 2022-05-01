import { Controller, Get } from '@nestjs/common';
import { Observable } from 'rxjs';
import { TesterService } from './tester.service';

@Controller('test')
export class TesterController {
  constructor(private readonly _testService: TesterService) {}

  @Get()
  public getTestStr(): Observable<{ hi: string }> {
    return this._testService.getTestStr();
  }
}
