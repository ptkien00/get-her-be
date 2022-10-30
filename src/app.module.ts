import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import * as path from 'path';
import { I18nModule } from 'nestjs-i18n';

import { EnvModule } from '@/config/env/env.module';
import { PrismaModule } from '@/prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AdModule } from '@/ad/ad.module';
import { FirebaseAuthGuard } from '@/auth/guards/firebase-auth.guard';
import { RolesGuard } from '@/auth/guards/role.guard';
import { AdminModule } from '@/admin/admin.module';

@Module({
  imports: [
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: 'production' !== process.env.NODE_ENV,
      },
    }),
    EnvModule,
    PrismaModule,
    UsersModule,
    AuthModule,
    AdModule,
    AdminModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: FirebaseAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}