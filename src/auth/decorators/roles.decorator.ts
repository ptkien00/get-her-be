import { SetMetadata } from '@nestjs/common';

import { ROLES_KEY } from '@/auth/constants';
import { Role } from '@/auth/role.enum';

export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);