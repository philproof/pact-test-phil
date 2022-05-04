import { HttpService, Injectable } from '@nestjs/common';
export interface HelloResponse {
  hi: string;
}
@Injectable()
export class AppService {
  private static getApiEndpoint() {
    return process.env.API_HOST || 'http://localhost:8081';
  }

  public constructor(private readonly http: HttpService) {}

  async getHello(): Promise<HelloResponse> {
    const { data } = await this.http
      .get(`${AppService.getApiEndpoint()}/hello`)
      .toPromise();

    return data;
  }
}
