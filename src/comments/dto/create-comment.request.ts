import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsUrl,
  IsEmail,
  IsNumber,
} from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  postId: number;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsUrl()
  homepage?: string;

  @IsNotEmpty()
  @IsString()
  text: string;

  @IsOptional()
  @IsString()
  fileName?: string;
}
