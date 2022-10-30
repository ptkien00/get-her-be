import { Admin } from '@prisma/client';
import { Exclude } from 'class-transformer';

import { Role } from '@/auth/role.enum';

type TAdminEntity = Admin & {
  role?: Role;
}

export class AdminEntity implements TAdminEntity {
  id: string;

  @Exclude({ toPlainOnly: true })
  deactivated: boolean;

  @Exclude({ toPlainOnly: true })
  firebaseUid: string;

  @Exclude({ toPlainOnly: true })
  createdAt: Date;

  @Exclude({ toPlainOnly: true })
  updatedAt: Date;

  role?: Role;
}