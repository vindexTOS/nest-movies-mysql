import { IsNotEmpty, Length } from 'class-validator';

export class CreateMovie {
  @IsNotEmpty({ message: 'Movie name' })
  @Length(3, 255)
  title: string;
  @IsNotEmpty({ message: 'Need rating' })
  rating: number;
  @IsNotEmpty({ message: 'actors Array should be accesed' })
  actors: string[];
  @IsNotEmpty({ message: 'string Array should be accesed' })
  genre: string;
}
