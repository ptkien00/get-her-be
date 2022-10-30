import { User } from '@prisma/client';
import { IsBoolean, IsEmail, IsEnum, IsIn, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Matches } from 'class-validator';

import { BIRTHDAY, FURIGANA } from '@/users/constants';
import { Gender } from '@/common/enums';

type TUpdateUserDto = Partial<Omit<User, 'id' | 'deactivated' | 'firebaseUid' | 'createdAt' | 'updatedAt'>>;

export class UpdateUserDto implements TUpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  familyName?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  givenName?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @Matches(FURIGANA)
  familyNameFurigana?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @Matches(FURIGANA)
  givenNameFurigana?: string;

  @IsString()
  @IsOptional()
  @Matches(BIRTHDAY)
  birthday?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsInt()
  @IsEnum(Gender)
  @IsOptional()
  gender?: number;

  @IsOptional()
  @IsNumber()
  registrationRouteId?: number;

  @IsOptional()
  @IsNumber()
  registrationStepId?: number;

  @IsOptional()
  @IsBoolean()
  hiddenFlg?: boolean;
}