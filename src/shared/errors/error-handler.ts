import { GraphQLFormattedError } from 'graphql';

interface ErrorDetail {
  code: string;
  statusCode: number;
}

const errorMapping: Record<string, ErrorDetail> = {
  UNAUTHENTICATED: { code: 'UNAUTHENTICATED', statusCode: 401 },
  UNAUTHORIZED: { code: 'UNAUTHORIZED', statusCode: 403 },
  FORBIDDEN: { code: 'FORBIDDEN', statusCode: 403 },
  NOT_FOUND: { code: 'NOT_FOUND', statusCode: 404 },
  INTERNAL_SERVER_ERROR: { code: 'INTERNAL_SERVER_ERROR', statusCode: 500 },
  BAD_REQUEST: { code: 'BAD_REQUEST', statusCode: 400 },
  CONFLICT: { code: 'CONFLICT', statusCode: 409 },
  UNPROCESSABLE_ENTITY: { code: 'UNPROCESSABLE_ENTITY', statusCode: 422 },
  INVALID_CREDENTIALS: { code: 'INVALID_CREDENTIALS', statusCode: 401 },
  TOO_MANY_REQUESTS: { code: 'TOO_MANY_REQUESTS', statusCode: 429 },
  SERVICE_UNAVAILABLE: { code: 'SERVICE_UNAVAILABLE', statusCode: 503 },
  GATEWAY_TIMEOUT: { code: 'GATEWAY_TIMEOUT', statusCode: 504 },
  BAD_GATEWAY: { code: 'BAD_GATEWAY', statusCode: 502 },
  REQUEST_TIMEOUT: { code: 'REQUEST_TIMEOUT', statusCode: 408 },
  METHOD_NOT_ALLOWED: { code: 'METHOD_NOT_ALLOWED', statusCode: 405 },
  NOT_ACCEPTABLE: { code: 'NOT_ACCEPTABLE', statusCode: 406 },
  UNSUPPORTED_MEDIA_TYPE: { code: 'UNSUPPORTED_MEDIA_TYPE', statusCode: 415 },
  PRECONDITION_FAILED: { code: 'PRECONDITION_FAILED', statusCode: 412 },
  EXPECTATION_FAILED: { code: 'EXPECTATION_FAILED', statusCode: 417 },
  UNPROCESSABLE: { code: 'UNPROCESSABLE', statusCode: 422 },
};

export function errorHandler(err: GraphQLFormattedError) {
  const errorCode = (err.extensions?.code as string) || '';
  const errorDetail = errorMapping[errorCode];

  if (errorDetail) {
    return {
      message: err.message,
      code: errorDetail.code,
      statusCode: errorDetail.statusCode,
      stacktrace: process.env.ENV === 'local' || process.env.ENV === 'development' ? err.extensions?.stacktrace : null,
    };
  }

  return {
    message: err.message,
    stacktrace: process.env.ENV === 'local' || process.env.ENV === 'development' ? err.extensions?.stacktrace : null,
    extensions: {
      code: 500,
    },
  };
}
