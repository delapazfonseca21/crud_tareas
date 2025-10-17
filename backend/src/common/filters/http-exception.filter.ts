import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

/**
 * Filtro global de excepciones HTTP
 * 
 * Captura todas las excepciones HTTP y las formatea de manera consistente
 * para proporcionar respuestas de error claras y estructuradas al cliente.
 */
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    // Extraer el mensaje de error
    const message =
      typeof exceptionResponse === 'object' && 'message' in exceptionResponse
        ? exceptionResponse['message']
        : exception.message;

    // Construir respuesta de error estructurada
    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message: Array.isArray(message) ? message : [message],
    };

    // Log del error en consola (en producción usar un logger apropiado)
    console.error(
      `[${errorResponse.timestamp}] ${errorResponse.method} ${errorResponse.path} - Status: ${status}`,
      message,
    );

    // Enviar respuesta al cliente
    response.status(status).json(errorResponse);
  }
}
