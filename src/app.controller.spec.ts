import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './app.module';
import { AppService } from './app.service';

describe('AppController', () => {
  let appService: AppService;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    appService = app.get(AppService);
  });

  const bodyExpectation = { hi: 'howdy there partner!' };

  describe('root', () => {
    it('should return "Hello World!"', async () => {
      jest
        .spyOn(appService, 'getHello')
        .mockImplementation(() => Promise.resolve(bodyExpectation));

      const res = await appService.getHello();
      expect(res).toBe(bodyExpectation);
    });
  });
});
