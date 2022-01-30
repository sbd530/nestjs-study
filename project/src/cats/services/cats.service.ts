import { UnauthorizedException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Cat } from '../cats.schema';
import { CatRequestDto } from '../dto/cats.request.dto';
import { CatsRepository } from '../cats.repository';

@Injectable()
export class CatsService {
  constructor(private readonly catsRepository: CatsRepository) { }

  async getAllCat() {
    const allCat = await this.catsRepository.findAll();
    const readOnlyCats = allCat.map((cat) => cat.readOnlyData);
    return readOnlyCats;
  }

  //* https://nestcats.s3.ap-northeast-2.amazonaws.com/cis/cats/cat01.jpg
  //* file.key = /cis/cats/cat01.jpg
  async uploadImg(cat: Cat, file: any) {
    const fileName = file.key;

    console.log(fileName);

    const newCat = await this.catsRepository.findByIdAndUpdateImg(
      cat.id,
      fileName,
    );
    console.log(newCat);
    return newCat;
  }

  async signUp(body: CatRequestDto) {
    const { email, name, password } = body;
    const isCatExist = await this.catsRepository.existByEmail(email);

    if (isCatExist) {
      throw new UnauthorizedException('The cat already exists'); //* HttpException + StatusCode 의 효과
    }

    const hashedPassword = await bcrypt.hash(password, 10); //* 비밀번호 해싱
    //* 저장
    const cat = await this.catsRepository.create({
      email,
      name,
      password: hashedPassword,
    });

    return cat.readOnlyData;
  }
}
