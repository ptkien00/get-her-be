import { Module } from '@nestjs/common';

import { AdminController } from '@/admin/admin.controller';
import { AdminService } from '@/admin/admin.service';

@Module({
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}