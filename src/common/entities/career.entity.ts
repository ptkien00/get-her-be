import { Career } from '@prisma/client';

import { CommonEntity } from '@/common/entities/common.entity';

export class CareerEntity extends CommonEntity implements Career {
  companyName: string;

  department: string;

  importantPostFlg: boolean;

  detail: string;

  userId: string;
}