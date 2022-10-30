import { Controller, Get } from '@nestjs/common';

import { UsersService } from '@/users/users.service';
import { Roles } from '@/auth/decorators/roles.decorator';
import { CurrentUser } from '@/users/decorators/current-user.decorator';
import { UserEntity } from '@/users/entities/user.entity';
import { Role } from '@/auth/role.enum';

@Controller('users')
export class UsersController {

  constructor(private readonly usersService: UsersService) {}

  @Get('current')
  @Roles(Role.Admin, Role.User)
  getCurrentUser(@CurrentUser() user: UserEntity) {
    return user;
  }
}