import { ValidationError } from 'class-validator/types/validation/ValidationError';

export function validationErrorsToArray(error: ValidationError[]): string[] {
  const errorsString: string[] = [];

  error.forEach((e) => {
    if (e.children?.length) {
      e.children.forEach((e) =>
        errorsString.push(...validationErrorsToArray([e])),
      );
    }
    errorsString.push(...Object.values(e.constraints ?? {}));
  });
  return errorsString;
}
