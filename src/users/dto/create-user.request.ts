import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class CreateUserRequest {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;
}
