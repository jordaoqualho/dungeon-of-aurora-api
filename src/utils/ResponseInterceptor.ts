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
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(map((data) => this.getResponseObject(context, data)));
  }

  private getResponseObject(context: ExecutionContext, data: any) {
    const response: Record<string, any> = {
      status: 'success',
      message: 'Request received successfully',
      data,
    };

    const httpMethod = context.switchToHttp().getRequest().method.toUpperCase();
    const httpUrl = context.switchToHttp().getRequest().url;

    switch (httpMethod) {
      case 'POST':
        response.message = httpUrl.includes('login')
          ? 'Login was successful'
          : 'Creation was successful';
        break;
      case 'PUT':
        response.message = 'Update was successful';
        break;
      case 'DELETE':
        response.message = 'Deletion was successful';
        break;
      default:
        break;
    }

    return response;
  }
}