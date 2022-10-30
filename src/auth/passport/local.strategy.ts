/* eslint-disable no-unused-vars */
import { Request } from 'express';
import { auth } from 'firebase-admin';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import { Strategy } from 'passport-strategy';

interface VerifyCallback {
  (decodedClaims: DecodedIdToken, done: VerifiedCallback): void;
}

interface VerifiedCallback {
  (err: any, user?: any, info?: any): void;
}

interface StrategyOptions {
  extractor: (req: Request) => string;
  passReqToCallback?: false | undefined;
}

export class LocalStrategy extends Strategy {

  readonly name = 'firebase-auth';

  constructor(private options: StrategyOptions, public verify: VerifyCallback) {
    super();
  }

  // eslint-disable-next-line consistent-return
  async authenticate(req: Request) {

    try {
      const sessionCookie = this.options.extractor(req);
      const decodedClaims = await auth().verifySessionCookie(sessionCookie, true);

      this.verify(decodedClaims, this.verified.bind(this));
    }
    catch (err) {

      return this.fail(err, 401);
    }
  }

  private verified(err: any, user?: any, info?: any) {

    if (err) {

      return this.error(err);
    }

    if (!user) {

      return this.fail(401);
    }

    return this.success(user, info);
  }
}