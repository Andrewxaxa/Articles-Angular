export const isFirebaseError = (error: unknown): error is IFirebaseError => {
  return typeof error === 'object' && error !== null && 'code' in error;
};

export interface IFirebaseError {
  code: number;
  message: string;
  errors: IErrorDetail[];
}

export interface IErrorDetail {
  message: string;
  domain: string;
  reason: string;
}
