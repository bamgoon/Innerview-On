import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { UserRoleType } from '../UserRoleType';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  account: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  phoneNumber: string;

  @Column({ type: 'enum', enum: UserRoleType })
  role: UserRoleType;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
