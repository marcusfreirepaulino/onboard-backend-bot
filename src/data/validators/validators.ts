const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-zA-Z]).+$/;
const EMAIL_REGEX = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

export function passwordValidator(password: string) {
  const minLength = 6;
  const maxLength = 30;

  if (password.length < minLength) {
    throw new Error('A valid password should have at least 6 characters.');
  }

  if (password.length > maxLength) {
    throw new Error('Your password surpasses the limit of 30 characters.');
  }

  if (!password.match(PASSWORD_REGEX)) {
    throw new Error('A valid password should have a least 1 letter and 1 digit.');
  }
}

export function emailValidator(email: string, alreadyRegistered: boolean) {
  if (!email.match(EMAIL_REGEX)) {
    throw new Error('Insert a valid email.');
  }

  if (alreadyRegistered) {
    throw new Error('This email is already registered.');
  }
}
