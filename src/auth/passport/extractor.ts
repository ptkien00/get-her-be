import { UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

import { SESSION_COOKIE } from '@/auth/constants';

export function cookieExtractor(req: Request): string {

  const cookies = req.cookies;

  if (!cookies || !cookies[SESSION_COOKIE]) {

    throw new UnauthorizedException();
  }

  return cookies[SESSION_COOKIE];
}