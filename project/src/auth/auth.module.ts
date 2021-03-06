import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { CatsModule } from 'src/cats/cats.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    //* JWT를 만들 때 필요한 모듈
    JwtModule.register({
      secret: process.env.JWT_SECRET,  //* JwtStrategy 와 맞춰줘야 함
      signOptions: { expiresIn: '1y' }, //* 토큰 만료
    }),
    forwardRef(() => CatsModule), //* Circular dependency 해결
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule { }
