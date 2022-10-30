import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

import { AuthService } from '@/auth/auth.service';
import { SkipAuth } from '@/auth/decorators/skip-auth.decorator';
import { UserEntity } from '@/users/entities/user.entity';
import { AdService } from '@/ad/ad.service';
import { FirebaseUserDto } from '@/auth/dto/firebase-user.dto';
import { EnvService } from '@/config/env/env.service';
import { SESSION_COOKIE } from '@/auth/constants';
import { Roles } from '@/auth/decorators/roles.decorator';
import { CurrentUser } from '@/users/decorators/current-user.decorator';
import { Role } from '@/auth/role.enum';

@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService,
    private readonly adService: AdService,
    private readonly envService: EnvService
  ) {}

  @Post('register')
  @SkipAuth()
  async register(@Req() req: Request, @Res({ passthrough: true }) res: Response, @Body('user') firebaseUserDto: FirebaseUserDto): Promise<UserEntity> {

    const adCampaign = this.adService.getAdCampaign(req);
    const adSourceId = this.adService.getAdSourceId(req);

    const user = await this.authService.register(firebaseUserDto, { adCampaign, adSourceId });
    const { sessionCookie, expiresIn } = await this.authService.createSessionCookie(firebaseUserDto.idToken);

    res.cookie(SESSION_COOKIE, sessionCookie, {
      maxAge: expiresIn,
      httpOnly: true,
      secure: this.envService.isProduction,
      sameSite: 'lax',
    });

    return user;
  }

  @Post('login')
  @SkipAuth()
  async login(@Res({ passthrough: true }) res: Response, @Body('user') firebaseUserDto: FirebaseUserDto) {

    const user = await this.authService.login(firebaseUserDto);
    const { sessionCookie, expiresIn } = await this.authService.createSessionCookie(firebaseUserDto.idToken);

    res.cookie(SESSION_COOKIE, sessionCookie, {
      maxAge: expiresIn,
      httpOnly: true,
      secure: this.envService.isProduction,
      sameSite: 'lax',
    });

    return user;
  }

  @Post('logout')
  @Roles(Role.Admin, Role.User)
  async logout(@Res({ passthrough: true }) res: Response, @CurrentUser() user: UserEntity) {

    await this.authService.logout(user);
    res.clearCookie(SESSION_COOKIE);
  }
}