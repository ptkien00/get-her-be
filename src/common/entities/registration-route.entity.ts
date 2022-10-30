import { RegistrationRoute } from '@prisma/client';

import { CommonEntity } from '@/common/entities/common.entity';

export class RegistrationRouteEntity extends CommonEntity implements RegistrationRoute {
  name: string;
}