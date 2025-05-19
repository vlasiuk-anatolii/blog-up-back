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
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          url: configService.getOrThrow<string>('DB_URL'),
          synchronize: false,
          autoLoadEntities: true,
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        };
      },
    }),
    PostsModule,
    UsersModule,
    AuthModule,
    CommentsModule,
    RecaptchaModule,
  ],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
