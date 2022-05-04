import { BadRequestException, Controller, Get } from '@nestjs/common';
import { AppService, HelloResponse } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<HelloResponse> {
    try {
      return await this.appService.getHello();
    } catch (e) {
      throw new BadRequestException();
    }
  }
}
