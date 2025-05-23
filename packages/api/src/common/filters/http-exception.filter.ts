import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    if (typeof exceptionResponse === 'string') {
      response.status(status).json({
        statusCode: status,
        message: exception.message,
      });
    } else {
      response.status(status).json({
        statusCode: status,
        ...exceptionResponse,
      });
    }
  }
}
