import { Body, Controller, Get, Param, Req } from '@nestjs/common';
// import { Request } from 'express';
import { AppService } from './app.service';
import { CatsService } from './cats/cats.service';

@Controller('cats')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly catsService: CatsService,
  ) {}

  @Get()
  getHello(): string {
    // console.log(req);
    return this.appService.getHello();
  }
}
