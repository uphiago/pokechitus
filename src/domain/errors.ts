export type AppErrorCode = 'network' | 'not-found' | 'storage' | 'unknown';

export type AppError = {
  code: AppErrorCode;
  message: string;
  retryable: boolean;
};

export const toAppError = (error: unknown): AppError => {
  if (error instanceof Error && error.message.includes('404')) {
    return { code: 'not-found', message: 'Item not found.', retryable: true };
  }
  if (error instanceof Error && error.message.toLowerCase().includes('storage')) {
    return { code: 'storage', message: 'Could not save favorites.', retryable: true };
  }
  if (error instanceof Error && error.message.toLowerCase().includes('network')) {
    return { code: 'network', message: 'Network issue. Please retry.', retryable: true };
  }
  return { code: 'unknown', message: 'Something went wrong.', retryable: true };
};
