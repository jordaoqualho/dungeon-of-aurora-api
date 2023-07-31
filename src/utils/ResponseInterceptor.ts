import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map((data) => this.handleResponse(data)));
  }

  private handleResponse = (data: any) => {
    const response = {
      status: 'success',
      message: data
        ? 'Creation was successful'
        : 'Request received successfully ',
      data,
    };

    return response;
  };
}
