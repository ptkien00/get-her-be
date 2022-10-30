import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

import { Role } from '@/auth/role.enum';

export class SetRoleDto {
  @IsString()
  @IsNotEmpty()
  idToken!: string;

  @IsNotEmpty()
  @IsEnum(Role)
  role!: Role;
}