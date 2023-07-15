import { BaseEntity } from 'src/utils/base.entity';
import { cryptPassword } from 'src/utils/bcript';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'admin' })
export class Admin extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true, nullable: false })
  username: string;

  @Column('text', { nullable: false })
  password: string;

  @Column({ name: 'login_attempt', type: 'int', default: 0 })
  loginAttempts: number;

  @Column({ name: 'last_login_attempt', type: 'date', nullable: true })
  lastLoginAttempt: Date;

  @Column({ name: 'is_locked', type: 'boolean', default: false })
  isLocked: boolean;

  @BeforeInsert()
  cryptPassword() {
    this.password = cryptPassword(this.password);
  }
}
