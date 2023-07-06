import { Equals, IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Nome não pode ser vazio' })
  name: string;

  @IsNotEmpty({ message: 'Email não pode ser vazio' })
  @IsEmail({}, { message: 'Não é um email válido' })
  email: string;

  @IsNotEmpty({ message: 'CPF não pode ser vazio' })
  cpf: string;

  @IsNotEmpty({ message: 'Senha não pode ser vazio' })
  @IsStrongPassword(
    {
      minLength: 8,
      minNumbers: 1,
      minLowercase: 1,
      minSymbols: 1,
      minUppercase: 1,
    },
    { message: 'Senha não é forte o suficiente' },
  )
  password: string;

  @IsNotEmpty({ message: 'Confirma senha não pode ser vazio' })
  @Equals('password', { message: 'Senhas são diferentes' })
  confirmPassword: string;

  phone: string;
}
