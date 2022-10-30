import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

import { Role } from '@/auth/role.enum';

export class FirebaseUserDto {
  @IsString()
  @IsNotEmpty()
  idToken!: string;

  @IsNotEmpty()
  @IsEnum(Role)
  role!: Role;
}