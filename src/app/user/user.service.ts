import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    return await this.userRepository.save(
      this.userRepository.create(createUserDto),
    );
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } });

    //throw new NotFoundException(error.message);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOneOrFail({ where: { id } });

    this.userRepository.merge(user, updateUserDto);
    return await this.userRepository.save(user);
  }

  async remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
