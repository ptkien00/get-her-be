import { Exclude } from 'class-transformer';

export class CommonEntity {
  id!: number;

  @Exclude({ toPlainOnly: true })
  createdAt!: Date;

  @Exclude({ toPlainOnly: true })
  updatedAt!: Date;
}