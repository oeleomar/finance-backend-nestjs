import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  IsOptional,
} from 'class-validator';
import { Match } from 'src/decorators/match.decorator';
import { Message } from 'src/utils/Message';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: Message.notEmpty('Nome') })
  name: string;

  @IsString()
  @IsNotEmpty({ message: Message.notEmpty('Email') })
  @IsEmail({}, { message: Message.notValid('Email') })
  email: string;

  @IsString()
  @IsNotEmpty({ message: Message.notEmpty('CPF') })
  cpf: string;

  @IsString()
  @IsNotEmpty({ message: Message.notEmpty('Senha') })
  @IsStrongPassword(
    {
      minLength: 8,
      minNumbers: 1,
      minLowercase: 1,
      minSymbols: 1,
      minUppercase: 1,
    },
    { message: Message.notStrong('Senha') },
  )
  password: string;

  @IsString()
  @IsNotEmpty({ message: Message.notEmpty('Confirma senha') })
  @Match('password', { message: Message.notMatch('Senhas') })
  confirmPassword: string;

  @IsString()
  @IsOptional()
  phone: string;
}
