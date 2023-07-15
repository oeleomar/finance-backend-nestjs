import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
  ) {}

  async create(createAdminDto: CreateAdminDto) {
    const admin = await this.adminRepository.findOne({
      where: { username: createAdminDto.username },
    });

    if (admin) {
      return {
        message: `Admin já cadastrado`,
        code: HttpStatus.UNPROCESSABLE_ENTITY,
      };
    } else {
      return await this.adminRepository.save(
        this.adminRepository.create(createAdminDto),
      );
    }
  }

  findAll() {
    console.log('Ola');
    return `This action returns all admin`;
  }

  findOne(id: number) {
    return `This action returns a #${id} admin`;
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return `This action updates a #${id} admin`;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}
