import { Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';

@Injectable()
export class TesterService {
  private readonly testStr = { hi: 'howdy there partner!' };

  public getTestStr(): Observable<{ hi: string }> {
    return of(this.testStr);
  }
}
