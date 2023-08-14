import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { UnauthorizedError } from './errors/unauthorized.error';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (user) {
      const passwordIsValid = await bcrypt.compare(password, user.password);

      if (passwordIsValid) {
        return {
          ...user,
          password: undefined,
        };
      }
    }

    throw new UnauthorizedError('Email ou senha digitados estão incorretos.');
  }
}
