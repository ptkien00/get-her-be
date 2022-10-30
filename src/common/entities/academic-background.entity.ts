import { AcademicBackground } from '@prisma/client';

import { CommonEntity } from '@/common/entities/common.entity';
import { SchoolTypeEntity } from '@/common/entities/school-type.entity';

export class AcademicBackgroundEntity extends CommonEntity implements AcademicBackground {
  schoolName: string;

  department: string;

  graduatedAt: Date;

  userId: string;

  schoolTypeId: number;

  schoolType: SchoolTypeEntity;
}