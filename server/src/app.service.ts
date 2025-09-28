import { Injectable } from '@nestjs/common';
import { SeederService } from './seeder/seeder.service';

@Injectable()
export class AppService {
  constructor(private readonly seederService: SeederService) {}

  async onModuleInit() {
    await this.seederService.seedUsers();
  }
}
