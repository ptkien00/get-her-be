import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { validate } from '@/config/env/env.validation';
import { EnvService } from './env.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      validate,
      validationOptions: {
        allowUnknown: false,
        abortEarly: true,
      },
      isGlobal: true,
    }),
  ],
  exports: [EnvService],
  providers: [EnvService],
})
export class EnvModule {}