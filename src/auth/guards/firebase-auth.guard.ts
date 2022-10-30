import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

import { IS_SKIP_AUTH_KEY } from '@/auth/constants';

@Injectable()
export class FirebaseAuthGuard extends AuthGuard('firebase-auth') {

  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {

    const isSkipAuth = this.reflector.getAllAndOverride<boolean>(IS_SKIP_AUTH_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isSkipAuth) {

      return true;
    }

    return super.canActivate(context);
  }
}