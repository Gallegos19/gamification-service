import { IsString } from 'class-validator';

export class GetFeaturedPetDto {
  @IsString()
  userId!: string;
}
