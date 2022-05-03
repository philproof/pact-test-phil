import { pactWith } from 'jest-pact';
import { Pact } from '@pact-foundation/pact';
import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from '../app.service';
import { AppModule } from '../app.module';

pactWith(
  {
    consumer: 'test consumer pact',
    provider: 'test provider',
  },
  (provider: Pact) => {
    let appService: AppService;

    beforeAll(async () => {
      const app: TestingModule = await Test.createTestingModule({
        imports: [AppModule],
      }).compile();
      appService = app.get(AppService);
      process.env.API_HOST = provider.mockService.baseUrl;
    });

    const bodyExpectation = { hi: 'howdy there partner!' };

    describe('when a call is made to fetch the test str', () => {
      beforeAll(async () => {
        await provider.addInteraction({
          state: 'has not returned string',
          uponReceiving: 'a request to get the test string',
          withRequest: {
            method: 'GET',
            path: `/hello`,
          },
          willRespondWith: {
            status: 200,
            body: bodyExpectation,
          },
        });
      });
      it('should return "Hello World!"', async () => {
        const res = await appService.getHello();
        expect(res).toEqual(bodyExpectation);
      });
    });
  },
);
