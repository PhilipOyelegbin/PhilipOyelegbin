/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  // handleRequest(err: any, user: any, info: any) {
  //   console.log('JWT Guard Triggered', info);
  //   if (err) {
  //     throw err;
  //   }
  //   if (!user) {
  //     throw new UnauthorizedException('Token invalid');
  //   }
  //   return user;
  // }
}
