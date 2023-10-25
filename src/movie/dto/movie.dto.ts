import { IsNotEmpty, Length } from 'class-validator';

export class CreateMovie {
  color: string;
  color2: string;
  video: string;
  // @IsNotEmpty({ message: 'Description is needed' })
  // description: string;
  @IsNotEmpty({ message: 'Movie name' })
  title: string;
  @IsNotEmpty({ message: 'Photo is required' })
  img: string;

  @IsNotEmpty({ message: 'User Should be included' })
  id: number;
}
