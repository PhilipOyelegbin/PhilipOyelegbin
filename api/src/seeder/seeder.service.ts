import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'schemas/user.schema';
import * as argon from 'argon2';

@Injectable()
export class SeederService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private config: ConfigService,
  ) {}

  async seedUsers() {
    const userData = {
      email: this.config.getOrThrow('SEED_ADMIN_EMAIL') || '',
      password: this.config.getOrThrow('SEED_ADMIN_PASSWORD') || '',
    };

    const existingUser = await this.userModel.find({ email: userData.email });
    const hash = await argon.hash(userData.password);
    userData.password = hash;

    if (!existingUser || existingUser.length === 0) {
      await this.userModel.insertOne(userData);
      console.log('Users seeded successfully!');
    } else {
      console.log('Users already exist, skipping seed.');
    }
  }
}
