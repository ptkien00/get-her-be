import { RegistrationStep } from '@prisma/client';

import { CommonEntity } from '@/common/entities/common.entity';

export class RegistrationStepEntity extends CommonEntity implements RegistrationStep {
  name: string;
}