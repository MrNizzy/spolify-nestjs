import { IsEmail, MaxLength, MinLength } from 'class-validator';

export class LoginDtoAuth {
  @IsEmail()
  email: string;

  @MinLength(12)
  @MaxLength(50)
  password: string;
}
