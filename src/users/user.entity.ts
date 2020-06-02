import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  Entity,
} from 'typeorm';

@Entity('user')
export class UsersEntity {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column('text')
  firstName: string;

  @Column('text')
  lastName: string;

  @Column('text')
  email: string;

  @Column('text')
  password: string;

  @Column('int', { default: 0 })
  refreshCount: number;

  @CreateDateColumn()
  created: Date;
}
