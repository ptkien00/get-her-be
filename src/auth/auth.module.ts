import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from '@/auth/auth.controller';
import { AuthService } from '@/auth/auth.service';
import { UsersModule } from '@/users/users.module';
import { AdModule } from '@/ad/ad.module';
import { FirebaseAuthStrategy } from '@/auth/passport/firebase-auth.strategy';
import { AdminModule } from '@/admin/admin.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService, FirebaseAuthStrategy],
  imports: [
    UsersModule,
    PassportModule,
    AdModule,
    AdminModule,
  ],
})
export class AuthModule {}