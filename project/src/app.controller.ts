import { Body, Controller, Get, Param, Req } from '@nestjs/common';
// import { Request } from 'express';
import { AppService } from './app.service';
import { CatsService } from './cats/services/cats.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    const URI = process.env.MONGODB_URI;
    console.log('uri : ' + URI);
    return this.appService.getHello();
  }
}
