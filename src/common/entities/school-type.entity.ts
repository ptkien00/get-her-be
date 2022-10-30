import { SchoolType } from '@prisma/client';

import { CommonEntity } from '@/common/entities/common.entity';

export class SchoolTypeEntity extends CommonEntity implements SchoolType {
  name: string;
}