import { GraphQLFormattedError } from 'graphql';
import { unwrapResolverError } from '@apollo/server/errors';

export class CustomError extends Error {
  code: number;
  additionalInfo?: string;
  constructor(message: string, code: number, additionalInfo?: string) {
    super(message);
    this.code = code;
    this.additionalInfo = additionalInfo;
  }
}

export function formatError(error: GraphQLFormattedError, originalError: unknown) {
  const unwrappedError = unwrapResolverError(originalError);

  if (unwrappedError instanceof CustomError) {
    return {
      message: unwrappedError.message,
      code: unwrappedError.code,
      additionalInfo: unwrappedError?.additionalInfo,
    };
  }
  return { ...error, code: 500, message: 'Internal Server Error' };
}
