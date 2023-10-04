import { IsNotEmpty, Length } from 'class-validator';

export class CreateUserValid {
  @IsNotEmpty({ message: 'User name' })
  @Length(3, 255)
  username: string;
  @IsNotEmpty({ message: 'Password is required' })
  password: string;
  @IsNotEmpty({ message: 'Password does not match' })
  confirmPassword: string;
}

export class LogInUserValid {
  @IsNotEmpty({ message: 'Fill username' })
  username: string;

  @IsNotEmpty({ message: 'Fill password' })
  password: string;
}
