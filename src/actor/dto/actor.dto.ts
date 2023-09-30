import { IsNotEmpty, Length } from 'class-validator';

export class CreateActor {
  @IsNotEmpty({ message: 'actor should have name' })
  @Length(3, 255)
  name: string;
}
