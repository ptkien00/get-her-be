import { ConflictException, ForbiddenException, Injectable, Scope, UnauthorizedException } from '@nestjs/common';
import { auth } from 'firebase-admin';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { I18nService } from 'nestjs-i18n';

import { UsersService } from '@/users/users.service';
import { EnvService } from '@/config/env/env.service';
import { FirebaseUserDto } from '@/auth/dto/firebase-user.dto';
import { I18nDefs } from '@/i18n/i18n.enum';
import { UserEntity } from '@/users/entities/user.entity';
import { SetRoleDto } from '@/auth/dto/set-role.dto';
import { Role } from '@/auth/role.enum';

@Injectable({ scope: Scope.REQUEST })
export class AuthService {

  constructor(
    private readonly usersService: UsersService,
    private readonly envService: EnvService,
    private readonly i18Service: I18nService
  ) {}

  async register(firebaseUserDto: FirebaseUserDto, { adCampaign, adSourceId }: { adCampaign: string, adSourceId: number }): Promise<UserEntity> {

    const { idToken } = firebaseUserDto;

    try {
      const { uid, email, email_verified, role } = await auth().verifyIdToken(idToken);

      if (!role || role !== Role.User) {

        throw new UnauthorizedException(this.i18Service.t(I18nDefs.Unauthorized));
      }

      const isExists = this.usersService.exists(uid);

      if (isExists) {

        throw new ConflictException(this.i18Service.t(I18nDefs.AccountExists));
      }

      const user = await this.usersService.create({
        firebaseUid: uid,
        email: email_verified ? email : undefined,
        adCampaign,
        adSourceId,
      });
      user.role = Role.User;

      return user;
    }
    catch (err) {

      if (err instanceof PrismaClientKnownRequestError && 'P2002' === err.code) {

        throw new ConflictException(this.i18Service.t(I18nDefs.AccountExists));
      }

      throw err;
    }
  }

  async createSessionCookie(idToken: string) : Promise<{
    sessionCookie: string;
    expiresIn: number;
  }> {

    const expiresIn = this.envService.isProduction ?
      48 * 60 * 60 * 1000 // 48 hour
      : 60 * 60 * 24 * 14 * 1000; // 14 days

    const sessionCookie = await auth().createSessionCookie(idToken, { expiresIn });

    return {
      sessionCookie,
      expiresIn,
    };
  }

  async login(firebaseUserDto: FirebaseUserDto): Promise<UserEntity> {

    const { idToken } = firebaseUserDto;

    const { uid, email, email_verified, role } = await auth().verifyIdToken(idToken);

    if (!role || role !== Role.User) {

      throw new UnauthorizedException(this.i18Service.t(I18nDefs.Unauthorized));
    }

    let user = await this.usersService.findFirst({ firebaseUid: uid });

    user = await this.usersService.update(user.id, { email: email_verified ? email : undefined });
    user.role = Role.User;

    return user;
  }

  async logout(user: UserEntity): Promise<void> {

    await auth().revokeRefreshTokens(user.firebaseUid);
  }

  async setCustomClaims(setRoleDto: SetRoleDto) {

    const { idToken, role } = setRoleDto;
    const { uid, role: existingRole } = await auth().verifyIdToken(idToken);

    if (existingRole) {

      throw new ForbiddenException();
    }

    if ((role === Role.Admin && !this.envService.isProduction) || (role !== Role.Admin && Object.values(Role).includes(role))) {

      await auth().setCustomUserClaims(uid, { role });
    }

    throw new ForbiddenException();
  }
}