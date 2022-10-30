import { AdSource } from '@prisma/client';

import { CommonEntity } from '@/common/entities';

export class AdSourceEntity extends CommonEntity implements AdSource {
  type: string;
}