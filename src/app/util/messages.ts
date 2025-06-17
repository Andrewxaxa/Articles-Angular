const capitalizeFirstLetter = (text: string): string =>
  text.charAt(0).toUpperCase() + text.slice(1);

export const REQUIRED_MESSAGE = (field: string) =>
  `${capitalizeFirstLetter(field)} is required`;
export const TOO_SHORT_MESSAGE = (field: string) =>
  `${capitalizeFirstLetter(field)} is too short`;
export const GENERAL_ERROR_MESSAGE = 'Something went wrong';
