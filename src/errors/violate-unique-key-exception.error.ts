import { HttpException, HttpStatus } from '@nestjs/common';

export class ViolateUniqueKeyContrainst extends HttpException {
  constructor(type = 'Informação') {
    super(
      `${type} já existe, insira novos dados`,
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}
