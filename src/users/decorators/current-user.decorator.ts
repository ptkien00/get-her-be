import { createParamDecorator, ExecutionContext, NotFoundException } from '@nestjs/common';
import { Request } from 'express';

import { UserEntity } from '@/users/entities/user.entity';

export const CurrentUser = createParamDecorator((_, input: ExecutionContext) => {

  const { user } = input.switchToHttp().getRequest<Request>();

  if (user instanceof UserEntity) {

    return user;
  }

  throw new NotFoundException();
});