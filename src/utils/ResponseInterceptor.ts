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
    return next.handle().pipe(map((data) => this.getResponse(context, data)));
  }

  private getResponse(context: ExecutionContext, data: any) {
    const response = context.switchToHttp().getResponse();
    const responseStatus = response.statusCode;
    const responseMessage = this.getSuccessMessage(context);

    return {
      status: responseStatus,
      message: responseMessage,
      data,
    };
  }

  private getSuccessMessage(context: ExecutionContext): string {
    const httpMethod = context.switchToHttp().getRequest().method.toUpperCase();
    const httpUrl = context.switchToHttp().getRequest().url;

    switch (httpMethod) {
      case 'POST':
        return this.getSuccessMessageForPost(httpUrl);
      case 'PUT':
        return 'Update was successful';
      case 'DELETE':
        return 'Deletion was successful';
      default:
        return 'Request received successfully';
    }
  }

  private getSuccessMessageForPost(httpUrl: string): string {
    return httpUrl.includes('login')
      ? 'Login was successful'
      : 'Creation was successful';
  }
}
