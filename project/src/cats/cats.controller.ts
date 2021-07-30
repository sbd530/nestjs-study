import {
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  UseInterceptors,
} from '@nestjs/common';
import { UseFilters } from '@nestjs/common';
import { Controller, Delete, Get, Patch, Post, Put } from '@nestjs/common';
import { PositiveIntPipe } from 'src/common/pipes/positiveInt.pipe';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { CatsService } from './cats.service';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';

@Controller('cats')
@UseFilters(HttpExceptionFilter)
@UseInterceptors(SuccessInterceptor)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  getAllCat() {
    console.log('hello contorller');
    return { cats: 'all cat' };
  }

  @Get(':id')
  getOneCat(@Param('id', ParseIntPipe, PositiveIntPipe) id: number) {
    return 'one cat';
  }

  @Post()
  createCat() {
    return 'create cat';
  }

  @Put(':id')
  updateCat() {
    return 'update cat';
  }

  @Patch(':id')
  updatePartialCat() {
    return 'update';
  }

  @Delete()
  deleteCat() {
    return 'delete';
  }
}
