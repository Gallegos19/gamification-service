import { IsString, Length } from 'class-validator';

export class UpdatePetNicknameDto {
  @IsString()
  userId!: string;

  @IsString()
  petId!: string;

  @IsString()
  @Length(2, 32)
  nickname!: string;
}
