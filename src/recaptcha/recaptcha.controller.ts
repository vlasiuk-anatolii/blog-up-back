import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { RecaptchaService } from './recaptcha.service';
import { RecaptchaVerifyDto } from './dto/verify-token.request';

@Controller('recaptcha')
export class RecaptchaController {
  constructor(private recaptchaService: RecaptchaService) {}

  @Post('verify')
  async verifyRecaptcha(@Body() body: RecaptchaVerifyDto) {
    const score = await this.recaptchaService.verifyToken(
      body.token,
      body.action,
    );

    if (score === null) {
      throw new UnauthorizedException('reCAPTCHA verification failed');
    }

    const threshold = 0.5;

    if (score < threshold) {
      throw new UnauthorizedException('Bot activity detected');
    }

    return { success: true, score };
  }
}
