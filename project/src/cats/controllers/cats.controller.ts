import {
  Body,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  UseFilters,
  UploadedFile,
} from '@nestjs/common';
import { Controller, Get, Post } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { CatsService } from 'src/cats/services/cats.service';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { CatRequestDto } from 'src/cats/dto/cats.request.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ReadOnlyCatDto } from 'src/cats/dto/cat.dto';
import { AuthService } from 'src/auth/auth.service';
import { LoginRequestDto } from 'src/auth/dto/login.request.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { CurrentUser } from 'src/common/decorators/user.decorator';
// import { FilesInterceptor } from '@nestjs/platform-express';
// import { multerOptions } from 'src/common/utils/multer.options';
import { Cat } from 'src/cats/cats.schema';
import { AmazonS3FileInterceptor } from 'nestjs-multer-extended';

@Controller('cats')
@UseFilters(HttpExceptionFilter)
@UseInterceptors(SuccessInterceptor)
export class CatsController {
  constructor(
    private readonly catsService: CatsService,
    private readonly authService: AuthService,
  ) { }
  //* req를 그대로 받지 않고, 커스텀 데코레이터로 인자를 커스터마이징한다.
  @ApiOperation({ summary: '현재 고양이 가져오기' })
  @UseGuards(JwtAuthGuard)
  @Get()
  getCurrentCat(@CurrentUser() cat: Cat) {
    return cat.readOnlyData;
  }

  @ApiResponse({
    status: 500,
    description: 'Server Error...',
  })
  @ApiResponse({
    status: 200,
    description: '성공!',
    type: ReadOnlyCatDto,
  })
  @ApiOperation({ summary: '회원가입' })
  @Post()
  async signUp(@Body() body: CatRequestDto) {
    return await this.catsService.signUp(body);
  }

  @ApiOperation({ summary: '로그인' })
  @Post('login')
  logIn(@Body() data: LoginRequestDto) {
    return this.authService.jwtLogIn(data);
  }

  @ApiOperation({ summary: '로그아웃' })
  @Post('logout')
  logOut() {
    return 'logout';
  }

  @ApiOperation({ summary: '고양이 이미지 업로드' })
  // @UseInterceptors(FilesInterceptor('image', 10, multerOptions('cats')))
  @UseInterceptors(
    AmazonS3FileInterceptor('image', {
      dynamicPath: 'cats',
    }),
  )
  @UseGuards(JwtAuthGuard)
  @Post('upload')
  uploadCatImg(@UploadedFile() file: any, @CurrentUser() cat: Cat) {
    console.log(file);

    // return 'uploadImg';
    // return { image: `http://localhost:8000/media/cats/${files[0].filename}` };
    return this.catsService.uploadImg(cat, file);
  }

  @ApiOperation({ summary: '모든 고양이 가져오기' })
  @Get('all')
  getAllCat() {
    return this.catsService.getAllCat();
  }
}
