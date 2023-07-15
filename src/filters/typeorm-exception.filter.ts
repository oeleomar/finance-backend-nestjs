import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { ViolateUniqueKeyContrainst } from 'src/errors/violate-unique-key-exception.error';
import {
  CannotCreateEntityIdMapError,
  EntityNotFoundError,
  QueryFailedError,
} from 'typeorm';

@Catch(
  CannotCreateEntityIdMapError,
  ViolateUniqueKeyContrainst,
  EntityNotFoundError,
  QueryFailedError,
)
export class TypeOrmExceptionFilter implements ExceptionFilter {
  private status = 500;
  private errorMessage = 'Ocorreu um erro na execução';

  catch(
    exception:
      | QueryFailedError
      | EntityNotFoundError
      | CannotCreateEntityIdMapError
      | ViolateUniqueKeyContrainst,
    host: ArgumentsHost,
  ) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    switch (exception.constructor) {
      case QueryFailedError:
        this.status = HttpStatus.UNPROCESSABLE_ENTITY;
        this.errorMessage =
          'Não foi possível encontrar, tente novamente mais tarde';
        break;

      case EntityNotFoundError:
        this.status = HttpStatus.UNPROCESSABLE_ENTITY;
        this.errorMessage = 'Não foi possivel localizar';
        break;

      case CannotCreateEntityIdMapError:
        this.status = HttpStatus.UNPROCESSABLE_ENTITY;
        this.errorMessage = exception.message;
        break;

      case ViolateUniqueKeyContrainst:
        this.status = HttpStatus.UNPROCESSABLE_ENTITY;
        this.errorMessage = exception.message;
        break;

      default:
        this.status = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    response.status(this.status).json({
      error: this.errorMessage,
    });
  }
}
