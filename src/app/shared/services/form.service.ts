import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  constructor(private _messageService: MessageService) {}

  showError(summary: string, detail: string) {
    this._messageService.add({
      severity: 'error',
      summary: summary,
      detail: detail,
    });
  }

  showSuccess(summary: string, detail: string) {
    this._messageService.add({
      severity: 'success',
      summary: summary,
      detail: detail,
    });
  }

  clearAllErrors(nameForm: FormGroup<any>) {
    Object.keys(nameForm.controls).forEach((controlName) => {
      nameForm.controls[controlName].setErrors(null);
    });
  }
}
