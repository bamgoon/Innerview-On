import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class Room extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  mainTitle: string;

  @Column()
  subTitle: string;

  @Column()
  openDate: Date;

  @Column()
  closeDate: Date;

  @Column()
  entryCode: String;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToMany(() => User)
  @JoinTable()
  users: User[];
}
