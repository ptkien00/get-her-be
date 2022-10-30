import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';

import { cookieExtractor } from '@/auth/passport/extractor';
import { LocalStrategy } from '@/auth/passport/local.strategy';
import { Role } from '@/auth/role.enum';
import { UserEntity } from '@/users/entities/user.entity';
import { UsersService } from '@/users/users.service';
import { AdminService } from '@/admin/admin.service';
import { AdminEntity } from '@/admin/admin.entity';

@Injectable()
export class FirebaseAuthStrategy extends PassportStrategy(LocalStrategy) {

  constructor(
    private readonly usersService: UsersService,
    private readonly adminService: AdminService
  ) {
    super({ extractor: cookieExtractor });
  }

  async validate(decodedClaims: DecodedIdToken): Promise<UserEntity | AdminEntity> {

    const { uid, role } = decodedClaims;

    if (!role) {

      throw new UnauthorizedException('Role is undefined');
    }

    if (role === Role.User) {

      const user = await this.usersService.findFirst({ firebaseUid: uid });
      user.role = role;

      return user;
    }

    if (role === Role.Admin) {

      const admin = await this.adminService.findOne({ firebaseUid: uid });
      admin.role = role;

      return admin;
    }

    throw new UnauthorizedException();
  }
}