import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function ValidarNumeros(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (isNaN(value)) {
      return { numberRange: `Este campo es requerido` };
    }
    return null;
  }


}
