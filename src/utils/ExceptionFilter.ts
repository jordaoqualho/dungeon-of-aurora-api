import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  HttpCode,
  HttpStatus,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class ExceptionFilter extends BaseExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    if (exception instanceof Error) {
      if (exception instanceof BadRequestException) {
        status = HttpStatus.BAD_REQUEST;
        message = exception.message;
      } else if (exception instanceof NotFoundException) {
        status = HttpStatus.NOT_FOUND;
        message = 'Resource not found';
      } else if (exception instanceof UnauthorizedException) {
        status = HttpStatus.UNAUTHORIZED;
        message = 'Unauthorized';
      }
    }

    response.status(status).json({
      status: 'error',
      message,
      error: {
        code: status || null,
        message: exception?.message || message,
      },
    });
  }
}
