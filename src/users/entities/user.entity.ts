import { User } from '@prisma/client';
import { Exclude } from 'class-transformer';

import { AcademicBackgroundEntity, CareerEntity, RegistrationRouteEntity, RegistrationStepEntity } from '@/common/entities';
import { TRole } from '@/auth/role.enum';

type TUser = User & {
  role?: TRole;
  registrationRoute?: RegistrationRouteEntity;
  registrationStep?: RegistrationStepEntity;
  adSource?: any;
  career?: CareerEntity;
  academicBackground?: AcademicBackgroundEntity;
}

export class UserEntity implements TUser {
  id: string;

  deactivated: boolean;

  familyName: string;

  givenName: string;

  familyNameFurigana: string;

  givenNameFurigana: string;

  birthday: string;

  email: string;

  gender: number;

  @Exclude({ toPlainOnly: true })
  registrationRouteId: number;

  @Exclude({ toPlainOnly: true })
  registrationStepId: number;

  registrationCompletedAt: Date;

  hiddenFlg: boolean;

  @Exclude({ toPlainOnly: true })
  firebaseUid: string;

  @Exclude({ toPlainOnly: true })
  adSourceId: number;

  adCampaign: string;

  createdAt: Date;

  updatedAt: Date;

  role?: TRole;

  registrationRoute?: RegistrationRouteEntity;

  registrationStep?: RegistrationStepEntity;

  adSource?: any;

  career?: CareerEntity;

  academicBackground?: AcademicBackgroundEntity;
}