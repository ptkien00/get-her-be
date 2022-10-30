import { IsNotEmpty, IsString } from 'class-validator';

export class FirebaseUserDto {
  @IsString()
  @IsNotEmpty()
  idToken: string;
}