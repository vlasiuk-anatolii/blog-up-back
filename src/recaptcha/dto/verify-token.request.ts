import { IsNotEmpty, IsString } from 'class-validator';

export class RecaptchaVerifyDto {
  @IsNotEmpty()
  @IsString()
  token: string;

  @IsNotEmpty()
  @IsString()
  action: string;
}
