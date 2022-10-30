import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

import { Role } from '@/auth/role.enum';
import { ROLES_KEY } from '@/auth/constants';
import { UserEntity } from '@/users/entities/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {

    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {

      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user as UserEntity | undefined;

    if (!user) {

      return false;
    }

    return requiredRoles.some((role) => user.role === role);
  }
}