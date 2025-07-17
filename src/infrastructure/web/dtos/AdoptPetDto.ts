import { IsString, IsOptional } from 'class-validator';

export class AdoptPetDto {
  @IsString()
  petId!: string;

  @IsOptional()
  @IsString()
  nickname?: string;
}
