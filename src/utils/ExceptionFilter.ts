import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  HttpStatus,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

type Feedback = {
  timestamp?: string;
  status: number;
  error: string;
  message: string;
};

@Catch()
export class ExceptionFilter extends BaseExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    const feedback = this.createFeedback(exception);
    this.sendResponse(response, feedback);
  }

  private createFeedback(exception: any): Feedback {
    const feedback: Feedback = {
      // timestamp: new Date().toISOString(),
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      error: 'Internal Server Error',
      message: exception?.message || 'No message available',
    };

    if (exception instanceof BadRequestException) {
      feedback.status = HttpStatus.BAD_REQUEST;
      feedback.error = 'Bad Request';
      feedback.message = exception.message;
    } else if (exception instanceof NotFoundException) {
      feedback.status = HttpStatus.NOT_FOUND;
      feedback.error = 'Not Found';
      feedback.message = 'Resource not found on the database';
    } else if (exception instanceof UnauthorizedException) {
      feedback.status = HttpStatus.UNAUTHORIZED;
      feedback.error = 'Unauthorized';
      feedback.message = 'You are unauthorized for this action';
    }

    return feedback;
  }

  private sendResponse(response: any, feedback: Feedback) {
    response.status(feedback.status).json(feedback);
  }
}
