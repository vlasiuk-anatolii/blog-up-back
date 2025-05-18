import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { validationSchema } from './config/validation';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CommentsModule } from './comments/comments.module';
import { RecaptchaModule } from './recaptcha/recaptcha.module';
import { HealthController } from './health.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, validationSchema }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.getOrThrow<string>('DB_HOST'),
        port: +configService.getOrThrow<string>('DB_PORT'),
        username: configService.getOrThrow<string>('DB_USER'),
        password: configService.getOrThrow<string>('DB_PASSWORD'),
        database: configService.getOrThrow<string>('DB_NAME'),
        schema: configService.get<string>('DB_SCHEMA'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    PostsModule,
    UsersModule,
    AuthModule,
    CommentsModule,
    RecaptchaModule,
    RecaptchaModule,
  ],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
