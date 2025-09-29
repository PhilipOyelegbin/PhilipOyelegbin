import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule, ThrottlerModuleOptions } from '@nestjs/throttler';
import { ProjectModule } from './project/project.module';
import { TestimonialModule } from './testimonial/testimonial.module';
import { AuthModule } from './auth/auth.module';
import { SeederModule } from './seeder/seeder.module';
import { SeederService } from './seeder/seeder.service';
import { User, UserSchema } from 'src/schemas/user.schema';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.getOrThrow<string>('DATABASE_URL'), // Access the MongoDB URI from the environment variable
      }),
      inject: [ConfigService],
    }),
    ThrottlerModule.forRootAsync({
      useFactory: () =>
        ({
          ttl: 60,
          limit: 5,
          throttlers: [], // Add the throttlers property here
        }) as ThrottlerModuleOptions,
    }),
    ProjectModule,
    TestimonialModule,
    AuthModule,
    SeederModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [AppService, SeederService],
})
export class AppModule {}
