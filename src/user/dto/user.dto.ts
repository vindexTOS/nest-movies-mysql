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
