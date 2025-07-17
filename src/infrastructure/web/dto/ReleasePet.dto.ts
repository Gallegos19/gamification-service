import { IsString } from 'class-validator';

export class ReleasePetDto {
  @IsString()
  userId!: string;

  @IsString()
  petId!: string;
}
