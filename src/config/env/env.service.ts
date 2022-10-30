import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Environment } from '@/config/env/env.validation';

@Injectable()
export class EnvService {
  constructor(private readonly configService: ConfigService) {}

  get isProduction(): boolean {
    return Environment.Production === this.configService.get('NODE_ENV');
  }

  get frontendOrigin(): string {
    return this.configService.get('FRONTEND_ORIGIN');
  }

  get firebaseProjectId(): string {
    return this.configService.get('FIREBASE_PROJECT_ID');
  }

  get firebasePrivateKey(): string {
    return this.configService.get<string>('FIREBASE_PRIVATE_KEY').replace(/\\n/g, '\n');
  }

  get firebaseClientEmail() : string {
    return this.configService.get('FIREBASE_CLIENT_EMAIL');
  }

  get isStaging(): string {
    return this.configService.get('IS_STAGING');
  }
}