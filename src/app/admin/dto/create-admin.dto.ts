import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';
import { Message } from 'src/utils/Message';

export class CreateAdminDto {
  @IsString()
  @IsNotEmpty({ message: Message.notEmpty('Nome') })
  username: string;

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
}
