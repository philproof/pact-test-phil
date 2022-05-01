import { pactWith } from 'jest-pact';
import { Pact } from '@pact-foundation/pact';
import { Test } from '@nestjs/testing';
import { TesterService } from '../testing/tester.service';
import { TesterModule } from '../testing/tester.module';

pactWith(
  {
    consumer: 'test consumer pact',
    provider: 'test provider',
  },
  (provider: Pact) => {
    let testerService: TesterService;

    beforeAll(async () => {
      const moduleRef = await Test.createTestingModule({
        imports: [TesterModule],
      }).compile();
      testerService = moduleRef.get(TesterService);
    });

    const bodyExpectation = { hi: 'howdy there partner!' };

    describe('when a call is made to fetch the test str', () => {
      beforeAll(async () => {
        await provider.addInteraction({
          state: 'has not returned string',
          uponReceiving: 'a request to get the test string',
          withRequest: {
            method: 'GET',
            path: `${provider.mockService.baseUrl}/test`,
          },
          willRespondWith: {
            status: 200,
            body: bodyExpectation,
          },
        });
      });
      it('should return the test string', (done) => {
        testerService.getTestStr().subscribe((res) => {
          console.log('*** res: ', res);
          expect(res).toHaveProperty('hi');
          done();
        });
      });
    });
  },
);
