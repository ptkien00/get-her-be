import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Prisma } from '@prisma/client';

import { PrismaService } from '@/prisma/prisma.service';
import { FirebaseCreateUserDto } from '@/auth/dto/firebase-create-user.dto';
import { UserEntity } from '@/users/entities/user.entity';
import { UpdateUserDto } from '@/users/dto/update-user.dto';

@Injectable()
export class UsersService {

  constructor(private readonly prismaService: PrismaService) {}

  async exists(firebaseUid: string): Promise<boolean> {
    return 0 < (await this.prismaService.user.count({ where: { firebaseUid } }));
  }

  async create(firebaseCreateUserDto: FirebaseCreateUserDto): Promise<UserEntity> {

    const user = await this.prismaService.$transaction(async (prisma) => {

      const newUser = await prisma.user.create({
        data: firebaseCreateUserDto,
        include: {
          adSource: true,
          registrationStep: true,
        },
      });

      return newUser;
    });

    return plainToInstance(UserEntity, user);
  }

  async findFirst(where: Prisma.UserWhereInput): Promise<UserEntity> {

    const user = await this.prismaService.user.findFirst({
      where,
      include: {
        registrationRoute: true,
        registrationStep: true,
        career: true,
        academicBackground: { include: { schoolType: true } },
      },
    });

    if(!user) throw new NotFoundException();

    return plainToInstance(UserEntity, user);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {

    const user = await this.prismaService.user.update({
      data: {
        ...updateUserDto,
        registrationCompletedAt: 12 === updateUserDto.registrationStepId ? new Date() : undefined,
      },
      where: { id },
    });

    return plainToInstance(UserEntity, user);
  }
}