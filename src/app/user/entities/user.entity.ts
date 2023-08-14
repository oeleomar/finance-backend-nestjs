import { BaseEntity } from 'src/utils/base.entity';
import { cryptPassword } from 'src/utils/bcript';
import { BeforeInsert, Column, Entity } from 'typeorm';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Column('text')
  name: string;

  @Column('text', { unique: true })
  email: string;

  @Column('text', { unique: true })
  cpf: string;

  @Column('text')
  password: string;

  @Column('text', {
    nullable: true,
  })
  phone: string;

  @Column({ name: 'login_attempt', type: 'int', default: 0 })
  loginAttempts: number;

  @Column({ name: 'last_login_attempt', type: 'date', nullable: true })
  lastLoginAttempt: Date;

  @Column({ name: 'is_locked', type: 'boolean', default: false })
  isLocked: boolean;

  @Column({
    name: 'is_authorized',
    type: 'boolean',
    default: false,
    nullable: false,
  })
  isAuthorized: boolean;

  @BeforeInsert()
  cryptPassword() {
    this.password = cryptPassword(this.password);
  }

  @BeforeInsert()
  formatCPF() {
    this.cpf = this.cpf.replace(/[^0-9]/g, '');
  }
}
