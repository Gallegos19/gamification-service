import { IsString } from 'class-validator';

export class FeaturePetDto {
  @IsString()
  petId!: string;
}
