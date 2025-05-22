import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsEmail({}, { 
    message: 'Некорректный формат email'
  })
  email!: string;

  @IsString({ message: 'Пароль должен быть строкой' })
  @MinLength(6, { message: 'Пароль должен быть не менее 6 символов' })
  password!: string;
}

export class LoginDto {
  @IsEmail({}, { 
    message: 'Некорректный формат email' 
  })
  email!: string;

  @IsString({ message: 'Пароль должен быть строкой' })
  @MinLength(6, { message: 'Пароль должен быть не менее 6 символов' })
  password!: string;
}

export class ForgotPasswordDto {
  @IsEmail({}, { 
    message: 'Некорректный формат email' 
  })
  email!: string;
}

export class ResetPasswordDto {
  @IsString({ message: 'Токен должен быть строкой' })
  token!: string;

  @IsString({ message: 'Пароль должен быть строкой' })
  @MinLength(6, { message: 'Пароль должен быть не менее 6 символов' })
  password!: string;
} 