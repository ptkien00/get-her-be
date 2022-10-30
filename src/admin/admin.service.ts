import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Prisma } from '@prisma/client';

import { PrismaService } from '@/prisma/prisma.service';
import { AdminEntity } from '@/admin/admin.entity';

@Injectable()
export class AdminService {

  constructor(private readonly prismaService: PrismaService) {}

  async findOne(where: Prisma.AdminWhereUniqueInput): Promise<AdminEntity> {

    const admin = await this.prismaService.admin.findUnique({ where });

    if (!admin) throw new NotFoundException();

    return plainToInstance(AdminEntity, admin);
  }
}