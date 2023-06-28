import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  cpf: string;

  @Column()
  password: string;

  @Column()
  phone: string;

  @Column({ name: 'login_attempt', type: 'number' })
  loginAttempts: number;

  @Column({ name: 'last_login_attempt', type: 'date' })
  lastLoginAttempt: Date;

  @Column({ name: 'is_locked', type: 'boolean' })
  isLocked: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
