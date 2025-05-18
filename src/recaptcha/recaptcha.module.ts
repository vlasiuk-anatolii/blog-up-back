import { Module } from '@nestjs/common';
import { RecaptchaController } from './recaptcha.controller';
import { RecaptchaService } from './recaptcha.service';

@Module({
  imports: [],
  providers: [RecaptchaService],
  controllers: [RecaptchaController],
})
export class RecaptchaModule {}
