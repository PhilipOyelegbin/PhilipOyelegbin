/* eslint-disable no-useless-catch */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginAdminDto } from './dto/login-admin.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './../schemas/user.schema';
import { Model } from 'mongoose';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private testimonialModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async login(dto: LoginAdminDto) {
    try {
      const { email, password } = dto;

      const user = await this.testimonialModel.find({ email });
      if (!user || user.length === 0) {
        throw new UnauthorizedException('Invalid email or password');
      }

      const isPasswordValid = await argon.verify(user[0].password, password);
      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid email or password');
      }

      const access_token = this.jwtService.sign({
        sub: user[0]._id,
        email: user[0].email,
      });

      return { data: access_token };
    } catch (error) {
      throw error;
    }
  }

  // async logout(dto: LogoutAdminDto) {
  //   try {
  //     const blacklistedToken = new this.blacklistModel(dto);
  //     await blacklistedToken.save();

  //     return { message: 'Logged out successfully' };
  //   } catch (error) {
  //     throw error;
  //   }
  // }
}
