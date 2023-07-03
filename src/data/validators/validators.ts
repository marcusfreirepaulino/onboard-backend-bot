import { CustomError } from '../../format-error.js';

const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-zA-Z]).+$/;
const EMAIL_REGEX = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

export function passwordValidator(password: string) {
  const minLength = 6;
  const maxLength = 30;

  if (password.length < minLength) {
    throw new CustomError(`A valid password should have at least ${minLength} characters.'`, 400);
  }

  if (password.length > maxLength) {
    throw new CustomError(`Your password surpasses the limit of ${maxLength} characters.`, 400);
  }

  if (!password.match(PASSWORD_REGEX)) {
    throw new CustomError('A valid password should have a least 1 letter and 1 digit.', 400);
  }
}

export function emailValidator(email: string) {
  if (!email.match(EMAIL_REGEX)) {
    throw new CustomError('Insert a valid email.', 400);
  }
}
